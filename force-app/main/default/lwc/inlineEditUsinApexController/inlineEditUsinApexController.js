import { LightningElement, api, wire } from 'lwc';

import getContactsRelatedToAccount from '@salesforce/apex/contactController.getContactsRelatedToAccount';
import updateContacts from '@salesforce/apex/ContactController.updateContacts';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import CONTACT_FIRST_NAME_FIELD from '@salesforce/schema/Contact.FirstName';
import CONTACT_LAST_NAME_FIELD from '@salesforce/schema/Contact.LastName';
import CONTACT_TITLE_FIELD from '@salesforce/schema/Contact.Title';
import CONTACT_PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import CONTACT_EMAIL_FIELD from '@salesforce/schema/Contact.Email';

import { refreshApex } from '@salesforce/apex'

import { notifyRecordUpdateAvailable } from "lightning/uiRecordApi";

const COLUMNS = [
    { label: 'First Name', fieldName: CONTACT_FIRST_NAME_FIELD.fieldApiName, type: 'text', editable: true },
    { label: 'Last Name', fieldName: CONTACT_LAST_NAME_FIELD.fieldApiName, type: 'text', editable: true },
    { label: 'Title', fieldName: CONTACT_TITLE_FIELD.fieldApiName, type: 'text', editable: true },
    { label: 'Phone', fieldName: CONTACT_PHONE_FIELD.fieldApiName, type: 'phone', editable: true },
    { label: 'Email', fieldName: CONTACT_EMAIL_FIELD.fieldApiName, type: 'email', editable: true }
];

export default class InlineEditUsinApexController extends LightningElement {
    @api recordId
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
        let updateDraftValues = event.detail.draftValues;
        console.log('draft-values: ', updateDraftValues);

        // Prepare the record IDs for notifyRecordUpdateAvailable()
        const notifyChangeIds = updateDraftValues.map(row => { return { "recordId": row.Id } });

        try {
            const result = await updateContacts({ updatedData: updateDraftValues });
            console.log('result from apex controller: ', result);

            const toastEvent = new ShowToastEvent({
                title: 'Records Updated',
                message: 'Contact Record was updated successfully!',
                variant: 'success'
            });
            this.dispatchEvent(toastEvent);

            //! Refresh LDS cache and wires
            //! notifyRecordUpdateAvailable(recordIds): Informs Lightning Data Service that record data has changed so 
            //! that Lightning Data Service can take the appropriate actions to keep wire adapters updated with the latest
            //! record data. Call this function to notify Lightning Data Service that a record has changed outside its 
            //! mechanisms, such as via imperative Apex or by calling User Interface API via a third-party framework. 
            //! This function supersedes getRecordNotifyChange(recordIds).
            notifyRecordUpdateAvailable(notifyChangeIds);

            await refreshApex(this.contactRefreshProperty);
            this.draftValues = [];
            console.log('refresh apex finished executing');
        } catch(error) {
            console.log('InlineEditUsingApexController apex result error: ', error);
            this.draftValues = updateDraftValues;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error updating or refreshing the record!',
                    message: 'An unexpected error occurred: ' + error.body.message,
                    variant: 'error'
                })
            );
        }
    }

    async handleRefresh() {
        await refreshApex(this.contactRefreshProperty);
    }
}