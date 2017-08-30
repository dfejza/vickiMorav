import { Component} from '@angular/core';
import { NavController, Platform, AlertController, LoadingController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountProvider } from "../../providers/account-provider"

/*
  Generated class for the ForgotPass page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-forgot-pass',
  templateUrl: 'forgot-pass.html'
})
export class ForgotPassPage {
  loginForm: FormGroup;
  type: any;
  text: any;
  alert: any;

  constructor(private platform: Platform,
   private builder: FormBuilder,
   private nav: NavController,
   private accountProvider: AccountProvider,
   public alertCtrl: AlertController,
   public loading: LoadingController) {
      this.nav = nav;
      this.platform = platform;
      this.type = "User";
      this.loginForm = builder.group({
          email: ['', Validators.required]
      });  
  }

  createAlertSuccess(message){
    this.alert = this.alertCtrl.create({
      title: 'Password Reset Success',
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
      title: 'Password Reset Failed',
      subTitle: message,
      buttons: [{
        text: 'Okay',
        handler: data => {
          this.loginForm.reset();
        }
      }]
    });
  }

  submit(){
    let loader = this.loading.create({
      content: 'Looking up account...',
    });
    loader.present().then(() => {
      this.accountProvider.recoverUser(this.loginForm.value.email).then( data => {
        loader.dismiss();
        if((data as any).length == 0)
        {
          // inform user that request was successful
          this.createAlertSuccess("An email was sent with detailed instructions on resetting your password to the specified email.");
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
