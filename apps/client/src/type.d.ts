export type ReceiveData = {
    tds: number;
    ph: number;
    temp: number;
    light: {
        isOn: boolean;
        //const timeoutId = setTimeout(update, 1000 / 15);

        //return() => {
        //    clearTimeout(timeoutId);
        //}
        color: {
            hue: number;
            saturation: number;
            lightness: number;
        }
    }
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