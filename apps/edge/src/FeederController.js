import { requestI2CAccess } from "node-web-i2c";
import PCA9685 from "@chirimen/pca9685";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

let pca9685;

export async function initFeeder() {
    // I2Cの初期化
    const i2cAccess = await requestI2CAccess();
    const i2cPort = i2cAccess.ports.get(1);
    // PCA9685(サーボコントローラ)の初期化
    pca9685 = new PCA9685(i2cPort, 0x40);
    await pca9685.init(0.001, 0.002, 30);
}

// 餌をやる (サーボを動かす)
export async function feed() {
    await pca9685.setServo(0, -15);
    console.log("サーボ角度90度");

    await sleep(5000);

    await pca9685.setServo(0, 15);
    console.log("サーボ角度0度");
}

/*
// 定期的に餌をやる
export async function feedPeriodically(interval) {
    while (true) {
        await feed();
        await sleep(interval * 1000);
    }
}
 */