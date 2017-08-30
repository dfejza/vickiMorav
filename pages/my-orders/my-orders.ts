import { Component , trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AccountProvider } from '../../providers/account-provider'
import { LoginPage } from '../login/login'
import { Order } from '../../models/account'
import { OrderInfoModalPage } from '../../modals/orderInfo/orderInfo';

/*
  Generated class for the YourOrders page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-orders',
  templateUrl: 'my-orders.html',

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
        ]),

        trigger('flyAlternameSlow', [
            state("1", style({
                transform: 'translate3d(0,0,0)'
            })),
            state("0", style({
                transform: 'translate3d(0,0,0)'
            })),
            transition('* => 1', [
                animate('1000ms ease-in', keyframes([
                    style({ transform: 'translate3d(500px,0,0', offset: 0 }),
                    style({ transform: 'translate3d(-10px,0,0)', offset: 0.5 }),
                    style({ transform: 'translate3d(0,0,0)', offset: 1 })
                ]))
            ]),
            transition('* => 0', [
                animate('1000ms ease-in', keyframes([
                    style({ transform: 'translate3d(-1000px,0,0', offset: 0 }),
                    style({ transform: 'translate3d(10px,0,0)', offset: 0.5 }),
                    style({ transform: 'translate3d(0,0,0)', offset: 1 })
                ]))
            ])
        ])

    ]
})
export class MyOrdersPage {
    orders : Order[];

  constructor(public navCtrl: NavController,
    public modalCtrl : ModalController,
    public accountProvider : AccountProvider) {
        this.orders = accountProvider.customer.orders;
  }

  orderSelected(order){
    let modal = this.modalCtrl.create(OrderInfoModalPage, order);
    modal.present();
  }

  openLoginPage(){
    this.navCtrl.setRoot(LoginPage);
  }
}