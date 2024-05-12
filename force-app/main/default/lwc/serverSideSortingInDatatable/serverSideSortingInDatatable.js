import { LightningElement, wire } from 'lwc';

import getContactsBasedOnSorting from '@salesforce/apex/ContactDatatableController.getContactsBasedOnSorting';

const COLUMNS = [
    { label: 'First Name', fieldName: 'FirstName', type: 'text', sortable: true },
    { label: 'Last Name', fieldName: 'LastName', type: 'text', sortable: true },
    { label: 'Phone', fieldName: 'Phone', type: 'phone', sortable: true },
    { label: 'Email', fieldName: 'Email', type: 'email', sortable: true }
]

export default class ServerSideSortingInDatatable extends LightningElement {
    columns = COLUMNS;
    defaultSortDirection = 'asc';
    sortDirection = 'asc';
    sortedBy;
    contacts;
    error;

    constructor(){
        super();
        this.sortedBy = 'FirstName';
        this.sortDirection = 'asc';
    }

    @wire(getContactsBasedOnSorting, { orderBy: "$sortedBy", direction: "$sortDirection" })
    wiredContacts(result){
        if(result.data) {
            console.log('Result Data from wire in serverSideSorting: ', result.data);
            this.contacts = result.data;
            this.error = undefined;
        } else if(result.error){
            this.contacts = undefined;
            this.error = result.error;
            console.error('Error in wiring contacts: ', this.error);
        }
    }

    onSort(event) {
        console.log('onSort event ==> ', event);
        this.sortedBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
    }
}