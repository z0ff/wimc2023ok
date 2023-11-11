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
export default class PhSensor {
    constructor() {
        /** PHセンサーのポート */
        this.port = '2';
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
        
        // 取得した値を補正する
        const voltage = 3.3 * rawData / 1024.0;
        const value = 3.5 + voltage + 0.00;
            
        return value;
    }
}