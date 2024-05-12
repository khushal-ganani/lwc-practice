import { LightningElement, wire } from 'lwc';
import { APPLICATION_SCOPE, MessageContext, subscribe, unsubscribe} from 'lightning/messageService';
import TEXT_MESSAGE from '@salesforce/messageChannel/myChannel__c';
/* https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_salesforce_modules */

export default class UnrelatedReceiver extends LightningElement {
    subscription = null;
    message;

    @wire(MessageContext)
    messageContext;

    connectedCallback(){
        this.subscribeToMessageChannel();
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }

    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(this.messageContext, TEXT_MESSAGE, 
                (message) => {
                    console.log('Message from LMS in the receiver: ', message);
                    this.handleMessage(message);
                },
                { scope: APPLICATION_SCOPE }
            );
        }
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    handleMessage(msg) {
        this.message = msg.message;
    }
}