export class Response {
    response_id;
    event_id;
    response;
    user_id;
    constructor(response: any){
        this.response_id = response.response_id;
        this.event_id = response.event_id;
        this.response = response.response;
        this.user_id = response.user_id;
    }
}