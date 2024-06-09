public class AccountPaginationDetails {
    @AuraEnabled
    public Integer pageSize { get; set; }
    
    @AuraEnabled
    public Integer pageNumber { get; set; }

    @AuraEnabled
    public Integer totalItemCount { get; set; }

    @AuraEnabled
    public Object[] records { get; set; }
}