export class Comment{
    comment_id;
    user_id;
    event_id;
    username;
    comment;
    date_added;
    constructor(comment){
        this.comment_id = comment.comment_id;
        this.user_id = comment.user_id;
        this.event_id = comment.event_id;
        this.username = comment.username;
        this.comment = this.comment.comment;
        this.date_added = this.comment.date_added.toString();
    }
}