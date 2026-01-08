@isTest
private class CreateBookTriggerTest {
    
    // before insert: 価格が未設定の場合、デフォルト値0が設定されることを確認
    @isTest
    static void testBeforeInsert_PriceNull_SetsDefaultPrice() {
        Book__c book = new Book__c(Name = 'Test Book');
        
        Test.startTest();
        insert book;
        Test.stopTest();
        
        Book__c insertedBook = [SELECT Id, Name, Price__c FROM Book__c WHERE Id = :book.Id];
        System.assertEquals(0, insertedBook.Price__c, '価格が未設定の場合、0が設定されるべき');
    }
    
    // before insert: 価格がマイナスの場合、0に修正されることを確認
    @isTest
    static void testBeforeInsert_NegativePrice_SetsToZero() {
        Book__c book = new Book__c(Name = 'Test Book', Price__c = -100);
        
        Test.startTest();
        insert book;
        Test.stopTest();
        
        Book__c insertedBook = [SELECT Id, Name, Price__c FROM Book__c WHERE Id = :book.Id];
        System.assertEquals(0, insertedBook.Price__c, 'マイナス価格は0に修正されるべき');
    }
    
    // before insert: Book名の前後の空白が削除されることを確認
    @isTest
    static void testBeforeInsert_TrimsBookName() {
        Book__c book = new Book__c(Name = '  Test Book  ', Price__c = 1000);
        
        Test.startTest();
        insert book;
        Test.stopTest();
        
        Book__c insertedBook = [SELECT Id, Name FROM Book__c WHERE Id = :book.Id];
        System.assertEquals('Test Book', insertedBook.Name, 'Book名の前後の空白が削除されるべき');
    }
    
    // before insert: 正常な値の場合、そのまま保存されることを確認
    @isTest
    static void testBeforeInsert_ValidData_SavesCorrectly() {
        Book__c book = new Book__c(Name = 'Valid Book', Price__c = 1500);
        
        Test.startTest();
        insert book;
        Test.stopTest();
        
        Book__c insertedBook = [SELECT Id, Name, Price__c FROM Book__c WHERE Id = :book.Id];
        System.assertEquals('Valid Book', insertedBook.Name, 'Book名が正しく保存されるべき');
        System.assertEquals(1500, insertedBook.Price__c, '価格が正しく保存されるべき');
    }
    
    // before update: 価格がマイナスに変更された場合、エラーが発生することを確認
    @isTest
    static void testBeforeUpdate_NegativePrice_ThrowsError() {
        Book__c book = new Book__c(Name = 'Test Book', Price__c = 1000);
        insert book;
        
        book.Price__c = -500;
        
        Test.startTest();
        try {
            update book;
            System.assert(false, 'マイナス価格でエラーが発生するべき');
        } catch (DmlException e) {
            System.assert(e.getMessage().contains('価格は0以上で入力してください'), 
                         'エラーメッセージが正しくない: ' + e.getMessage());
        }
        Test.stopTest();
    }
    
    // before update: Book名の前後の空白が削除されることを確認
    @isTest
    static void testBeforeUpdate_TrimsBookName() {
        Book__c book = new Book__c(Name = 'Original Name', Price__c = 1000);
        insert book;
        
        book.Name = '  Updated Name  ';
        
        Test.startTest();
        update book;
        Test.stopTest();
        
        Book__c updatedBook = [SELECT Id, Name FROM Book__c WHERE Id = :book.Id];
        System.assertEquals('Updated Name', updatedBook.Name, '更新時もBook名の空白が削除されるべき');
    }
    
    // before update: 正常な価格更新の場合、正しく保存されることを確認
    @isTest
    static void testBeforeUpdate_ValidPriceChange_SavesCorrectly() {
        Book__c book = new Book__c(Name = 'Test Book', Price__c = 1000);
        insert book;
        
        book.Price__c = 2000;
        
        Test.startTest();
        update book;
        Test.stopTest();
        
        Book__c updatedBook = [SELECT Id, Price__c FROM Book__c WHERE Id = :book.Id];
        System.assertEquals(2000, updatedBook.Price__c, '価格が正しく更新されるべき');
    }
    
    // 一括処理のテスト（バルク処理対応確認）
    @isTest
    static void testBulkInsert() {
        List<Book__c> books = new List<Book__c>();
        for (Integer i = 0; i < 200; i++) {
            books.add(new Book__c(
                Name = '  Book ' + i + '  ',
                Price__c = (Math.mod(i, 3) == 0) ? null : (Math.mod(i, 3) == 1) ? -100 : 1000
            ));
        }
        
        Test.startTest();
        insert books;
        Test.stopTest();
        
        List<Book__c> insertedBooks = [SELECT Id, Name, Price__c FROM Book__c];
        System.assertEquals(200, insertedBooks.size(), '200件のレコードが作成されるべき');
        
        for (Book__c book : insertedBooks) {
            System.assert(!book.Name.startsWith(' '), 'Book名の先頭に空白があってはならない');
            System.assert(!book.Name.endsWith(' '), 'Book名の末尾に空白があってはならない');
            System.assert(book.Price__c >= 0, '価格は0以上であるべき');
        }
    }
}
