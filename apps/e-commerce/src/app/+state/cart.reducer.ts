import { Cart } from './cart.interfaces';
import {
  CartAction,
  ITEM_TO_CART_ADDED,
  ITEMS_LISTED,
  ITEM_AMOUNT_UPDATED,
  ITEM_REMOVED
} from './cart.actions';
import { initialState } from './cart.init';

export function cartReducer(state = initialState, action: CartAction): Cart {
  switch (action.type) {
    case ITEM_TO_CART_ADDED: {
      const amount = state.selectedItems[action.id];
      if(amount) {
        return { ...state, selectedItems: { ...state.selectedItems, [action.id]: amount+action.amount } };
      }
      return { ...state, selectedItems: { ...state.selectedItems, [action.id]: action.amount } };
    }
    case ITEM_AMOUNT_UPDATED: {
      return { ...state, selectedItems: { ...state.selectedItems, [action.id]: action.amount } };
    }
    case ITEMS_LISTED: {
      return { ...state, displayItems: action.items };
    }
    case ITEM_REMOVED: {
      const { [action.id]: omitItem, ...otherItems } = state.selectedItems;
      return { ...state, selectedItems: otherItems };
    }
    default:
      return state;
  }
}
