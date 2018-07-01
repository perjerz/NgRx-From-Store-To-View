import { Cart } from './cart.interfaces';

export const initialState: Cart = {
  displayItems: {
    'a': {
      id: 'abcdef',
      name: 'abcdef',
      type: 'abcdef',
      price: 'abcdef',
      imgSrc: 'abcdef',
      description: 'abcdef',
    },
    'b': {
      id: 'abcdef',
      name: 'abcdef',
      type: 'abcdef',
      price: 'abcdef',
      imgSrc: 'abcdef',
      description: 'abcdef',
    }
  },
  selectedItems: {}
};
