@isTest
private class AccountContactPhoneSyncTest {
    
    /**
     * Account更新時に関連するContactの電話番号がAccountの電話番号に同期されることを確認
     */
    @isTest
    static void testAccountPhoneUpdate_SyncsToContacts() {
        // テストデータ作成
        Account testAccount = new Account(
            Name = 'Test Account',
            Phone = '03-1111-2222'
        );
        insert testAccount;
        
        // 関連するContactを作成
        List<Contact> contacts = new List<Contact>();
        contacts.add(new Contact(
            FirstName = 'Test',
            LastName = 'Contact1',
            AccountId = testAccount.Id,
            Phone = '090-1111-1111'
        ));
        contacts.add(new Contact(
            FirstName = 'Test',
            LastName = 'Contact2',
            AccountId = testAccount.Id,
            Phone = '090-2222-2222'
        ));
        insert contacts;
        
        // Accountの電話番号を更新
        String newPhone = '03-9999-8888';
        testAccount.Phone = newPhone;
        
        Test.startTest();
        update testAccount;
        Test.stopTest();
        
        // 関連するContactの電話番号が同期されていることを確認
        List<Contact> updatedContacts = [
            SELECT Id, Phone 
            FROM Contact 
            WHERE AccountId = :testAccount.Id
        ];
        
        System.assertEquals(2, updatedContacts.size(), '2件のContactが存在するべき');
        for (Contact c : updatedContacts) {
            System.assertEquals(newPhone, c.Phone, 
                'ContactのPhoneがAccountのPhoneに同期されるべき');
        }
    }
    
    /**
     * Accountに関連するContactがない場合でもエラーが発生しないことを確認
     */
    @isTest
    static void testAccountPhoneUpdate_NoContacts_NoError() {
        // ContactなしのAccountを作成
        Account testAccount = new Account(
            Name = 'Test Account No Contacts',
            Phone = '03-1111-2222'
        );
        insert testAccount;
        
        // Accountの電話番号を更新
        testAccount.Phone = '03-9999-8888';
        
        Test.startTest();
        // エラーが発生しないことを確認
        try {
            update testAccount;
            System.assert(true, 'Contactがなくてもエラーは発生しないべき');
        } catch (Exception e) {
            System.assert(false, '予期しないエラーが発生: ' + e.getMessage());
        }
        Test.stopTest();
    }
    
    /**
     * 複数のAccountを一括更新した場合も正しく同期されることを確認
     */
    @isTest
    static void testBulkAccountPhoneUpdate_SyncsToContacts() {
        // 複数のAccountを作成
        List<Account> accounts = new List<Account>();
        for (Integer i = 0; i < 5; i++) {
            accounts.add(new Account(
                Name = 'Test Account ' + i,
                Phone = '03-0000-000' + i
            ));
        }
        insert accounts;
        
        // 各Accountに関連するContactを作成
        List<Contact> contacts = new List<Contact>();
        for (Account acc : accounts) {
            contacts.add(new Contact(
                FirstName = 'Test',
                LastName = 'Contact for ' + acc.Name,
                AccountId = acc.Id,
                Phone = '090-0000-0000'
            ));
        }
        insert contacts;
        
        // 全Accountの電話番号を一括更新
        for (Integer i = 0; i < accounts.size(); i++) {
            accounts[i].Phone = '03-9999-999' + i;
        }
        
        Test.startTest();
        update accounts;
        Test.stopTest();
        
        // 各ContactがそれぞれのAccountのPhoneに同期されていることを確認
        Map<Id, Account> accountMap = new Map<Id, Account>(accounts);
        List<Contact> updatedContacts = [
            SELECT Id, Phone, AccountId 
            FROM Contact 
            WHERE AccountId IN :accountMap.keySet()
        ];
        
        System.assertEquals(5, updatedContacts.size(), '5件のContactが存在するべき');
        for (Contact c : updatedContacts) {
            Account relatedAccount = accountMap.get(c.AccountId);
            System.assertEquals(relatedAccount.Phone, c.Phone, 
                'ContactのPhoneが関連AccountのPhoneに同期されるべき');
        }
    }
}
