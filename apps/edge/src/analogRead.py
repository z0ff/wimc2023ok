import sys
from grove.adc import ADC

class GroveAnalogData:
    def __init__(self, channel):
        self.channel = channel
        self.adc = ADC()

    @property
    def AnalogData(self):
        return self.adc.read(self.channel)

Grove = GroveAnalogData

def main():
    # Node.jsから読み込むポート番号を受け取る
    arg_str = sys.stdin.readline()

    # アナログセンサーから値を取得する
    sensor = GroveAnalogData(int(arg_str))
    print(sensor.AnalogData)

if __name__ == '__main__':
    main()