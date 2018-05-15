import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { GlobalProvider } from '../../providers/global/global';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NativeStorage } from '@ionic-native/native-storage';


@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  user: any = {};
  profileForm: FormGroup;
  loader = this.loadingCtrl.create();
  isEditing = false;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private api: ApiProvider,
  private global: GlobalProvider, private loadingCtrl: LoadingController, private storage: NativeStorage) {
    this.user = this.global.user
    console.log(this.user);
    this.profileForm = new FormGroup({
      forename: new FormControl('', [
        Validators.required
      ]),
      surname: new FormControl('', [
        Validators.required
      ]),
      username: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
    })
  }
  editToggle(){
    this.isEditing = !this.isEditing;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  updateProfile(){
    this.loader.present()
    this.api.updateProfile(this.user).then( res => {
      this.user = res;
      this.global.displayToast(this.user.message);
      if(this.user.status > 0){
        this.global.user = this.user.object;
        this.isEditing = false;
        }
      this.loader.dismiss();
    }).catch(err => {
      this.global.displayToast("Try again");
      console.log("ERROR - ", err);
      this.loader.dismiss(); 
    })
  }

  logOut(){
    // this.storage.setItem('isLogged', false);
    this.global.isLogged = false;
    this.navCtrl.pop();
  }

}
