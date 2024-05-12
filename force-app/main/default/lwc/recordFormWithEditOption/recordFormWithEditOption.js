import { LightningElement, api } from 'lwc';

export default class RecordFormWithEditOption extends LightningElement {
    @api recordId;
    @api objectApiName;
}