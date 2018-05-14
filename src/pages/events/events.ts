import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { GlobalProvider } from '../../providers/global/global';
import { Event } from '../../objects/event'
import { EventPage } from '../event/event';


@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  category: any = []
  events: any = [];
  event: any = {};
  result: any;
  loader = this.loadingCtrl.create();
  isSearching = false;
  date;
  keyword = '';
  categorySearch;
  constructor(public navCtrl: NavController, public navParams: NavParams, private api: ApiProvider,
    private loadingCtrl: LoadingController, private global: GlobalProvider) {
    this.getEvents();
    if (this.navParams.get('isSearching')) {
      this.isSearching = true;
      this.date = this.navParams.get('date');
      this.keyword = this.navParams.get('keyword');
    }
    else {
      this.isSearching = true;
      this.categorySearch = this.navParams.get('category');
      console.log(this.categorySearch);
    }



  }

  ionViewDidLoad() {
    this.category = this.events;
  }
  getEvents() {
    this.loader.present();
    this.api.getEvents().then(res => {
      this.result = res;
      if (this.result.events.length > 0) {
        for (var i = 0; i < this.result.events.length; i++) {
          if (this.result.events[i].status == 'Approved') {
            this.event = new Event(this.result.events[i]);
            this.events.push(this.event);
          }
        }
        console.log(this.events);
        if (this.isSearching) {
          if (this.categorySearch)
            this.onFilter(this.categorySearch);
          else {
            //to filter the data
            this.search(this.keyword, this.date);
          }
        }
      }
      else
        this.global.displayToast("No events soon");
    }, err => {
      this.global.displayToast("Error in loading events, try again");
    })
    this.loader.dismiss();

  }
  search(search, date) {
    let val = search;
    console.log(search);
    if (val.trim() !== '') {
      this.category = this.events.filter((item) => {
        return item.event_name.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
          item.description.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
          item.event_date.indexOf(date) > -1
      })
    }
  }
  onFilter(category: string): void {
    // only filter if category is different from 'All Events'
    if (category !== '4') {
      this.category = this.events.filter((item) => {
        return item.category.toLowerCase().indexOf(category.toLowerCase()) > -1;
      })
    }
    else
      this.category = this.events;
  }
  pushToEvent(event) {
    this.navCtrl.push(EventPage, { event: event });
  }
}
