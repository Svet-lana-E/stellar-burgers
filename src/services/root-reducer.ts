import { combineSlices } from '@reduxjs/toolkit';
import IngredientsSlice from './slices/ingredients';
import BurgerConstructorSlice from './slices/burgerConstructor';
import FeedSlice from './slices/feed';
import OrderSlice from './slices/order';
import OrdersSlice from './slices/orders';

const rootReducer = combineSlices(
  IngredientsSlice,
  BurgerConstructorSlice,
  FeedSlice
  // OrderSlice,
  //OrdersSlice
);

export default rootReducer;
