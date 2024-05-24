public class ContactController {

    @AuraEnabled(cacheable = true)
    public static List<Contact> getContactsRelatedToAccount(String recordId) {
        Id accountId = (Id) recordId;
        List<Contact> conList = [SELECT Id, FirstName, LastName, Title, Phone, Email, AccountId, Account.Name, LeadSource FROM Contact WHERE AccountId = :accountId LIMIT 10];
        return conList;
    }
    
    @AuraEnabled
    public static string updateContacts(Object updatedData){
        System.debug('Inside updateContacts method');

        List<Contact> updatedContacts = (List<Contact>)JSON.deserialize(JSON.serialize(updatedData, true), List<Contact>.class);
        try {
            update updatedContacts;
            System.debug('Successfully updated the contacts!!');
            return 'Success: Contact(s) updated successfully';
        } catch (Exception e) {
            return 'The following exception has occurred: ' + e.getMessage();
        }
    }
}