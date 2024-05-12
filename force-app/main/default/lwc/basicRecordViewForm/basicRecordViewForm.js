import { LightningElement, api } from 'lwc';

import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_RATING_FIELD from '@salesforce/schema/Account.Rating';
import ACCOUNT_INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

export default class BasicRecordViewForm extends LightningElement {
    @api recordId;
    @api objectApiName;
    fields = [ACCOUNT_NAME_FIELD, ACCOUNT_RATING_FIELD, ACCOUNT_INDUSTRY_FIELD];
}