import { execSync } from 'child_process';

export interface SalesforceOrgInfo {
  frontdoorUrl: string;
  instanceUrl: string;
  accessToken: string;
}

/**
 * sf org open --url-only を実行してフロントドアURLを取得する
 * @param targetOrg - 対象のorg alias（省略時はデフォルトorg）
 * @param path - アクセスするページのパス（省略時はホーム）
 */
export function getSalesforceFrontdoorUrl(options?: {
  targetOrg?: string;
  path?: string;
}): string {
  const args: string[] = ['sf', 'org', 'open', '--url-only'];

  if (options?.targetOrg) {
    args.push('--target-org', options.targetOrg);
  }

  if (options?.path) {
    args.push('--path', options.path);
  }

  try {
    const result = execSync(args.join(' '), {
      encoding: 'utf-8',
      // プロジェクトルートで実行（sfdx-project.json がある場所）
      cwd: process.env.SFDX_PROJECT_ROOT || process.cwd(),
    });

    // sf org open の出力からURLを抽出
    // 出力例: "Access org ... with the following URL: https://..."
    const urlMatch = result.match(/https:\/\/[^\s]+/);
    if (urlMatch) {
      return urlMatch[0];
    }

    // URLが見つからない場合はそのまま返す（後方互換性）
    return result.trim();
  } catch (error) {
    throw new Error(
      `Failed to get Salesforce frontdoor URL: ${error instanceof Error ? error.message : error}`
    );
  }
}

/**
 * sf org display を実行してorg情報を取得する
 * @param targetOrg - 対象のorg alias（省略時はデフォルトorg）
 */
export function getSalesforceOrgInfo(targetOrg?: string): SalesforceOrgInfo {
  const args: string[] = ['sf', 'org', 'display', '--json'];

  if (targetOrg) {
    args.push('--target-org', targetOrg);
  }

  try {
    const result = execSync(args.join(' '), {
      encoding: 'utf-8',
      cwd: process.env.SFDX_PROJECT_ROOT || process.cwd(),
    });

    const json = JSON.parse(result);
    const { instanceUrl, accessToken } = json.result;

    return {
      instanceUrl,
      accessToken,
      frontdoorUrl: `${instanceUrl}/secur/frontdoor.jsp?sid=${accessToken}`,
    };
  } catch (error) {
    throw new Error(
      `Failed to get Salesforce org info: ${error instanceof Error ? error.message : error}`
    );
  }
}

/**
 * Salesforceの各種ページパスを生成するヘルパー
 */
export const SalesforcePaths = {
  // Lightning Experience
  home: '/lightning/page/home',
  setup: '/lightning/setup/SetupOneHome/home',

  // オブジェクトリストビュー
  objectList: (objectApiName: string) => `/lightning/o/${objectApiName}/list`,

  // レコード詳細
  record: (recordId: string) => `/lightning/r/${recordId}/view`,

  // レコード作成
  newRecord: (objectApiName: string) => `/lightning/o/${objectApiName}/new`,

  // アプリケーション
  app: (appName: string) => `/lightning/app/${appName}`,

  // カスタムLWC/Auraページ
  component: (componentName: string) => `/lightning/cmp/${componentName}`,
} as const;
