import { Component } from '@angular/core';
import { NavController,LoadingController, Platform, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountProvider } from "../../providers/account-provider";
import { Account, CustomerAccessToken } from "../../models/account";

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'personal-information.html'
})
export class PersonalInformationPage {
  personalInformationForm: FormGroup;

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

    this.personalInformationForm = builder.group({
        email: [accountProvider.customer.email, Validators.required],
        firstName: [accountProvider.customer.firstName, Validators.required],
        lastName: [accountProvider.customer.lastName, Validators.required],
        phone: [accountProvider.customer.phone, Validators.required]
    });  
  }

  createAlertSuccess(message){
    this.alert = this.alertCtrl.create({
      title: 'Success!',
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
      title: 'Something went wrong',
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
    let loader = this.loading.create({
      content: 'Sending request...',
    });
    loader.present().then(() => {
      this.accountProvider.changeInfo(this.personalInformationForm.value).then( data => {
        loader.dismiss();
        if((data as any).length == 0)
        {
          // inform user that request was successful
          this.createAlertSuccess("Information Changed!");
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
