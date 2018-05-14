export class Event {
    event_id;
    event_name;
    event_date;
    event_time;
    address;
    description;
    image;
    lat;
    lng;
    status;
    category;
    constructor (event){
        this.event_id = event.event_id;
        this.event_name = event.event_name;
        this.event_date = event.event_date;
        this.event_time = event.event_time;
        this.address = event.address;
        this.description = event.description;
        this.image = event.image;
        this.lat = event.lat;
        this.lng = event.lng;
        this.status = event.status;
        this.category = event.category;
    }
}