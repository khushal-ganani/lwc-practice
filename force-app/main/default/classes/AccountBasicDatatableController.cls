public with sharing class AccountBasicDatatableController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        return [SELECT id, Name, Phone FROM Account ORDER BY createdDate ASC LIMIT 10];
    }
}