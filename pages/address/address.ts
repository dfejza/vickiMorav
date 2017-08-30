import { Component } from '@angular/core';
import { NavController,LoadingController, Platform, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyAccountPage } from '../../pages/my-account/my-account';
import { AccountProvider } from "../../providers/account-provider";

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'address.html'
})
export class AddressPage {
  addressForm: FormGroup;

  type: any;
  text: any;
  alert: any;
  animateClass = { 'zoom-in': true };
  // Accounts do not have an address at first. Thus when updating the address, different mutations will be called
  noAddress : boolean;

  constructor(private platform: Platform, 
    private builder: FormBuilder, 
    private nav: NavController,
    private accountProvider : AccountProvider,
    public alertCtrl: AlertController,
    public loading: LoadingController) {

    this.nav = nav;
    this.platform = platform;
    this.type = "User";
    if(accountProvider.customer.defaultAddress!=null)
    {
      this.noAddress =false;
      this.addressForm = builder.group({
        firstName : [accountProvider.customer.defaultAddress.firstName, Validators.required],
        lastName : [accountProvider.customer.defaultAddress.lastName, Validators.required],
        address1 : [accountProvider.customer.defaultAddress.address1, Validators.required],
        address2 : [accountProvider.customer.defaultAddress.address2, Validators.required],
        company : [accountProvider.customer.defaultAddress.company, Validators.required],
        country : [accountProvider.customer.defaultAddress.country, Validators.required],
        province : [accountProvider.customer.defaultAddress.province, Validators.required],
        zip : [accountProvider.customer.defaultAddress.zip, Validators.required],
        city : [accountProvider.customer.defaultAddress.city, Validators.required]
      });  
    }
    else
    {
      this.noAddress = true;
      this.addressForm = builder.group({
        firstName : ["", Validators.required],
        lastName : ["", Validators.required],
        address1 : ["", Validators.required],
        address2 : ["", Validators.required],
        company : ["", Validators.required],
        country : ["", Validators.required],
        province : ["", Validators.required],
        zip : ["", Validators.required],
        city : ["", Validators.required]
      });  
    }
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
      if(this.noAddress)
      {
        this.accountProvider.createAddress(this.addressForm.value).then( data => {
          loader.dismiss();
          if((data as any).length == 0)
          {
            // inform user that request was successful
            this.createAlertSuccess("Address Changed!");
            this.alert.present();
          }
          else
          {
            this.createAlertFail(data[0].message);
            this.alert.present();
          }
        });
      }
    else
      {
        this.accountProvider.updateAddress(this.addressForm.value).then( data => {
          loader.dismiss();
          if((data as any).length == 0)
          {
            // inform user that request was successful
            this.createAlertSuccess("Address Changed!");
            this.alert.present();
          }
          else
          {
            this.createAlertFail(data[0].message);
            this.alert.present();
          }
        });
      }
    });
  }

}
