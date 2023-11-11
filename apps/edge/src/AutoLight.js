import { requestI2CAccess } from "node-web-i2c";
import NPIX from "@chirimen/neopixel-i2c";

/**
 * メダカ育成環境管理システム
 * 照明モジュール
 * -------------------------------
 * @author basho
 * @version 1.00
 * @since 2023/11/12
 */
export default class AutoLight {
    constructor(status, r, g, b) {
        /** 点灯状態（true:点灯 false:消灯） */
        this.status = status;
        /** 赤輝度 */
        this.r = r;
        /** 緑輝度 */
        this.g = g;
        /** 青輝度 */
        this.b = b;
        /** LED個数 */
        this.neoPixels = 64;
    }

    /**
     * ライトの点灯状態、色を変更する
     */
    async changeStatus() {
        const i2cAccess = await requestI2CAccess();
        const port = i2cAccess.ports.get(1);
        const npix = new NPIX(port, 0x41);
        await npix.init(this.neoPixels);

        if (this.status === false) {
            this.r = this.g = this.b = 0;
        }

        await npix.setGlobal(this.r, this.g, this.b);
    }
}