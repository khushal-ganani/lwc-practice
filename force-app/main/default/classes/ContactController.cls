public class ContactController {

    @AuraEnabled(cacheable = true)
    public static List<Contact> getContactsRelatedToAccount(String recordId) {
        Id accountId = (Id) recordId;
        List<Contact> conList = [SELECT Id, FirstName, LastName, Title, Phone, Email, AccountId, Account.Name, LeadSource FROM Contact WHERE AccountId = :accountId LIMIT 10];

        return conList;
    }
}