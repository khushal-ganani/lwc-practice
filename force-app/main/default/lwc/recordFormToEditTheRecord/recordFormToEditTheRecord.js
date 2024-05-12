import { LightningElement, api } from 'lwc';

import OPPORTUNITY_NAME_FIELD from '@salesforce/schema/Opportunity.Name';
import OPPORTUNITY_AMOUNT_FIELD from '@salesforce/schema/Opportunity.Amount';
import OPPORTUNITY_STAGE_NAME_FIELD from '@salesforce/schema/Opportunity.StageName';

export default class RecordFormToEditTheRecord extends LightningElement {

    fields = [OPPORTUNITY_NAME_FIELD, OPPORTUNITY_AMOUNT_FIELD, OPPORTUNITY_STAGE_NAME_FIELD];

    @api recordId;
    @api fieldApiName;
    handleSubmit(event) {
        event.preventDefault(); // stop the form from submitting
        const fields = event.detail.fields;
        fields.Name += 'from record-form'; // modify a field
        this.template.querySelector('lightning-record-form').submit(fields);
    }

    handeSuccess(event) {
        event.preventDefault();
        event.stopPropagation();

        console.log('Record Created Successfully!!');
    }
}