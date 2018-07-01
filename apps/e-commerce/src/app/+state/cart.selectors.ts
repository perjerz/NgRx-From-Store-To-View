import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Cart } from './cart.interfaces';

export const cartSelector = createFeatureSelector<Cart>('cart');
export const displayItemsSelector = createSelector(
  cartSelector,
  (state: Cart) => state.displayItems
);

export const getDisplayItems = createSelector(displayItemsSelector, (item) => Object.keys(item).map(id => item[id]));

export const selectedItemsSelector = createSelector(
  cartSelector,
  (state: Cart) => state.selectedItems
);

export const selectedItemsEntities = createSelector(
  displayItemsSelector,
  selectedItemsSelector,
  (displayItems, selectedItems) =>
    Object.keys(selectedItems).map(id => ({
      id: { item: displayItems[id], amount: selectedItems[id] }
    }))
);
