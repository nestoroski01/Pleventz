import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { EventsPage } from '../pages/events/events';
import { AccountPage } from '../pages/account/account';
import { NativeStorage } from '@ionic-native/native-storage';
import { GlobalProvider } from '../providers/global/global';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
  private storage: NativeStorage, private global: GlobalProvider) {
    this.initializeApp();
    // this is commented so you can run it in your browser.
    // this.storage.getItem('isLogged').then( val => {
    //   console.log(val);
    //   if(val == true)
    //   this.storage.getItem('user').then(val => {
    //     this.global.user = val;
    //     this.global.isLogged = true;
    //   })
    // })

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Events', component: EventsPage},
    ];

  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
