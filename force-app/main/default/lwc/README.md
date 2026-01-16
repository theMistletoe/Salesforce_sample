# Lightning Web Components (LWC)

このディレクトリには、Salesforce Lightning Web Components が含まれています。

## コンポーネント一覧

### 1. inputAccounts（取引先入力フォーム）

取引先情報を入力・管理するためのコンポーネントです。

#### 機能

- 取引先名、電話番号、業種の入力
- 取引先リストへの追加
- 登録済み取引先の一覧表示（データテーブル形式）
- 取引先の削除
- トースト通知による操作結果の表示

#### 使用可能なターゲット

- `lightning__RecordPage` - レコードページ
- `lightning__AppPage` - アプリケーションページ
- `lightning__HomePage` - ホームページ

#### ファイル構成

```
inputAccounts/
├── inputAccounts.html          # テンプレート
├── inputAccounts.js            # コントローラー
├── inputAccounts.js-meta.xml   # メタデータ設定
└── __tests__/
    └── inputAccounts.test.js   # Jest単体テスト
```

---

### 2. mySimpleTable（レコード一覧表示）

画面フローで使用するレコード一覧表示コンポーネントです。

#### 機能

- 動的なオブジェクト情報の取得（`@wire` + `getObjectInfo`）
- レコードの一覧表示（`lightning-datatable`）
- 行選択機能（選択されたレコードをフローに返却）
- ローディングスピナーの表示
- エラーハンドリングとエラーメッセージの表示

#### 使用可能なターゲット

- `lightning__FlowScreen` - 画面フロー

#### プロパティ（画面フロー用）

| プロパティ | 方向 | 型 | 説明 |
|-----------|------|-----|------|
| `objectName` | Input | String | オブジェクトAPI参照名 |
| `records` | Input | SObject[] | 表示するレコード一覧 |
| `height` | Input | Integer | テーブルの高さ（px） |
| `selectedRecords` | Output | SObject[] | 選択されたレコード一覧 |

#### ファイル構成

```
mySimpleTable/
├── mySimpleTable.css           # スタイルシート
├── mySimpleTable.html          # テンプレート
├── mySimpleTable.js            # コントローラー
├── mySimpleTable.js-meta.xml   # メタデータ設定
└── __tests__/
    ├── mySimpleTable.test.js   # Jest単体テスト
    └── data/                   # テスト用モックデータ
        ├── getObjectInfo_Error.json
        └── Account/
            ├── api_records.json
            ├── expected_columns.json
            └── getObjectInfo.json
```

---

## 開発環境

### 必要条件

- Salesforce CLI
- Node.js
- VS Code + Salesforce Extension Pack

### テストの実行

```bash
# 全テストを実行
npm run test:unit

# 特定のコンポーネントのテストを実行
npm run test:unit -- --testPathPattern=inputAccounts
npm run test:unit -- --testPathPattern=mySimpleTable

# カバレッジレポート付きでテスト実行
npm run test:unit:coverage
```

### デプロイ

```bash
# Scratch Orgにデプロイ
sf project deploy start --source-dir force-app/main/default/lwc

# 特定のコンポーネントのみデプロイ
sf project deploy start --source-dir force-app/main/default/lwc/inputAccounts
sf project deploy start --source-dir force-app/main/default/lwc/mySimpleTable
```

---

## 参考リンク

- [Lightning Web Components Dev Guide](https://developer.salesforce.com/docs/component-library/documentation/en/lwc)
- [LWC Recipes (GitHub)](https://github.com/trailheadapps/lwc-recipes)
- [SLDS - Salesforce Lightning Design System](https://www.lightningdesignsystem.com/)
- https://qiita.com/hanamizuki10/items/249973e41a1487a24894#%E6%9C%AC%E9%A1%8Cwire%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%9Flwc%E3%83%86%E3%82%B9%E3%83%88%E3%82%B1%E3%83%BC%E3%82%B9%E3%81%AF%E3%81%A9%E3%81%86%E6%9B%B8%E3%81%8F%E3%81%AE%E3%81%8B
- https://developer.salesforce.com/docs/platform/ja-jp/lwc/guide/debug-intro.html