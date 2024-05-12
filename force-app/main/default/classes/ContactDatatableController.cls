public with sharing class ContactDatatableController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getTenContacts(){
        return [
            SELECT Id, FirstName, LastName, Title, Phone, Email
            FROM Contact 
            WITH USER_MODE 
            LIMIT 10
        ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactsBasedOnSorting(String orderBy, String direction){
        String query = 'SELECT Id, FirstName, LastName, Title, Phone, Email FROM Contact ORDER BY ' + orderBy + ' ' + direction + ' LIMIT 10';
        return Database.query(query);
    }
}