/**
 * UTAMテストのサンプル
 * 
 * UTAMはページオブジェクトモデルを使用してUIテストを記述します。
 * ページオブジェクトは __utam__/*.utam.json から自動生成されます。
 */

describe('UTAM サンプルテスト', () => {
    
    it('Googleページにアクセスできる', async () => {
        // Googleのページに移動
        await browser.url('https://www.google.com');
        
        // ページタイトルを取得
        const title = await browser.getTitle();
        
        // アサーション
        expect(title).toContain('Google');
    });

    it('Salesforceログインページのテスト例', async () => {
        // Salesforceログインページに移動
        await browser.url('https://login.salesforce.com');
        
        // ページタイトルを確認
        const title = await browser.getTitle();
        expect(title).toContain('Salesforce');
    });

    it('Salesforceに実際にログインする', async () => {
        // ========================================
        // ⚠️ 注意: 実際の認証情報に置き換えてください
        // 本番では環境変数を使用することを推奨
        // ========================================
        const username = process.env.SF_USERNAME || 'pxaxcxixfxixcxa329@agentforce.com';
        const password = process.env.SF_PASSWORD || 'fxv9uea4hdc.zjv3YPD';
        
        // Salesforceログインページに移動
        await browser.url('https://orgfarm-2eaf807c63-dev-ed.develop.my.salesforce.com');
        
        // ユーザー名を入力
        const usernameInput = await $('#username');
        await usernameInput.setValue(username);
        
        // パスワードを入力
        const passwordInput = await $('#password');
        await passwordInput.setValue(password);
        
        // ログインボタンをクリック
        const loginButton = await $('#Login');
        await loginButton.click();
        
        // ログイン後のページ遷移を待つ（ログインページから離れるまで待つ）
        await browser.waitUntil(
            async () => {
                const url = await browser.getUrl();
                // ログインページから離れたか確認
                return !url.includes('/login') && !url.includes('login.salesforce.com');
            },
            {
                timeout: 30000,
                timeoutMsg: 'ログインに失敗しました（タイムアウト）'
            }
        );
        
        // ログイン成功を確認
        // MFA（多要素認証）が有効な場合、認証画面にリダイレクトされる
        const currentUrl = await browser.getUrl();
        
        // MFA認証画面、またはLightningページ、またはSalesforceドメインにいることを確認
        const isLoggedInOrMFA = 
            currentUrl.includes('.lightning.force.com') ||
            currentUrl.includes('.my.salesforce.com') ||
            currentUrl.includes('identity/verification');
        
        expect(isLoggedInOrMFA).toBe(true);
        
        console.log('ログイン後のURL:', currentUrl);
    });
});

/**
 * UTAMページオブジェクトを使う場合の例:
 * 
 * import Example from '../pageObjects/example.js';
 * 
 * describe('UTAM ページオブジェクト テスト', () => {
 *     it('should use page object', async () => {
 *         await browser.url('/');
 *         
 *         // UTAMローダーでページオブジェクトをロード
 *         const page = await utam.load(Example);
 *         
 *         // ページオブジェクトのメソッドを使用
 *         const title = await page.getTitle();
 *         expect(title).toBeTruthy();
 *     });
 * });
 */
