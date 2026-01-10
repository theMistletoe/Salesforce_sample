import { test as base, Page } from '@playwright/test';
import { getSalesforceFrontdoorUrl, SalesforcePaths } from '../lib/salesforce';
import { getFrontdoorUrlFromCache } from '../lib/session-cache';

// Salesforce用のカスタムオプション
export interface SalesforceOptions {
  /** 対象のSalesforce org alias */
  targetOrg?: string;
  /** ログイン後に遷移するパス */
  initialPath?: string;
}

// カスタムfixtureの型定義
export interface SalesforceFixtures {
  /** Salesforceにログイン済みのページ */
  sfPage: Page;
  /** Salesforceのパスヘルパー */
  sfPaths: typeof SalesforcePaths;
  /** フロントドアURLを取得する関数 */
  getSfUrl: (path?: string) => string;
}

/**
 * フロントドアURLを取得（キャッシュ優先）
 * 並列実行時の競合を避けるため、globalSetupでキャッシュされたセッションを優先使用
 */
function getOptimizedFrontdoorUrl(options?: { targetOrg?: string; path?: string }): string {
  // キャッシュがあればそれを使用（並列実行対応）
  const cachedUrl = getFrontdoorUrlFromCache(options?.path);
  if (cachedUrl && !options?.targetOrg) {
    return cachedUrl;
  }
  
  // キャッシュがない場合は従来の方法（sf org open）
  return getSalesforceFrontdoorUrl(options);
}

/**
 * Salesforce用のカスタムtest fixture
 */
export const test = base.extend<SalesforceFixtures & SalesforceOptions>({
  // オプションのデフォルト値
  targetOrg: [undefined, { option: true }],
  initialPath: [SalesforcePaths.home, { option: true }],

  // Salesforceログイン済みページを提供
  sfPage: async ({ page, targetOrg, initialPath }, use) => {
    // フロントドアURLを取得（キャッシュ優先）
    const frontdoorUrl = getOptimizedFrontdoorUrl({
      targetOrg,
      path: initialPath,
    });

    // Salesforceにアクセス（フロントドア経由で自動ログイン）
    await page.goto(frontdoorUrl);

    // ログインが完了するまで待機（DOMContentLoadedで十分）
    await page.waitForLoadState('domcontentloaded');

    // セッションが有効か確認（ログインページにリダイレクトされていないか）を先にチェック
    const currentUrl = page.url();
    if (currentUrl.includes('/login') || currentUrl.includes('login.salesforce.com') || currentUrl.includes('secur/frontdoor.jsp')) {
      // ログインページが表示されていないか確認（ユーザー視点のロケーターを使用）
      const hasLoginButton = await page.getByRole('button', { name: /log in|ログイン/i }).isVisible().catch(() => false);
      const hasUsernameField = await page.getByRole('textbox', { name: /username|ユーザー名/i }).isVisible().catch(() => false);
      if (hasLoginButton || hasUsernameField) {
        throw new Error('Salesforce login failed. Session expired or invalid credentials. Please re-authenticate with: sf org login web');
      }
    }

    // Lightning Experienceのメインコンテンツが表示されるまで待機
    // より堅牢なセレクタ：複数のLightning Experienceの要素を対象
    try {
      await page.waitForSelector([
        'one-app-nav-bar',                    // ナビゲーションバー
        '.slds-global-header',                // グローバルヘッダー
        'lightning-icon',                     // Lightningアイコン
        '[data-component-id="navex_navigation"]', // ナビゲーション
        '.oneGlobalNav',                      // グローバルナビ
        'button[title*="ランチャー"], button[title*="Launcher"]', // アプリランチャー
      ].join(', '), { 
        timeout: 60000 
      });
    } catch (e) {
      // タイムアウト時に詳細なエラー情報を提供
      const pageContent = await page.content();
      const isLoginPage = pageContent.includes('Username') && pageContent.includes('Password');
      if (isLoginPage) {
        throw new Error('Salesforce session expired. Please re-authenticate with: sf org login web');
      }
      throw new Error(`Failed to load Salesforce Lightning Experience. Current URL: ${page.url()}`);
    }

    await use(page);
  },

  // パスヘルパーを提供
  sfPaths: async ({}, use) => {
    await use(SalesforcePaths);
  },

  // URL取得関数を提供
  getSfUrl: async ({ targetOrg }, use) => {
    const getUrl = (path?: string) =>
      getSalesforceFrontdoorUrl({ targetOrg, path });
    await use(getUrl);
  },
});

export { expect } from '@playwright/test';
