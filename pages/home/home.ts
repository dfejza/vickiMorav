import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { ProductsProvider } from '../../providers/products-provider';
import { ProductListPage } from '../../pages/product-list/product-list';
import { CartPage } from '../cart/cart';
import { OneProduct } from '../one-product/one-product';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ProductsProvider]

})
export class HomePage {
	testRadioOpen: boolean;
	testRadioResult;
  catagory: Array<{title: string}>;
  searchResults: any[];

	myInput: any = '';
  constructor(public navCtrl: NavController,
     public productProvider : ProductsProvider) {
	  this.searchResults = [];
	}
	ngAfterViewInit() {
    this.productProvider.loadDb();
	}

	openCategory(category) {
	   this.navCtrl.push(ProductListPage, { category: category});
	}

  transform(value: string): string {
  	//First replace dashes
    let newValue = value.replace(/-/g, ' ');
    // Capitalize each word
    newValue = newValue.replace(/\b\w/g, l => l.toUpperCase())
    return `${newValue}`;
  }

  openCart(){
    this.navCtrl.push(CartPage);
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.searchResults = []
  
    // set val to the value of the searchbar
    let val = ev.target.value;
    
    // if the value is an empty string don't filter the items
    // Dont filter if the local db has yet to be initialized
    if (this.productProvider.dbInit && val && val.trim() != '') {
      val = val.toLowerCase();
      this.searchResults = this.productProvider.searchDb.filter(function ( obj ) {
            return (obj.name.toLowerCase().indexOf(val) > -1);
        });
      // this.items = this.items.filter((item) => {
      //   return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      // })
    }
  }
  openProduct(item) {
    this.navCtrl.push(OneProduct, { item: item});
  }

}
