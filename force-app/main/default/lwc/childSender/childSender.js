import { LightningElement, wire } from 'lwc';

import { MessageContext, publish } from 'lightning/messageService';
import TEXT_MESSAGE from '@salesforce/messageChannel/myChannel__c';
/* https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_salesforce_modules */

export default class EventsInLwc extends LightningElement {

    // renderedCallback() {
    //     let container = this.template.querySelector('container');
    //     container.addEventListener('myevent', (event) => {
    //         console.log('Received the event from the same sender comp: ', event.detail);
    //     });
    // }

    @wire(MessageContext)
    messageContext;

    handleChange(event){
        // console.log('onchange event on input field : ', event);

        //*! event.target gives the element on which the event is triggered
        // console.log('event.target on the onchange event on input field', event.target);

        //*! event.currentTarget gives the element on which the event listener is attached
        // console.log('event.currentTarget on the onchange event on input field', event.currentTarget);

        //! event.detail gives the data that is inside the event from the element
        // console.log('event.detail on the onchange event on input field', event.detail);

        //!Here in this case event.target.value and event.detail.value will give the same output, but target
        //! property will return the HTMLElement and detail will just return the data.

        const msg = event.target.value;
        this.dispatchEvent(new CustomEvent('myevent', {
            bubbles: true,
            detail: {
                message: msg
            }
        }, false));
    }

    handleClick() {
        const msg = this.template.querySelector('lightning-input').value;
        publish(this.messageContext, TEXT_MESSAGE, {
            message: msg
        });
    }
}