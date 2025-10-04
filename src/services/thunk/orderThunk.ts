import { createAsyncThunk } from '@reduxjs/toolkit';
import { ORDER_SLICE_NAME } from '@constants';
import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { ordersActions } from '../slices/orders';

export const placeNewOrder = createAsyncThunk(
  `${ORDER_SLICE_NAME}/placeNewOrder`,
  async (ingredientsId: string[], { dispatch }) => {
    try {
      const data = await orderBurgerApi(ingredientsId).then((res) => {
        dispatch(ordersActions.addOrder(res.order));
      });
    } catch (error) {
      console.warn('NEWORDER ERROR', error);
    }
  }
);

export const getOrderByNumber = createAsyncThunk(
  `${ORDER_SLICE_NAME}/getOrderByNumber`,
  async (number: number) => {
    try {
      return await getOrderByNumberApi(number);
    } catch (error) {
      console.warn('GETORDER ERROR', error);
    }
  }
);
