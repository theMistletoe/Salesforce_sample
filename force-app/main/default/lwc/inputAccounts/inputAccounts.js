import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class InputAccounts extends LightningElement {
    // 入力フィールドの値
    accountName = '';
    phone = '';
    industry = '';

    // 取引先リスト
    @track accounts = [];

    // データテーブルの列定義
    columns = [
        { label: '取引先名', fieldName: 'name', type: 'text' },
        { label: '電話番号', fieldName: 'phone', type: 'phone' },
        { label: '業種', fieldName: 'industry', type: 'text' },
        {
            type: 'action',
            typeAttributes: {
                rowActions: [
                    { label: '削除', name: 'delete' }
                ]
            }
        }
    ];

    // ゲッター: 追加ボタンの無効化判定
    get isAddDisabled() {
        return !this.accountName || this.accountName.trim() === '';
    }

    // ゲッター: 取引先があるかどうか
    get hasAccounts() {
        return this.accounts.length > 0;
    }

    // ゲッター: 取引先の件数
    get accountCount() {
        return this.accounts.length;
    }

    // イベントハンドラー: 取引先名の変更
    handleNameChange(event) {
        this.accountName = event.target.value;
    }

    // イベントハンドラー: 電話番号の変更
    handlePhoneChange(event) {
        this.phone = event.target.value;
    }

    // イベントハンドラー: 業種の変更
    handleIndustryChange(event) {
        this.industry = event.target.value;
    }

    // イベントハンドラー: 取引先の追加
    handleAddAccount() {
        if (this.isAddDisabled) {
            return;
        }

        const newAccount = {
            id: Date.now().toString(), // 一意のID
            name: this.accountName.trim(),
            phone: this.phone.trim(),
            industry: this.industry.trim()
        };

        this.accounts = [...this.accounts, newAccount];
        this.handleClear();
        this.showToast('成功', '取引先を追加しました', 'success');
    }

    // イベントハンドラー: フォームのクリア
    handleClear() {
        this.accountName = '';
        this.phone = '';
        this.industry = '';
    }

    // イベントハンドラー: 行アクション（削除）
    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;

        if (actionName === 'delete') {
            this.accounts = this.accounts.filter(account => account.id !== row.id);
            this.showToast('成功', '取引先を削除しました', 'success');
        }
    }

    // トースト通知を表示
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }
}