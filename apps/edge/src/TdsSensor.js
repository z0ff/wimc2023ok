import {createRequire} from 'module';

/** センサーの生データ */
let rawData = 0;

/**
 * メダカ育成環境管理システム
 * PHセンサーモジュール
 * -------------------------------
 * @author basho
 * @version 1.00
 * @since 2023/11/12
 */
export default class TdsSensor {
    constructor(temperature) {
        /** 水温 */
        this.temperature = temperature;
        /** PHセンサーのポート */
        this.port = '0';
        /** Pythonファイルのパス */
        this.filePath = './grove.py/grove/analogRead.py';
    }

    /**
     * PH値を取得する
     * 
     * @returns PH値
     */
    async getValue() {
        // pythonファイルを読み込む
        const require = createRequire(import.meta.url);
        const {PythonShell} = require('python-shell');
        const pyshell = new PythonShell(this.filePath);

        pyshell.send(this.port);

        // pythonで取得したPHセンサーの値を取得する
        pyshell.on('message', function(data) {
            rawData = Number(data);
        });

        // アナログ値を電圧値に変換する
        const voltage = 3.3 * rawData / 1024.0;
        
        // 取得した値を補正する
        let value = (133.42 / voltage * voltage * voltage - 255.86 * voltage * voltage + 857.39 * voltage) * 0.5;
        value = value / (1.0 + 0.026 * (this.temperature / 1000 - 25.0));
            
        return value;
    }
}