# Playwright - Salesforce E2Eテスト

このディレクトリには、Playwrightを使用したSalesforceのE2Eテストが含まれています。

## 📋 概要

- **Playwright**: モダンなE2Eテストフレームワーク
- **Salesforceフロントドア認証**: `sf` CLIを使用してセッション情報を取得し、フロントドアURL経由で自動ログイン
- **カスタムFixtures**: Salesforce用のテストヘルパーを提供

## 📁 ディレクトリ構成

```
playwright/
├── tests/                    # テストファイル
│   ├── example.spec.ts       # サンプルテスト
│   └── salesforce.spec.ts    # Salesforce E2Eテスト
├── fixtures/
│   └── salesforce.fixture.ts # Salesforce用カスタムfixture
├── lib/
│   ├── salesforce.ts         # Salesforceヘルパー関数
│   └── session-cache.ts      # セッションキャッシュ管理
├── global-setup.ts           # グローバルセットアップ（セッションキャッシュ）
├── playwright.config.ts      # Playwright設定
└── package.json
```

## 🚀 セットアップ

### 前提条件

- Node.js 20.x, 22.x, または 24.x（Playwright 1.57の要件）
- [Salesforce CLI (sf)](https://developer.salesforce.com/tools/salesforcecli) がインストール済み
- Salesforce orgに認証済み（`sf org login web`）

### インストール

```bash
cd playwright
npm install
npx playwright install
```

## 🧪 テストの実行

### すべてのテストを実行

```bash
npm test
```

### UIモードで実行（デバッグに便利）

```bash
npm run test:ui
```

### テストレポートを表示

```bash
npm run report
```

### 特定のテストファイルを実行

```bash
npx playwright test tests/salesforce.spec.ts
```

## 📝 テストの書き方

ベストプラクティスについてはこちらを確認ください: [Playwright Best Practices Guide](./../assets/Playwright%20Best%20Practices%20Guide.pdf)

### 基本的なテスト

```typescript
import { test, expect } from '../fixtures/salesforce.fixture';

test.describe('Salesforce E2E Tests', () => {
  test('ホーム画面にアクセスできる', async ({ sfPage }) => {
    // sfPageはSalesforceにログイン済みの状態で提供される
    await expect(sfPage).toHaveURL(/lightning/);
  });
});
```

### カスタムFixtureの機能

| Fixture | 説明 |
|---------|------|
| `sfPage` | Salesforceにログイン済みのPlaywright `Page` オブジェクト |
| `sfPaths` | Salesforceのパスヘルパー（例: `sfPaths.objectList('Account')`） |
| `getSfUrl` | フロントドアURLを取得する関数 |

## ⚙️ 設定

### 環境変数

| 変数 | 説明 | デフォルト |
|------|------|-----------|
| `SFDX_PROJECT_ROOT` | SFDXプロジェクトのルートパス | `../`（親ディレクトリ） |
| `CI` | CI環境かどうか | - |

### タイムアウト設定

Salesforceは読み込みに時間がかかるため、デフォルトで120秒のタイムアウトが設定されています。

## 🔧 トラブルシューティング

### セッションが無効になった場合

```bash
# Salesforceに再認証
sf org login web

# または、デフォルトorgを確認
sf org list
```

### テストが不安定な場合

- タイムアウトを調整: `playwright.config.ts` の `timeout` を変更
- スクリーンショットを確認: `test-results/` ディレクトリ
- UIモードでデバッグ: `npm run test:ui`

## 📊 テストレポート

テスト実行後、HTMLレポートが `playwright-report/` に生成されます。

```bash
npm run report
```

## 📚 参考リンク

- [Playwright公式ドキュメント](https://playwright.dev/)
- [Salesforce CLI](https://developer.salesforce.com/tools/salesforcecli)
- [Lightning Web Components Testing](https://developer.salesforce.com/docs/platform/lwc/guide/testing.html)
