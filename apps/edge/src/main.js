import WaterTemperatureSensor from './WaterTemperatureSensor.js'
import TdsSensor from './TdsSensor.js'
import PhSensor from './PhSensor.js'

const ERROR_VALUE = 85000;

/**
 * 指定時間待機する
 * 
 * @param {ミリ秒} ms 
 * @returns 
 */
function sleep(ms) {
	return new Promise(function (resolve) {
		setTimeout(resolve, ms);
	});
}

/**
 * main処理
 */
async function main() {
	let flg = 1;

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

		// ライトを点灯する
		const autoLight = new AutoLight(flg, 255, 255, 255);
		await autoLight.changeStatus();
		flg = flg == 1 ? 0 : 1;
		
		console.log('水温：' + temperature / 1000 + '℃');
		console.log('TDS：' + tdsValue);
		console.log('PH：' + phValue);
		console.log();

		// 1000ms待機する
		sleep(1000);
	}
}

// メイン処理の呼び出し
main();