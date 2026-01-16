import { createElement } from '@lwc/engine-dom';
import InputAccounts from 'c/inputAccounts';

describe('c-input-accounts', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('コンポーネントが正しくレンダリングされる', () => {
        const element = createElement('c-input-accounts', {
            is: InputAccounts
        });
        document.body.appendChild(element);

        const card = element.shadowRoot.querySelector('lightning-card');
        expect(card).not.toBeNull();
        expect(card.title).toBe('取引先入力フォーム');
    });

    it('取引先名が空の場合、追加ボタンが無効になる', () => {
        const element = createElement('c-input-accounts', {
            is: InputAccounts
        });
        document.body.appendChild(element);

        const buttons = element.shadowRoot.querySelectorAll('lightning-button');
        const addButton = Array.from(buttons).find(btn => btn.label === '追加');
        expect(addButton).not.toBeNull();
        expect(addButton.disabled).toBe(true);
    });

    it('初期状態では取引先リストが空であるメッセージが表示される', () => {
        const element = createElement('c-input-accounts', {
            is: InputAccounts
        });
        document.body.appendChild(element);

        const emptyMessage = element.shadowRoot.querySelector('.slds-text-color_weak');
        expect(emptyMessage).not.toBeNull();
        expect(emptyMessage.textContent).toBe('まだ取引先が登録されていません。');
    });

    it('クリアボタンをクリックすると入力フィールドがリセットされる', async () => {
        const element = createElement('c-input-accounts', {
            is: InputAccounts
        });
        document.body.appendChild(element);

        // 入力フィールドに値を設定
        const inputs = element.shadowRoot.querySelectorAll('lightning-input');
        const nameInput = Array.from(inputs).find(input => input.label === '取引先名');
        
        // changeイベントを発火して値を設定
        nameInput.dispatchEvent(new CustomEvent('change', { 
            target: { value: 'テスト株式会社' }
        }));

        await Promise.resolve();

        // クリアボタンをクリック
        const buttons = element.shadowRoot.querySelectorAll('lightning-button');
        const clearButton = Array.from(buttons).find(btn => btn.label === 'クリア');
        clearButton.click();

        await Promise.resolve();

        // 追加ボタンが無効になっていることでリセットを確認
        const addButton = Array.from(buttons).find(btn => btn.label === '追加');
        expect(addButton.disabled).toBe(true);
    });

    it('3つの入力フィールドが存在する', () => {
        const element = createElement('c-input-accounts', {
            is: InputAccounts
        });
        document.body.appendChild(element);

        const inputs = element.shadowRoot.querySelectorAll('lightning-input');
        expect(inputs.length).toBe(3);
    });

    it('取引先を追加すると件数が正しく表示される', async () => {
        const element = createElement('c-input-accounts', {
            is: InputAccounts
        });
        document.body.appendChild(element);

        // 取引先名を入力
        const inputs = element.shadowRoot.querySelectorAll('lightning-input');
        const nameInput = Array.from(inputs).find(input => input.label === '取引先名');
        nameInput.value = 'テスト株式会社';
        nameInput.dispatchEvent(new CustomEvent('change', { target: nameInput }));

        await Promise.resolve();

        // 追加ボタンをクリック
        const buttons = element.shadowRoot.querySelectorAll('lightning-button');
        const addButton = Array.from(buttons).find(btn => btn.label === '追加');
        addButton.click();

        await Promise.resolve();

        // 件数が表示されていることを確認
        const heading = element.shadowRoot.querySelector('.slds-text-heading_small');
        expect(heading).not.toBeNull();
        expect(heading.textContent).toBe('登録済み取引先 (1件)');

        // 2件目を追加
        nameInput.value = 'サンプル商事';
        nameInput.dispatchEvent(new CustomEvent('change', { target: nameInput }));
        await Promise.resolve();
        addButton.click();
        await Promise.resolve();

        // 件数が2件になっていることを確認
        expect(heading.textContent).toBe('登録済み取引先 (2件)');
    });
});