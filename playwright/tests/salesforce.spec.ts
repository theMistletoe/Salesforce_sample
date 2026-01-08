import { test, expect } from '../fixtures/salesforce.fixture';

test.describe('Salesforce E2E Tests', () => {
  test('Salesforceホーム画面にアクセスできる', async ({ sfPage }) => {
    // フロントドアURL経由でログイン済みの状態でページが提供される
    // Lightning Experienceのホーム画面が表示されていることを確認
    await expect(sfPage).toHaveURL(/lightning/);

    // ヘッダーのアプリランチャーが表示されていることを確認
    const appLauncher = sfPage.getByRole('button', { name: /アプリケーションランチャー|App Launcher/i });
    await expect(appLauncher).toBeVisible({ timeout: 30000 });
  });

  test.skip('取引先一覧画面に遷移できる', async ({ sfPage, sfPaths }) => {
    // 取引先一覧に遷移
    await sfPage.goto(sfPage.url().split('/lightning')[0] + sfPaths.objectList('Account'));
    await sfPage.waitForLoadState('networkidle');

    // 取引先一覧が表示されていることを確認
    await expect(sfPage).toHaveURL(/Account/);

    // 「新規」ボタンが表示されていることを確認
    const newButton = sfPage.getByRole('button', { name: /新規|New/i });
    await expect(newButton).toBeVisible({ timeout: 30000 });
  });

  test.skip('Setup画面にアクセスできる', async ({ sfPage, getSfUrl }) => {
    // Setup画面に直接アクセス
    const setupUrl = getSfUrl('/lightning/setup/SetupOneHome/home');
    await sfPage.goto(setupUrl);
    await sfPage.waitForLoadState('networkidle');

    // Setup画面が表示されていることを確認
    await expect(sfPage).toHaveURL(/setup/i);
  });
});

test.describe('Salesforce 特定ページへの直接アクセス', () => {
  // 特定のパスに直接アクセスする設定
  test.use({ initialPath: '/lightning/o/Contact/list' });

  test.skip('取引先責任者一覧に直接アクセスできる', async ({ sfPage }) => {
    await expect(sfPage).toHaveURL(/Contact/);

    // リストビューが表示されていることを確認
    const listView = sfPage.locator('lightning-list-view-manager-header');
    await expect(listView).toBeVisible({ timeout: 30000 });
  });
});
