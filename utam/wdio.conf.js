import UtamWdioService from 'wdio-utam-service';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const config = {
    // テスト対象のURL
    baseUrl: 'https://login.salesforce.com',
    
    // ブラウザの設定
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: ['--headless', '--disable-gpu']  // ヘッドレスモード
        }
    }],
    
    // テストファイルの場所
    specs: [
        './__test__/**/*.spec.js'
    ],
    
    // テストフレームワーク
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    
    // UTAMサービスの設定
    services: [
        [UtamWdioService, {
            implicitTimeout: 0,
            injectionConfigs: []  // Salesforceページオブジェクトを使わない場合は空配列
        }]
    ],
    
    // ログレベル
    logLevel: 'info',
    
    // レポーター
    reporters: ['spec']
};
