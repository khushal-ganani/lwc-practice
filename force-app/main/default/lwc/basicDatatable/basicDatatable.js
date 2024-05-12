import { LightningElement, wire } from 'lwc';

import getAccounts from '@salesforce/apex/AccountBasicDatatableController.getAccounts';

import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_ID_FIELD from '@salesforce/schema/Account.Id';
import ACCOUNT_PHONE_FIELD from '@salesforce/schema/Account.Phone';

const COLUMNS = [
    { label: 'Name', fieldName: ACCOUNT_NAME_FIELD.fieldApiName, type: 'text' },
    { label: 'Id', fieldName: ACCOUNT_ID_FIELD.fieldApiName, type: 'text' },
    { label: 'Phone', fieldName: ACCOUNT_PHONE_FIELD.fieldApiName, type: 'phone' }
]
export default class BasicDatatable extends LightningElement {
    columns = COLUMNS;
    accounts;

    @wire(getAccounts)
    data ({ error, data }){
        if(data) {
            console.log('data from wire : ',data);
            this.accounts = data;
        } else if(error) {
            this.error = error;
            console.log('Error in wire : ', error);
        }
    }
}