import { Component } from '@angular/core';
import { NavController,LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterPage } from '../../pages/register/register';
import { ForgotPassPage } from '../../pages/forgot-pass/forgot-pass';
import { MyAccountPage } from '../../pages/my-account/my-account';
import { AccountProvider } from "../../providers/account-provider"
import { Account } from "../../models/account";

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loginForm: FormGroup;
  password: any;

  type: any;
  text: any;
  facebook: any;
  user: Account = { email: '', password: '' };
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  animateClass = { 'zoom-in': true };

  constructor(private builder: FormBuilder, 
    private nav: NavController, 
    private accountProvider : AccountProvider,
    public alertCtrl: AlertController,
    public loading: LoadingController) {

    //Check if the user is already logged in before initializing
    if(accountProvider.customerAccessToken != null)
    {
      this.nav.setRoot(MyAccountPage);
    }
      this.nav = nav;
      this.type = "User";

      this.loginForm = builder.group({
          email: ['', Validators.required],
          password: ['', Validators.required]
      });  
  }

  register(){
    this.nav.push(RegisterPage) //navigate to RegisterPage
  }

  forgotpass(){
    this.nav.push(ForgotPassPage) //navigate to ForgetPassPage
  }

  login(){
    let loader = this.loading.create({
      content: 'Loading account...',
    });
    loader.present().then(() => {
      this.accountProvider.loadUser(this.loginForm.value).then(data => {
        loader.dismiss();
        // We attempted to login. Check if credentials were successful or failed
        if(this.accountProvider.customerAccessToken === null)
        {
          this.showAlert();
          this.loginForm.reset();
          //Invalid credentials
        }
        else
        {
          this.nav.setRoot(MyAccountPage);
        }
      }, err => console.log(err)); 
    });
    // this.nav.setRoot(HomePage) //navigate to HomePage
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Login Failed',
      subTitle: 'Invalid email and or password.',
      buttons: ['OK']
    });
    alert.present();
  }

}
