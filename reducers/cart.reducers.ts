//import { Action} from '@ngrx/store';
import * as list from '../actions/cart.actions';
import { ActionTypes } from '../actions/cart.actions';
import { Product } from '../models/product'
import { CartItem } from "../models/cartItem"


export interface CartState {
    cartItems : CartItem[];
    totalPrice: number;
}

export interface State {
    cart: CartState;
}


const initialState: CartState = {
    cartItems: [], totalPrice: 0.00
}


export function cartReducer(state: CartState = initialState, action: list.Actions) : CartState
 {
    //console.log('price before action ' + state.totalPrice);
    switch (action.type) {
        case list.ActionTypes.ADD_TO_CART:{
            // Iterate through the state, comparing current item# with with other item numbers
            // If a match, update the quantity and discard the payload.
            // If no match, append the payload to the state
            const items = [...state.cartItems];
            let totalPrice =state.totalPrice + (action.payload.product.variants[action.payload.selectedVariant].price*1);
            //state.totalPrice+=(action.payload.product.variants[action.payload.selectedVariant].price*1); //*1 will convert the string to int
            //debugger;
            let result = currentItemExistsInCart(action.payload, state);
            if(result !=-1)
            {
                items[result].quantity+=action.payload.quantity;
                return { cartItems : items, totalPrice : totalPrice };
            }

            return { cartItems : [...state.cartItems, action.payload],
                totalPrice : totalPrice };
        }
        case list.ActionTypes.REMOVE_FROM_CART:{
            // Find the index
            // If quantity greater than 1, dec
            // if 1, remove
            const items = [...state.cartItems];
            let result = currentItemExistsInCart(action.payload, state);
            if (state.cartItems[result].quantity > 1)
                items[result].quantity--;   
            else
                items.splice(result, 1);

            let totalPrice = state.totalPrice- (action.payload.product.variants[action.payload.selectedVariant].price*1);

            return { cartItems : items, totalPrice : totalPrice };
        }

        default: return state;
    }

    //Iterate through the cart to see if the current item exists
    function currentItemExistsInCart(item : CartItem, state : CartState)
    {
        for(let i = 0; i < state.cartItems.length; i++)
        {
            if ((state.cartItems[i].product.id === item.product.id) &&
                (state.cartItems[i].selectedVariant === item.selectedVariant))
            {
                return i;
            }
        }
        return -1;
    }
};