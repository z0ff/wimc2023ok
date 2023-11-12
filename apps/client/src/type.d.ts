export type ReceiveData = {
    sender: "client" | "edge";
    tds: number;
    ph: number;
    temp: number;
    light: LightData;
    feedInterval: number;
}

export type SendData = {
    light: LightData | undefined,
    feedInterval: number | undefined
}

export type LightData = {
    isOn: boolean;
    color: RGBColorData;
}

export type RGBColorData = {
    r: number,
    g: number,
    b: number
}

export type HSLColorData = {
    hue: number;
    saturation: number;
    lightness: number;
}