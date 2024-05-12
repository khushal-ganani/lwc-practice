import { LightningElement, wire } from 'lwc';

import getTenContacts from '@salesforce/apex/ContactDatatableController.getTenContacts';

const COLUMNS = [
    { label: 'First Name', fieldName: 'FirstName', type: 'text', sortable: true },
    { label: 'Last Name', fieldName: 'LastName', type: 'text', sortable: true },
    { label: 'Phone', fieldName: 'Phone', type: 'phone', sortable: true },
    { label: 'Email', fieldName: 'Email', type: 'email', sortable: true }
]

export default class ClientSideSortingInDatatable extends LightningElement {
    columns = COLUMNS;
    defaultSortDirection = 'asc';
    sortDirection = 'asc';
    sortedBy;
    contacts;
    error;

    @wire(getTenContacts)
    wiredContacts(result){
        if(result.data) {
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
        this.sortData(this.sortedBy, this.sortDirection);
    }

    /**
     * function to sort the data.
     */
    sortData(fieldName, sortDirection) {
        let parseData = JSON.parse(JSON.stringify(this.contacts));
        let keyValue = (a) => {
            return a[fieldName];
        }
        let isReverse = sortDirection === "asc" ? 1 : -1;
        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : "";
            y = keyValue(y) ? keyValue(y) : "";
            return isReverse() * ((x > y) - (y > x));
        })
        this.contacts = parseData;
    }
}