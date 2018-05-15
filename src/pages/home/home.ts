import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, ModalController } from 'ionic-angular';
import { CalendarModal, CalendarModalOptions, DayConfig, CalendarResult } from "ion2-calendar";
import { ApiProvider } from '../../providers/api/api';
import { LoginPage } from '../login/login';
import { GlobalProvider } from '../../providers/global/global';
import { AccountPage } from '../account/account';
import { EventsPage } from '../events/events';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  pictures: any = [{
    name: "all-events.jpg",
    text: "All Events",
    category: "4"
  },
  {
    name: "sports.jpg",
    text: "Sports",
    category: "1"    
  },
  {
    name: "concerts.jpg",
    text: "Concerts",
    category: "2"    
  },
  {
    name: "teathre-and-comedy.jpg",
    text: "Teathre And Comedy",
    category: "3"    
  }];

  date:any;
  keyword = '';
  constructor(public navCtrl: NavController, private platform: Platform, private modalCtrl: ModalController,
  private api: ApiProvider, private global: GlobalProvider) {
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      let mapOptions = {
        zoom: 10,
        fullscreenControl: false
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      let latLng = new google.maps.LatLng(50.376289, -4.142741);
      this.map.setCenter(latLng);
      this.map.setZoom(15);
      this.addMarker(latLng, this.map);
    })
  }
  addMarker(position, map) {
    return new google.maps.Marker({
      position,
      map
    });
  }
  openCalendar() {
    const options: CalendarModalOptions = {
      title: 'Select Date',
    };
    let myCalendar = this.modalCtrl.create(CalendarModal, {
      options: options
    });

    myCalendar.present();

    myCalendar.onDidDismiss((date: CalendarResult, type: string) => {
      if(date){
      // this.date = date.dateObj.toDateString();
      this.date = date.string;
      }
    });
  }
  pushToAccount(){
    if(!this.global.isLogged)
      this.navCtrl.push(LoginPage);
    else
      this.navCtrl.push(AccountPage);
  }
  pushToSearch(search, category){
    this.navCtrl.push(EventsPage, {
      isSearching: search,
      date: this.convertDate(new Date(this.date).toLocaleDateString()),
      keyword: this.keyword,
      category: category
    })

  }
  convertDate(date: String){
    let splitDate = date.split('/');
    return console.log(splitDate[0] + '-' + splitDate[1] + '-' + splitDate[2]);

  }
}
