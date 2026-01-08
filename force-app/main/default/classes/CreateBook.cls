public with sharing class CreateBook {
    
    // Bookレコードを作成するメソッド
    public static Id createBook(String bookName, Decimal price) {
        Book__c newBook = new Book__c();
        newBook.Name = bookName;
        newBook.Price__c = price;
        
        insert newBook;
        return newBook.Id;
    }
    
    // 複数のBookレコードを一括作成するメソッド
    public static List<Id> createBooks(List<Book__c> books) {
        if (books == null || books.isEmpty()) {
            return new List<Id>();
        }
        
        insert books;
        
        List<Id> bookIds = new List<Id>();
        for (Book__c book : books) {
            bookIds.add(book.Id);
        }
        return bookIds;
    }
    
    // IDでBookを取得するメソッド
    public static Book__c getBookById(Id bookId) {
        List<Book__c> books = [
            SELECT Id, Name, Price__c, CreatedDate, OwnerId
            FROM Book__c
            WHERE Id = :bookId
            LIMIT 1
        ];
        
        return books.isEmpty() ? null : books[0];
    }
    
    // Book名で検索するメソッド
    public static List<Book__c> getBooksByName(String bookName) {
        String searchPattern = '%' + bookName + '%';
        return [
            SELECT Id, Name, Price__c, CreatedDate
            FROM Book__c
            WHERE Name LIKE :searchPattern
            ORDER BY Name ASC
        ];
    }
    
    // Bookを更新するメソッド
    public static void updateBook(Id bookId, String bookName, Decimal price) {
        Book__c bookToUpdate = new Book__c(Id = bookId);
        
        if (bookName != null) {
            bookToUpdate.Name = bookName;
        }
        if (price != null) {
            bookToUpdate.Price__c = price;
        }
        
        update bookToUpdate;
    }
    
    // Bookを削除するメソッド
    public static void deleteBook(Id bookId) {
        Book__c bookToDelete = new Book__c(Id = bookId);
        delete bookToDelete;
    }
    
    // 価格範囲でBookを検索するメソッド
    public static List<Book__c> getBooksByPriceRange(Decimal minPrice, Decimal maxPrice) {
        return [
            SELECT Id, Name, Price__c, CreatedDate
            FROM Book__c
            WHERE Price__c >= :minPrice AND Price__c <= :maxPrice
            ORDER BY Price__c ASC
        ];
    }
    
    // 全てのBookを取得するメソッド
    public static List<Book__c> getAllBooks() {
        return [
            SELECT Id, Name, Price__c, CreatedDate, OwnerId
            FROM Book__c
            ORDER BY CreatedDate DESC
            LIMIT 1000
        ];
    }
}