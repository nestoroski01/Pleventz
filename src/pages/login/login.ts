import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { GlobalProvider } from '../../providers/global/global';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  typeForm = "login";
  loginData: any = {};
  registerData: any = {};
  loginForm: FormGroup;
  registerForm: FormGroup;
  loader = this.loadingCtrl.create();
  user: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private api: ApiProvider,
    private global: GlobalProvider, private loadingCtrl: LoadingController, private storage: NativeStorage) {
    this.registerData.terms = false;
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.minLength(6),
        Validators.required
      ])
    });
    this.registerForm = new FormGroup({
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
      terms: new FormControl('', [
        Validators.requiredTrue
      ]),
    })
  }

  login() {
    if (!this.loginForm.controls.email.valid) {
      this.global.displayToast("Enter your mail!");
      return;
    }
    if (!this.loginForm.controls.password.valid) {
      this.global.displayToast('The password should be at least 6 chars!');
      return;
    }
    this.proceedLogin();
  }
  proceedLogin(){
    this.loader.present()
    this.api.login(this.loginData.email,this.loginData.password).then(res => {
      this.user = res;
      this.global.displayToast(this.user.message);
      if(this.user.status > 0){
        this.global.user = this.user.object;
        this.global.isLogged = true;
        this.navCtrl.pop();
        this.storage.setItem('user', this.global.user);
        this.storage.setItem('isLogged', true);
        }
      this.loader.dismiss();
    }).catch(err => {
      this.global.displayToast("Try again");
      console.log("ERROR - ", err);
      this.loader.dismiss();      
    })
  }
  register(){
    if(!this.registerForm.controls.forename.valid){
      this.global.displayToast("Enter your name!");
      return;
    }
    if(!this.registerForm.controls.surname.valid){
      this.global.displayToast("Enter your surname!");
      return;
    }
    if(!this.registerForm.controls.username.valid){
      this.global.displayToast("Enter your username!");
      return;
    }
    if(!this.registerForm.controls.email.valid){
      this.global.displayToast("Enter your email!");
      return;
    }
    if(!this.registerForm.controls.password.valid){
      this.global.displayToast("The password should be at least 6 chars!");
      return;
    }
    if(!this.registerForm.controls.confirmPassword.valid){
      this.global.displayToast("The confirm password should be at least 6 chars!");
      return;
    }
    if(!this.registerForm.controls.terms.valid){
      this.global.displayToast("Accept the terms!");
      return;
    }
    if(this.registerData.password != this.registerData.confirmPassword){
      this.global.displayToast("The passwords do not match!");
      return;
    }
    this.proceedRegister();
  }
  proceedRegister(){
    this.loader.present();
    this.api.register(this.registerData.email,this.registerData.password, this.registerData.forename, this.registerData.surname, this.registerData.username).then(res => {
      this.user = res;
      if(this.user.status > 0){
        this.global.displayToast(this.user.message);
        this.global.user = this.user.object;
        this.global.isLogged = true;
        this.navCtrl.pop();
      }
      else
        this.global.displayToast(this.user.validation_error[0]);        
      this.loader.dismiss()      
    }).catch(err => {
      this.global.displayToast("Try again");
      console.log("ERROR - ", err);
      this.loader.dismiss();      
    })
  }
}
