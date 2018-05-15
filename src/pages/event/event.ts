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
  loader = this.loadingCtrl.create()
  user: any;
  isLogged = false;
  isViewingMap = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private api: ApiProvider,
    private loadingCtrl: LoadingController, private global: GlobalProvider, private platform: Platform) {
    this.isLogged = global.isLogged;
    this.user = global.user;
    this.loader.present()
    this.event = this.navParams.get('event');
    this.getCommentsByEventId();
    console.log(this.user);
    console.log(this.event);
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

  getCommentsByEventId() {
    this.api.getCommentsByEventId(this.event.event_id).then(res => {
      let data: any = res;
      if (data.comments.length > 0) {
        data.comments.forEach(comment => {
          this.comments.push(comment)
        });
        console.log(this.comments);
      }
      this.loader.dismiss();
    })
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
