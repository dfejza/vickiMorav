import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyOrdersPage } from '../my-orders/my-orders';
import { ChangePassPage } from '../change-password/change-password';
import { AccountProvider } from "../../providers/account-provider";
import { HomePage } from '../../pages/home/home';
import { LoginPage } from '../../pages/login/login';
import { PersonalInformationPage } from '../../pages/personal-information/personal-information'
import { AddressPage } from '../../pages/address/address'

/*
Generated class for the YourAccount page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
   animations: [
        trigger('flyInTopSlow', [
            state("0", style({
                transform: 'translate3d(0,0,0)'
            })),
            transition('* => 0', [
                animate('500ms ease-in', keyframes([
                    style({ transform: 'translate3d(0,-500px,0)', offset: 0 }),
                    style({ transform: 'translate3d(0,0,0)', offset: 1 })
                ]))
            ])
        ])
    ]
})
export class MyAccountPage {
  loginForm: FormGroup;
  password: any;
  type: any;
  text: any;
  user: any = { email: '', password: '' };
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;

  constructor(private platform: Platform, 
    private builder: FormBuilder, 
    private nav: NavController, 
    private accountProvider : AccountProvider) {

      if(accountProvider.loggedIn == false) {
        nav.setRoot(LoginPage);
      }

      this.nav = nav;
      this.platform = platform;
      this.type = "User";

      this.loginForm = builder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
  }

  openMyOrders(){
    this.nav.push(MyOrdersPage);
  }
  openChangePass(){
    this.nav.push(ChangePassPage);
  }
  openAddressBook(){
    this.nav.push(AddressPage);
  }

  openPersonalInfo(){
    this.nav.push(PersonalInformationPage);
  }
  openLogOut(){
    this.accountProvider.logOut();
    this.nav.setRoot(HomePage);
  }

}
