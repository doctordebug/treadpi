class GPIO:
    BCM = None
    OUT = None

    @staticmethod
    def setmode(mode):
        print("GPIO MOCK: setmode()", mode)

    @staticmethod
    def setup(pin, mode):
        print("GPIO MOCK: setup()", pin, mode)

    @staticmethod
    def output(pin, value):
        print("GPIO MOCK: output()", pin, value)

    @staticmethod
    def cleanup():
        print("GPIO MOCK: cleanup()")
