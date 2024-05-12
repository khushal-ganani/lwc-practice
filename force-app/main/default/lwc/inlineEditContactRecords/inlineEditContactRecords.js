import { LightningElement, wire, api } from 'lwc';
import getContactsRelatedToAccount from '@salesforce/apex/contactController.getContactsRelatedToAccount';

import CONTACT_FIRST_NAME_FIELD from '@salesforce/schema/Contact.FirstName';
import CONTACT_LAST_NAME_FIELD from '@salesforce/schema/Contact.LastName';
import CONTACT_TITLE_FIELD from '@salesforce/schema/Contact.Title';
import CONTACT_PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import CONTACT_EMAIL_FIELD from '@salesforce/schema/Contact.Email';

import { updateRecord } from 'lightning/uiRecordApi';
/* https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_lightning_ui_api_record */

import { refreshApex } from '@salesforce/apex'

const COLUMNS = [
    { label: 'First Name', fieldName: CONTACT_FIRST_NAME_FIELD.fieldApiName, type: 'text', editable: true },
    { label: 'Last Name', fieldName: CONTACT_LAST_NAME_FIELD.fieldApiName, type: 'text', editable: true },
    { label: 'Title', fieldName: CONTACT_TITLE_FIELD.fieldApiName, type: 'text', editable: true },
    { label: 'Phone', fieldName: CONTACT_PHONE_FIELD.fieldApiName, type: 'phone', editable: true },
    { label: 'Email', fieldName: CONTACT_EMAIL_FIELD.fieldApiName, type: 'email', editable: true }
];

export default class InlineEditContactRecords extends LightningElement {
    @api recordId;
    contacts;
    columns = COLUMNS;
    draftValues;
    contactRefreshProperty;

    @wire(getContactsRelatedToAccount, { recordId: "$recordId" })
    getContacts(result){
        this.contactRefreshProperty = result;
        if (result.data) {
            console.log('Contact records data from wire: ', result.data);
            this.contacts = result.data;
        } else if (result.error) {
            console.log('Error in wire function', result.error);
        }
    }

    async handleSave(event) {
        let draftValues = event.detail.draftValues;
        console.log('draftValues: ', draftValues);

        let updateRecords = draftValues.map((item) => {
            let fieldInput = { ...item };
            return {
                fields: fieldInput
            };
        })
        console.log('updateRecord wire method config Object: ', updateRecords);
        this.draftValues = [];

        //! First way to update record :-
        // let result = await updateRecords.forEach(record => {
        //     this.updateContactRecords(record);
        // });

        let promiseArray = [];
        for (let i = 0; i < updateRecords.length; i++) {
            promiseArray.push(updateRecord(updateRecords[i]));
        }

        // Promise.all() methods takes an array/list of promises and returns a promise which returns resolve when
        // all the promises in the array are resolved
        await Promise.all(promiseArray);
        console.log('Promise.all was resolved');

// ---------------------------------------------------------------------------------------------------------------
        
        //! Second way to update record
        // let updateRecordsArrayPromise = updateRecords.map((record) => {
        //     updateRecord(record);
        // });

        // await Promise.all(updateRecordsArrayPromise);

// --------------------------------------------------------------------------------------------------------------------

        await refreshApex(this.contactRefreshProperty);
        
        const toastEvent = new ShowToastEvent({
            title: 'Records Updated',
            message: 'Contact Record was updated successfully!',
            variant: 'success'
        });
        this.dispatchEvent(toastEvent);
    }

    async handleRefresh() {
        await refreshApex(this.contactRefreshProperty);
    }
}