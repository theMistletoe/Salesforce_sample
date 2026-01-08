// Bookレコードを取得するスクリプト
// 実行方法: SFDX: Execute Anonymous Apex with Editor Contents

// 全てのBookレコードを取得（最大10件）
List<Book__c> books = [
    SELECT Id, Name, Price__c, CreatedDate 
    FROM Book__c 
    ORDER BY CreatedDate DESC
    LIMIT 10
];

System.debug('=== Bookレコード取得結果 ===');
System.debug('取得したBookレコード数: ' + books.size());

if (books.isEmpty()) {
    System.debug('Bookレコードが見つかりませんでした。');
} else {
    for (Book__c book : books) {
        System.debug('ID: ' + book.Id + ', Book名: ' + book.Name + ', 価格: ' + book.Price__c);
    }
}