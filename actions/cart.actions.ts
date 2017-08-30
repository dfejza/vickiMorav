import {Action} from '@ngrx/store';
import {Product} from "../models/product";
import { CartItem } from "../models/cartItem";
//import {ADD_TO_CART, REQUEST_PRODUCTS, IProduct} from '../app/counter';

export const ActionTypes = {
  ADD_TO_CART:           '[Product] Add To Cart',
  REMOVE_FROM_CART:      '[Product] Remove From Cart'
};

export class AddToCart implements Action {
  readonly type = ActionTypes.ADD_TO_CART;
  constructor(public payload: CartItem) { 
    //console.log('add CONSTRUCTOR ,', payload)
  }
}
export class RemoveFromCart implements Action {
  readonly type = ActionTypes.REMOVE_FROM_CART;
  constructor(public payload: CartItem) { }
}

export type Actions
  = AddToCart
  | RemoveFromCart;
