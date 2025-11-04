import RPi.GPIO as GPIO
import smbus
import time
from flask import Flask, jsonify, request
from flask_cors import CORS
from threading import Thread

# I2C-Adresse des MCP4725 DAC
DEVICE_ADDRESS = 0x60

# I2C-Kanal (normalerweise 1 für Raspberry Pi 3/4)
I2C_CHANNEL = 1

# Erstellen Sie ein SMBus-Objekt
bus = smbus.SMBus(I2C_CHANNEL)

#tread mill status
total_pulses = 0
# 0V = stop / 5V = max speed
current_kmh = 0
max_kmh = 20.000000001
volts_per_kmh = 5.0 / max_kmh
current_volts = 0

# we increase the kmh step-by-step
seconds_per_kmh_change = 0.5

# Staes 
stopped = 0
paused = 1
running = 2
current_state = stopped

# distance in m
current_distance = 0
# time in millis
current_millis = 0

#set speed (well... actually voltage, nvm)
def set_voltage(voltage):
    if voltage < 0: 
        voltage = 0
    if voltage > 5:
        voltage = 5
    # Konvertieren Sie den Spannungswert von 0-5V in einen 16-Bit-Wert (0-65536)
    value = int((voltage / 5.0) * 65536)
    # Aufteilen des Wertes in High- und Low-Bytes
    msb = (value >> 8) & 0xFF
    lsb = value & 0xFF
    # Senden Sie die Befehle an den MCP4725, um die Spannung einzustellen
    bus.write_i2c_block_data(DEVICE_ADDRESS, 0x40, [msb, lsb])
    

def set_speed(kmh_dest):
    global current_kmh, seconds_per_kmh_change, volts_per_kmh, current_volts, current_state

    kmh_difference = kmh_dest - current_kmh
    if kmh_difference == 0:
        return

    volts_difference = kmh_difference * volts_per_kmh

    # Anzahl Schritte berechnen
    steps = int(abs(kmh_difference) / seconds_per_kmh_change)
    if steps == 0:
        steps = 1  # Verhindert Division durch 0

    increaseByStep = volts_difference / steps

    print(f"increaseByStep: {increaseByStep}")

    for s in range(steps):
        current_volts += increaseByStep
        current_volts = max(0, min(5, current_volts))  # Clamp to 0..5V

        set_voltage(current_volts)
        print(f"set voltage to {current_volts}V - step {s+1}/{steps}")

        current_kmh = current_volts / volts_per_kmh
        time.sleep(seconds_per_kmh_change)

        current_state = running if current_kmh > 0 else paused

    if kmh_dest == 0:
        # full stop
        set_voltage(0)
        current_state = stopped

def run():
    global current_millis
    global current_state
    global current_distance
    global running
    global paused
    while(True):
        while(current_state == running or current_state == paused):
            if(current_state == running):
                current_millis += 1000
                current_distance += current_kmh * 0.277777777777777778
            time.sleep(1)
        

app = Flask(__name__)
cors = CORS(app)

@app.route('/api/start', methods=['POST'])
def start():
    set_speed(12)
    return jsonify(speed=current_kmh, volts = current_volts)

@app.route('/api/pause', methods=['POST'])
def pause():
    print("Pausing")
    set_speed(0)
    return jsonify(speed=current_kmh, volts = current_volts)

@app.route('/api/stop', methods=['POST'])
def stop():
    print("Stopping")
    set_speed(0)
    global current_state
    global current_millis
    global current_distance
    current_millis = 0
    current_distance = 0
    current_state = stopped
    return jsonify(speed=current_kmh, volts = current_volts)

@app.route('/api/status', methods=['GET'])
def status():
    return jsonify(speed=current_kmh, volts = current_volts, meters = current_distance, time_in_millis = current_millis, status=current_state)

@app.route('/api/speed', methods=['POST'])
def updateSpeed():
    data = request.get_json(force=True)
    set_speed(data['speed'])
    return jsonify(speed=current_kmh, volts = current_volts)





if __name__ == '__main__':
    try:
        set_voltage(0)
        p = Thread(target=run)
        p.start()
        app.run(host='0.0.0.0', port=5000)
        p.join()
    except KeyboardInterrupt:
          set_voltage(0)
          print('Server Stopped')
          GPIO.cleanup()