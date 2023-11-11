import WaterTemperatureSensor from './WaterTemperatureSensor.js'
import TdsSensor from './TdsSensor.js'
import PhSensor from './PhSensor.js'
import AutoLight from "./AutoLight";
import {connectRelay, getLightColor, getLightIsOn, sendData} from "./ChirimenClient";
import convert from 'color-convert';
import {initFeeder} from "./FeederController";

const ERROR_VALUE = 85000;

/**
 * 指定時間待機する
 * 
 * @param {number} ms
 * @returns 
 */
async function sleep(ms) {
	return new Promise(function (resolve) {
		setTimeout(resolve, ms);
	});
}

/**
 * main処理
 */
async function main() {
	// RelayServerに接続する
	await connectRelay();
	await initFeeder();

	while (true) {
		// 水温を取得する
		const waterTemperatureSensor = new WaterTemperatureSensor();
		const temperature = await waterTemperatureSensor.getValue();

		// TDS値を取得する
		const tdsSensor = new TdsSensor(temperature);
		const tdsValue = await tdsSensor.getValue();

		// PH値を取得する
		const phSensor = new PhSensor();
		const phValue = await phSensor.getValue();

		// ライトの点灯状態を取得する
		const lightIsOn = getLightIsOn();
		// 照明の色を取得する
		const lightHslColor = getLightColor();

		// 照明の色をRGBに変換する
		const lightRgbColor = convert.hsl.rgb(lightHslColor.hue, lightHslColor.saturation, lightHslColor.lightness);

		// ライトを点灯する
		const autoLight = new AutoLight(Number(lightIsOn), lightRgbColor[0], lightRgbColor[1], lightRgbColor[2]);
		await autoLight.changeStatus();

		// 送信用データを作成する
		const data = {
			tds: tdsValue,
			ph: phValue,
			temp: temperature,
			light: {
				isOn: lightIsOn,
				color: lightHslColor
			},
			feedInterval: 1
		}

		// データを送信する
		await sendData(data);

		console.log('水温：' + temperature / 1000 + '℃');
		console.log('TDS：' + tdsValue);
		console.log('PH：' + phValue);
		console.log();

		// 1000ms待機する
		await sleep(5000);
	}
}

// メイン処理の呼び出し
main();