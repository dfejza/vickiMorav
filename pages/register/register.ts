import { Component } from '@angular/core';
import { NavController, LoadingController, Platform, AlertController } from 'ionic-angular';
import { Toast, Diagnostic, NativeStorage } from 'ionic-native';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Registration } from '../../models/account'
import { AccountProvider } from "../../providers/account-provider"

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  loginForm: FormGroup;
  type: any;
  check: any;
  status: any = "check";
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  animateClass = { 'zoom-in': true };
  alert: any;

    constructor(private platform: Platform,
     private builder: FormBuilder,
     private nav: NavController,
     private accountProvider : AccountProvider,
     public alertCtrl: AlertController,
     public loading: LoadingController) {
        this.nav = nav;
        this.platform = platform;
        this.type = "User";

        this.loginForm = builder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required]
        });  
  }

  createAlertSuccess(message){
    this.alert = this.alertCtrl.create({
      title: 'Account Registration Success',
      subTitle: message,
      buttons: [{
        text: 'Okay',
        handler: data => {
          this.nav.pop();
        }
      }]
    });
  }

  createAlertFail(message){
    this.alert = this.alertCtrl.create({
      title: 'Account Registration Failed',
      subTitle: message,
      buttons: [{
        text: 'Okay',
        handler: data => {
        }
      }]
    });
  }

  submit(){
    let loader = this.loading.create({
      content: 'Registering account...',
    });
    loader.present().then(() => {
      this.accountProvider.createUser(this.loginForm.value).then( data => {
        loader.dismiss();
        if((data as any).length == 0)
        {
          // inform user that request was successful
          this.createAlertSuccess("Account created!");
          this.alert.present();
        }
        else
        {
          this.createAlertFail(data[0].message);
          this.alert.present();
        }
      });
    });
  }

}
