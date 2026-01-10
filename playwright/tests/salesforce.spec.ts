import { test, expect } from '../fixtures/salesforce.fixture';

test.describe('Salesforce E2E Tests', () => {
  test('Salesforceホーム画面にアクセスできる', async ({ sfPage }) => {
    // フロントドアURL経由でログイン済みの状態でページが提供される
    // Lightning Experienceのホーム画面が表示されていることを確認
    await expect(sfPage).toHaveURL(/lightning/);

    // ヘッダーのアプリランチャーが表示されていることを確認
    await expect(
      sfPage.getByRole('button', { name: /アプリケーションランチャー|App Launcher/i })
    ).toBeVisible({ timeout: 30000 });
  });

  test('取引先一覧画面に遷移できる', async ({ sfPage, sfPaths }) => {
    // 取引先一覧画面に遷移
    const accountListUrl = sfPage.url().replace(/\/lightning\/.*/, '') + sfPaths.objectList('Account');
    await sfPage.goto(accountListUrl);

    // 取引先一覧画面が表示されていることを確認
    await expect(sfPage).toHaveURL(/Account\/list/, { timeout: 30000 });
    
    // 「test」取引先のリンクをクリックして詳細画面に遷移
    // filter で親要素を絞り込み、より安定したロケーターにする
    await sfPage
      .getByRole('link', { name: 'test', exact: true })
      .first()
      .click();

    // 取引先詳細画面が表示されていることを確認
    await expect(sfPage).toHaveURL(/Account\/[a-zA-Z0-9]+\/view/, { timeout: 30000 });

    // 電話番号が画面上に存在することを確認
    // Playwrightは自動でスクロールするので scrollIntoViewIfNeeded は不要
    await expect(
      sfPage.getByRole('link', { name: '090-8765-4321' }).first()
    ).toBeVisible({ timeout: 30000 });
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
    // 見出しやボタンなどユーザー視点の要素で確認
    await expect(
      sfPage.getByRole('heading', { name: /取引先責任者|Contacts/i })
    ).toBeVisible({ timeout: 30000 });
  });
});
