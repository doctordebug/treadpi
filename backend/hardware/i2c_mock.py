class I2C:
    class SMBus:
        def __init__(self, channel):
            print(f"✨ MOCK SMBus initialized on channel {channel}")

        def write_i2c_block_data(self, addr, reg, data):
            print(f"🟢 MOCK write to {hex(addr)} reg={reg} data={data}")
