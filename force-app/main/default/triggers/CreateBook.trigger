trigger CreateBook on Book__c (before insert, before update, after insert, after update) {
    
    // before insert: 新規作成時の処理
    if (Trigger.isBefore && Trigger.isInsert) {
        for (Book__c book : Trigger.new) {
            // 価格が未設定の場合、デフォルト値を設定
            if (book.Price__c == null) {
                book.Price__c = 0;
            }
            
            // 価格がマイナスの場合、0に修正
            if (book.Price__c < 0) {
                book.Price__c = 0;
            }
            
            // Book名の前後の空白を削除
            if (book.Name != null) {
                book.Name = book.Name.trim();
            }
        }
    }
    
    // before update: 更新時の処理
    if (Trigger.isBefore && Trigger.isUpdate) {
        for (Book__c book : Trigger.new) {
            Book__c oldBook = Trigger.oldMap.get(book.Id);
            
            // 価格がマイナスに変更された場合、エラーを追加
            if (book.Price__c != null && book.Price__c < 0) {
                book.Price__c.addError('価格は0以上で入力してください。');
            }
            
            // Book名の前後の空白を削除
            if (book.Name != null) {
                book.Name = book.Name.trim();
            }
        }
    }
    
    // after insert: 新規作成後の処理
    if (Trigger.isAfter && Trigger.isInsert) {
        for (Book__c book : Trigger.new) {
            System.debug('新しいBookが作成されました: ' + book.Name + ' (価格: ' + book.Price__c + ')');
        }
    }
    
    // after update: 更新後の処理
    if (Trigger.isAfter && Trigger.isUpdate) {
        for (Book__c book : Trigger.new) {
            Book__c oldBook = Trigger.oldMap.get(book.Id);
            
            // 価格が変更された場合にログ出力
            if (book.Price__c != oldBook.Price__c) {
                System.debug('Bookの価格が変更されました: ' + book.Name + 
                           ' (旧価格: ' + oldBook.Price__c + ' → 新価格: ' + book.Price__c + ')');
            }
        }
    }
}