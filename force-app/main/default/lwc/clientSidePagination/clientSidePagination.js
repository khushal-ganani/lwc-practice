 import { LightningElement, wire, track } from 'lwc';
 import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
 import ACCOUNT_RATING_FIELD from '@salesforce/schema/Account.Rating';
 import ACCOUNT_INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
 import ACCOUNT_ANNUAL_REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
 import ACCOUNT_PHONE_FIELD from '@salesforce/schema/Account.Phone';
 import getAllAccounts from '@salesforce/apex/AccountBasicDatatableController.getAllAccounts';
 
 const COLUMNS = [
    { label: 'Name', fieldName: ACCOUNT_NAME_FIELD.fieldApiName, type: 'text' },
    { label: 'Rating', fieldName: ACCOUNT_RATING_FIELD.fieldApiName, type: 'text' },
    { label: 'Industry', fieldName: ACCOUNT_INDUSTRY_FIELD.fieldApiName, type: 'text' },
    { label: 'Annual Revenue', fieldName: ACCOUNT_ANNUAL_REVENUE_FIELD.fieldApiName, type: 'currency' },
    { label: 'Phone', fieldName: ACCOUNT_PHONE_FIELD.fieldApiName, type: 'phone' },
 ]
 export default class ClientSidePagination extends LightningElement {
     columns = COLUMNS;
     rowOffset = 0;
     @track data;
     wireResult;
 
     // Pagination variables
     pageNumber = 1;
     pageSize = 5;
     totalItemCount
 
     @wire(getAllAccounts)
     accountData (result) {
        if(result.data) {
            let wireResult = result.data;
            this.wireResult = wireResult;
            this.totalItemCount = wireResult.length;
            this.data = wireResult.slice(0, 5);
        } else if (result.error) {
            console.log('error in wire: ', result.error);
        };
     }
 
  handlePreviousPage() {
  this.pageNumber = this.pageNumber - 1;
  this.rowOffset = (this.pageNumber - 1) * this.pageSize;
  this.handlePageChange();
  } 
  handleNextPage() {
  this.pageNumber = this.pageNumber + 1;
  this.rowOffset = (this.pageNumber - 1) * this.pageSize;
  this.handlePageChange();
  } 
  handlePageChange() {
       let initialSlice = (this.pageNumber - 1) * this.pageSize;
       let finalSlice = this.pageNumber * this.pageSize;
       this.data = this.wireResult.slice(initialSlice, finalSlice);
  }
 }