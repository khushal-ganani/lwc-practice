public with sharing class AccountBasicDatatableController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        return [SELECT id, Name, Phone FROM Account ORDER BY createdDate ASC LIMIT 10];
    }

    @AuraEnabled(cacheable=true)
    public static AccountPaginationDetails getAccountsBasedOnPageNumber(Integer pageNumber, Integer pageSize){
        Integer offset = (pageNumber - 1) * pageSize;

        AccountPaginationDetails data = new AccountPaginationDetails();
        data.pageNumber = pageNumber;
        data.pageSize = pageSize;
        data.totalItemCount = [SELECT COUNT() FROM Account];
        data.records = Database.query(
            'SELECT Id, Name, Rating, Industry, AnnualRevenue, Phone FROM Account ORDER BY Name ' +
            ' LIMIT :pageSize OFFSET :offset'
        );
        return data;
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAllAccounts(){
        return [SELECT Id, Name, Rating, Industry, AnnualRevenue, Phone FROM Account ORDER BY Name];
    }
}