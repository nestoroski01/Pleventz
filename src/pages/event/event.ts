import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, LoadingCmp, Platform } from 'ionic-angular';
import { Comment } from '../../objects/comment';
import { ApiProvider } from '../../providers/api/api';
import { GlobalProvider } from '../../providers/global/global';
import { LoginPage } from '../login/login';

declare var google;

@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  isCommenting = false;
  comment: String;
  event: any;
  comments: any = [];
  user: any;
  isLogged = false;
  isViewingMap = false;
  interested = false;
  going = false;
  canRespond = true;
  interestedCount = 0;
  goingCount = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, private api: ApiProvider,
    private loadingCtrl: LoadingController, private global: GlobalProvider, private platform: Platform) {
    this.event = this.navParams.get('event');
    this.getCommentsByEventId();
    console.log(this.canRespond);
  }
  ionViewWillEnter() {
    this.isLogged = this.global.isLogged;
    this.user = this.global.user;
    this.getResponses();
  }
  ionViewDidLeave() {
    this.isViewingMap = false;
  }
  addMarker(position, map) {
    return new google.maps.Marker({
      position,
      map
    });
  }
  toggleCommenting() {
    if (this.isCommenting)
      this.postComment();
    this.isCommenting = !this.isCommenting;
  }
  addResponse(response: string) {
    if (this.isLogged) {
      this.api.addResponse(this.event.event_id, this.user.user_id, response).then(res => {
        let respond: any = res;
        if (respond.status > 0) {
          this.canRespond = false;
          // this.response = response;
          if (response == 'Interested'){
            this.interestedCount++;
            this.interested = true;
          }
          else{
            this.goingCount++;
            this.going = true;
          }
        }
        this.global.displayToast(respond.message);
      }, err => {
        console.log(err);
        this.global.displayToast(err.message);
      })
    }
    else {
      this.navCtrl.push(LoginPage);
      this.global.displayToast("You need to be logged in");
    }
  }
  getResponses() {
      this.global.showLoading();
      this.interestedCount = 0;
      this.goingCount = 0;
      this.interested = false;
      this.going = false;
      this.api.getResponse(this.event.event_id).then(res => {
        let respond: any = res;
        respond.responses.forEach(response => {
          if (response.response == "Interested"){
            this.interestedCount++;
          }
          else if (response.response == "Going"){
            this.goingCount++;
          }
          if (this.isLogged) {
            if (response.user_id == this.user.user_id) {
              this.canRespond = false;
              if(response.response == "Interested")
                this.interested = true;
              else
                this.going = true;
            }
          }
        });
      })
      this.global.dismissLoading();

  }
  getCommentsByEventId() {
    this.global.showLoading();
    this.api.getCommentsByEventId(this.event.event_id).then(res => {
      let data: any = res;
      if (data.comments.length > 0) {
        data.comments.forEach(comment => {
          this.comments.push(comment)
        });
        console.log(this.comments);
      }
    })
    this.global.dismissLoading();
  }
  postComment() {
    this.api.postComment(this.event.event_id, this.comment, new Date().toISOString(),
      this.user.username, this.user.user_id).then(res => {
        let respond: any = res;
        if (respond.status > 0) {
          this.comments.push({
            comment: respond.comment_object.comment,
            comment_id: respond.comment_object.comment_id,
            date_added: respond.comment_object.date_added,
            event_id: respond.comment_object.event_id,
            user_id: respond.comment_object.user_id,
            username: respond.comment_object.username
          });
          this.global.displayToast(respond.message);
        }
        else {
          this.global.displayToast(respond.message);
        }
      })
  }
  deleteCommentValidate(comment_id) {
    // check if it's needed to show the delete button
    return (this.isLogged && (this.user.user_id == comment_id));
  }
  deleteComment(comment_id) {
    this.api.deleteComment(comment_id).then(res => {
      let respond: any = res;
      this.global.displayToast(respond.message);
      this.popComment(comment_id);
    })
  }
  popComment(comment_id) {
    console.log("pop func");
    let temp = [];
    for (let i = 0; i < this.comments.length; i++) {
      if (this.comments[i].comment_id != comment_id)
        temp.push(this.comments[i]);
    }
    this.comments = temp;
  }
  toggleMap() {
    this.isViewingMap = !this.isViewingMap;
    if (this.isViewingMap) {
      setTimeout(() => {
        this.platform.ready().then(() => {
          let mapOptions = {
            zoom: 10,
            fullscreenControl: false
          }

          this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

          let latLng = new google.maps.LatLng(this.event.lat, this.event.lng);
          this.map.setCenter(latLng);
          this.map.setZoom(15);
          this.addMarker(latLng, this.map);
        })
      }, 300);
    }
  }

}
