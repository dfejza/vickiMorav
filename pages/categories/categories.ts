import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CategoryProvider } from '../../providers/category-provider';
import { ProductListPage } from '../../pages/product-list/product-list';

@Component({
  templateUrl: 'categories.html'
})
export class CategoriesPage {
  items : any;

  constructor(public navCtrl: NavController,
    private categoryProvider: CategoryProvider) {
        this.items = [];
        this.categoryProvider.load().then(data => {
            this.items = this.categoryProvider.data.shop.collections.edges;
         });
        
   }

  itemSelected(item) {
    this.navCtrl.push(ProductListPage, { category: item});
  }
}