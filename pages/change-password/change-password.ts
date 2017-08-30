import { Component } from '@angular/core';
import { NavController,LoadingController, Platform, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountProvider } from "../../providers/account-provider";
import { LoginPage } from '../../pages/login/login';
import { Account, CustomerAccessToken } from "../../models/account";

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'change-password.html'
})
export class ChangePassPage {
  changePasswordForm: FormGroup;

  type: any;
  text: any;
  alert: any;
  animateClass = { 'zoom-in': true };

  constructor(private platform: Platform, 
    private builder: FormBuilder, 
    private nav: NavController,
    private accountProvider : AccountProvider,
    public alertCtrl: AlertController,
    public loading: LoadingController) {

    this.nav = nav;
    this.platform = platform;
    this.type = "User";

    this.changePasswordForm = builder.group({
        newPassword: ['', Validators.required],
        newPasswordConfirm: ['', Validators.required]
    });  
  }

  createAlertSuccess(message){
    this.alert = this.alertCtrl.create({
      title: 'Password Change Success',
      subTitle: message,
      buttons: [{
        text: 'Okay',
        handler: data => {
          this.accountProvider.logOut();
          this.nav.setRoot(LoginPage);
        }
      }]
    });
  }

  createAlertFail(message){
    this.alert = this.alertCtrl.create({
      title: 'Password Change Failed',
      subTitle: message,
      buttons: [{
        text: 'Okay',
        handler: data => {
        }
      }]
    });
  }

  submit(){
    // Before we submit, confirm the passwords
    if((this.changePasswordForm.value.newPassword === this.changePasswordForm.value.newPasswordConfirm) &&
    this.changePasswordForm.value.newPassword.length >5)
  {
    let loader = this.loading.create({
      content: 'Changing password...',
    });
    loader.present().then(() => {
      this.accountProvider.changePassword(this.changePasswordForm.value).then( data => {
        loader.dismiss();
        if((data as any).length == 0)
        {
          // inform user that request was successful
          this.createAlertSuccess("Password Changed!");
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
  else{
    this.createAlertFail("Unable to change password. The passwords may not match or may be too simple.");
    this.alert.present();
  }
  }

}
