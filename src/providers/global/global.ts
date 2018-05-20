import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {
  isLogged;
  user;
  loading;
  constructor(public http: HttpClient, private toastCtrl: ToastController, private loadingCtrl: LoadingController) {
    
  }
  displayToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  showLoading() {
    if(!this.loading){
        this.loading = this.loadingCtrl.create({
            content: 'Please Wait...'
        });
        this.loading.present();
    }
}

dismissLoading(){
    if(this.loading){
        this.loading.dismiss();
        this.loading = null;
    }
}
}
