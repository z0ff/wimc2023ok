import {createRequire} from 'module';

/**
 * メダカ育成環境管理システム
 * 水温センサーモジュール
 * -------------------------------
 * @author basho
 * @version 1.00
 * @since 2023/11/12
 */
export default class WaterTemperatureSensor {
	constructor() {
		/** 水温センサのディレクトリ名 */
		this.SENSOR_ID = '28-20154a096461';
		/** 水温格納ファイルのパス */
		this.SENSOR_W1_SLAVE = '/sys/bus/w1/devices/' + this.SENSOR_ID + '/w1_slave';
		/** エラー値 */
		this.ERROR_VALUE = 85000;
	}

	/**
	 * 水温を取得する
	 *  
	 * @returns 水温 
	 */
	async getValue() {
		// ファイル読み込み用
		const require = createRequire(import.meta.url);
		const fs = require('fs').promises;

		let temperature = this.ERROR_VALUE;
		
		try {
			// ファイルを読み込む
			const data = await fs.readFile(this.SENSOR_W1_SLAVE, 'utf-8');
			
			// 読み込んだデータから水温のみ取得する
			const dataArray = data.match(/t=(\d+)/);
			temperature = dataArray[1];
		} catch (ex) {
			console.log(ex.message);
		}
		
		return temperature;
	}
}