import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const CACHE_FILE = path.join(__dirname, '.sf-session-cache.json');

interface SessionCache {
  instanceUrl: string;
  accessToken: string;
  timestamp: number;
}

/**
 * Salesforceセッション情報を取得してキャッシュする
 */
async function globalSetup() {
  console.log('🔐 Salesforce session setup...');

  try {
    // sf org display でセッション情報を取得
    const result = execSync('sf org display --json', {
      encoding: 'utf-8',
      cwd: process.env.SFDX_PROJECT_ROOT || path.join(__dirname, '..'),
    });

    const orgInfo = JSON.parse(result);
    const { instanceUrl, accessToken } = orgInfo.result;

    if (!instanceUrl || !accessToken) {
      throw new Error('Failed to get Salesforce session info');
    }

    // キャッシュファイルに保存
    const cache: SessionCache = {
      instanceUrl,
      accessToken,
      timestamp: Date.now(),
    };

    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
    console.log(`✅ Salesforce session cached: ${instanceUrl}`);
  } catch (error) {
    console.error('❌ Failed to setup Salesforce session:', error);
    throw error;
  }
}

export default globalSetup;
