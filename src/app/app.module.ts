import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CalendarModule } from 'ion2-calendar'
import { ApiProvider } from '../providers/api/api';
import { HttpClientModule } from '@angular/common/http';
import { GlobalProvider } from '../providers/global/global';
import { LoginPage } from '../pages/login/login';
import { AccountPage } from '../pages/account/account';
import { EventsPage } from '../pages/events/events';
import { EventPage } from '../pages/event/event';
import { NativeStorage } from '@ionic-native/native-storage'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    AccountPage,
    EventsPage,
    EventPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      scrollAssist: false
    }),
    CalendarModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    AccountPage,
    EventsPage,
    EventPage    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ApiProvider,
    GlobalProvider,
    NativeStorage
  ]
})
export class AppModule { }
