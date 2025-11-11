import { combineSlices } from '@reduxjs/toolkit';
import IngredientsSlice from '../slices/ingredients-slice/ingredients';
import BurgerConstructorSlice from '../slices/burgerConstructor-slice/burgerConstructor';
import FeedSlice from '../slices/feed-slice/feed';
import OrderSlice from '../slices/order-slice/order';
import OrdersSlice from '../slices/orders-slice/orders';
import UserSlice from '../slices/user-slice/user';

const rootReducer = combineSlices(
  IngredientsSlice,
  BurgerConstructorSlice,
  FeedSlice,
  OrderSlice,
  OrdersSlice,
  UserSlice
);

export default rootReducer;
