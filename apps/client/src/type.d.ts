export type ReceiveData = {
    tds: number;
    ph: number;
    temp: number;
    light: {
        isOn: boolean;
        color: {
            hue: number;
            saturation: number;
            lightness: number;
        }
    }
    feedInterval: number;
}