import { test as base, Page } from '@playwright/test';
import { getSalesforceFrontdoorUrl, SalesforcePaths } from '../lib/salesforce';

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
 * Salesforce用のカスタムtest fixture
 */
export const test = base.extend<SalesforceFixtures & SalesforceOptions>({
  // オプションのデフォルト値
  targetOrg: [undefined, { option: true }],
  initialPath: [SalesforcePaths.home, { option: true }],

  // Salesforceログイン済みページを提供
  sfPage: async ({ page, targetOrg, initialPath }, use) => {
    // フロントドアURLを取得
    const frontdoorUrl = getSalesforceFrontdoorUrl({
      targetOrg,
      path: initialPath,
    });

    // Salesforceにアクセス（フロントドア経由で自動ログイン）
    await page.goto(frontdoorUrl);

    // ログインが完了するまで待機（DOMContentLoadedで十分）
    await page.waitForLoadState('domcontentloaded');

    // Lightning Experienceのメインコンテンツが表示されるまで待機
    await page.waitForSelector('one-app-nav-bar, .slds-global-header, .forceSearchDesktopInput', { 
      timeout: 60000 
    });

    // セッションが有効か確認（ログインページにリダイレクトされていないか）
    const currentUrl = page.url();
    if (currentUrl.includes('/login') || currentUrl.includes('login.salesforce.com')) {
      throw new Error('Salesforce login failed. Please check your org authentication.');
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
