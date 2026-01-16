import { createElement } from '@lwc/engine-dom';
import MySimpleTable from 'c/mySimpleTable';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

// Error
const mockGetObjectInfoError = require('./data/getObjectInfo_Error.json');

// object: Account
// type:Name, phone, number, address, picklist, url, date
const mockGetObjectInfoByAccount = require('./data/Account/getObjectInfo.json');
const mockApiRecordsByAccount = require('./data/Account/api_records.json');
const mockExpectedColumnsByAccount = require('./data/Account/expected_columns.json');

jest.mock(
  'lightning/flowSupport',
  () => {
    return { FlowAttributeChangeEvent: {} };
  },
  { virtual: true }
);

describe('c-my-simple-table', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it('テストケース1:正常系挙動', async () => {
    const element = createElement('c-my-simple-table', {
      is: MySimpleTable
    });
    element.records = mockApiRecordsByAccount;
    element.height = '200';
    element.objectName = 'Account';
    document.body.appendChild(element);

    // Emit data from @wire
    await getObjectInfo.emit(mockGetObjectInfoByAccount);

    // アサーション
    const divEl = element.shadowRoot.querySelector('div');
    expect(divEl.style.height).toBe('200px');
    expect(divEl.querySelector('lightning-datatable')).not.toBeNull();

    const dbEl = element.shadowRoot.querySelector('lightning-datatable');
    const expectedData = JSON.stringify(mockApiRecordsByAccount);
    const receivedDate = JSON.stringify(dbEl.data);
    const expectedColumns = JSON.stringify(mockExpectedColumnsByAccount);
    const receivedColumns = JSON.stringify(dbEl.columns);
    expect(dbEl.keyField).toBe('id');
    expect(receivedDate).toBe(expectedData);
    expect(receivedColumns).toBe(expectedColumns);
  });

  it('テストケース2:height未指定', async () => {
    const element = createElement('c-my-simple-table', {
      is: MySimpleTable
    });
    element.records = mockApiRecordsByAccount;
    element.height = '';
    element.objectName = 'Account';
    document.body.appendChild(element);

    // Emit data from @wire
    await getObjectInfo.emit(mockGetObjectInfoByAccount);

    // アサーション
    const divEl = element.shadowRoot.querySelector('div');
    expect(divEl.style.height).toBe('');
    expect(divEl.querySelector('lightning-datatable')).not.toBeNull();
  });

  it('テストケース3:recordsのデータなし', async () => {
    const element = createElement('c-my-simple-table', {
      is: MySimpleTable
    });
    element.records = [];
    element.height = '200';
    element.objectName = 'Account';
    document.body.appendChild(element);

    // Emit data from @wire
    await getObjectInfo.emit(mockGetObjectInfoByAccount);

    // アサーション
    const divEl = element.shadowRoot.querySelector('div');
    expect(divEl.classList.contains('slds-m-around_x-small')).toBe(true);
    expect(divEl.textContent).toBe('データはありません。');
  });


  it('テストケース4:ローディング中の表示確認', async () => {
    const element = createElement('c-my-simple-table', {
      is: MySimpleTable
    });
    element.records = mockApiRecordsByAccount;
    element.height = '200';
    element.objectName = 'Account';
    document.body.appendChild(element);

    // アサーション
    const divEl = element.shadowRoot.querySelector('div');
    expect(divEl.querySelector('lightning-spinner')).not.toBeNull();
  });

  it('テストケース5:getObjectInfoでエラー発生ケース', async () => {
    const element = createElement('c-my-simple-table', {
      is: MySimpleTable
    });
    element.fieldNames = '';
    element.records = mockApiRecordsByAccount;
    element.height = '200';
    element.objectName = 'Account';
    document.body.appendChild(element);

    // error data from @wire
    await getObjectInfo.error(mockGetObjectInfoError);

    // アサーション - クラスセレクタで直接取得
    const errorDiv = element.shadowRoot.querySelector('.slds-theme_error');
    expect(errorDiv).not.toBeNull();
    expect(errorDiv.classList.contains('slds-scoped-notification')).toBe(true);

    // クラスセレクタで直接要素を取得（インデックスアクセスを避ける）
    const divBody = errorDiv.querySelector('.slds-media__body');
    expect(divBody).not.toBeNull();

    // pタグのテキスト確認
    const errorMessage = divBody.querySelector('p');
    expect(errorMessage.textContent).toBe('【MySimpleTable Component Error】An error occurred when retrieving the data.');

    // エラーリストの確認
    const errUiList = divBody.querySelector('ul');
    expect(errUiList).not.toBeNull();
    expect(errUiList.classList.contains('slds-list_dotted')).toBe(true);

    // liタグをすべて取得してテキスト確認
    const listItems = errUiList.querySelectorAll('li');
    expect(listItems.length).toBe(2);
    expect(listItems[0].textContent).toBe('403:INSUFFICIENT_ACCESS:このレコードへのアクセス権がありません。システム管理者にサポートを依頼するか、アクセス権を要求してください。');
    expect(listItems[1].textContent).toContain('error method: getObjectInfo');
  });
});
