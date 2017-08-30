import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { MyAccountPage } from '../my-account/my-account';
import { RefundModalPage } from '../../modals/faq/refund';
/*
  Generated class for the CustomerService page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-customer-service',
  templateUrl: 'customer-service.html'
})
export class CustomerServicePage {
    alert: any;

    constructor(public navCtrl: NavController,
        public alertCtrl: AlertController,
        public modalCtrl: ModalController) {
    }

    openContactUs(){
        this.alert = this.alertCtrl.create({
            title: 'Contact Us',
            subTitle: "Vicki Morav <br\><br\>762 Madison Ave, 4th Floor <br\><br\>New York, NY 10065<br\><br\> (between 65th and 66th Street) <br\><br\>Phone: (212) 744-4753 <br\><br\>Email: gallerieaesthetique@gmail.com",
            buttons: [{
              text: 'Okay',
              handler: data => {
              }
            }]
        });
        this.alert.present();
    }
    openReturnAndRefunds(){
        let modal = this.modalCtrl.create(RefundModalPage);
        modal.present();
    }
    openManageAddresses(){
        this.navCtrl.push(MyAccountPage);
    }
    openAccountSettings(){
        this.navCtrl.push(MyAccountPage);
    }
}
