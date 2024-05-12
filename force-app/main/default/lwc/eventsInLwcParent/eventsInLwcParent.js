import { LightningElement } from 'lwc';

export default class EventsInLwcParent extends LightningElement {
    message;
    handleMyEvent(event) {
        console.log('message: ',event.detail.value);
        if(event.detail.value != ''){
            const msg = `Message from Sender: ${event.detail.message}`;
            this.message = msg;
        } else {
            this.message = '';
        }
    }
}