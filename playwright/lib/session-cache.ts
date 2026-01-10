import * as fs from 'fs';
import * as path from 'path';

const CACHE_FILE = path.join(__dirname, '..', '.sf-session-cache.json');

interface SessionCache {
  instanceUrl: string;
  accessToken: string;
  timestamp: number;
}

/**
 * キャッシュされたセッション情報を読み込む
 */
export function getCachedSession(): SessionCache | null {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const content = fs.readFileSync(CACHE_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch {
    // キャッシュが読めない場合はnullを返す
  }
  return null;
}

/**
 * キャッシュされたセッションからフロントドアURLを生成
 */
export function getFrontdoorUrlFromCache(path?: string): string | null {
  const session = getCachedSession();
  if (!session) return null;

  const { instanceUrl, accessToken } = session;
  const retUrl = path || '/lightning/page/home';
  
  // フロントドアURLを構築
  return `${instanceUrl}/secur/frontdoor.jsp?sid=${accessToken}&retURL=${encodeURIComponent(retUrl)}`;
}
