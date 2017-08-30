 // Generated class for the ProductListPage component.

 //  See http://ionicframework.com/docs/v2/components/#navigation for more info on
 //  Ionic pages and navigation.

import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { Slides } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { CartProvider } from '../../providers/cart-provider';
import { ToastController } from 'ionic-angular';
import { CartPage } from '../cart/cart';

@Component({
    selector: 'page-one-product',
    templateUrl: 'one-product.html',
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
export class OneProduct {
    segment: any = 'color';
    image: any;
    pricelist: any;
    item: any;
    price: any;
    productws: any;
    qty: any = 1;
    max: any;
       selectedIdx = 0;

    constructor(
        private cart: CartProvider,
        public nav: NavController, 
        navParams: NavParams,
        private toastCtrl: ToastController){

        this.item = navParams.get('item');

        //to show bydefault image while opening single product
        this.image = this.item.img;
    }

    getWidth(rating) {
       
        return Math.floor((rating * 100) / this.max);
    }
 //change the image for particular product
    changeImage(image) {
        this.image = 'assets/img/Products/'+ this.item.id + '/' + image;
    }

    showPicture() {
       // PhotoViewer.show(this.image, '', { share: false });
    }     

    addToCart(item){
        for (let i = 1; i <= this.qty; i++)
        {
            this.cart.addToCart(item, this.selectedIdx, 1);
        }
        this.presentToast();
        this.qty = 1;
    }

    decreaseQuanity(){
        if(this.qty>1)
            this.qty--;
    }

    increaseQuanity(){
        this.qty++;
    }

    selectSize(i){
        this.selectedIdx = i;
    }

      openCart(){
        this.nav.push(CartPage);
      }

    presentToast() {
      let toast = this.toastCtrl.create({
        message: 'Added to cart',
        duration: 2000,
        position: 'bottom',
        showCloseButton: true,
        closeButtonText: "View Cart"
      });

      toast.onDidDismiss((data, role) => {
        if (role == "close") {
            this.openCart();
        }
      });

      toast.present();
    }
}
