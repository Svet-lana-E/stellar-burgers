import { createAsyncThunk } from '@reduxjs/toolkit';
import { ORDER_SLICE_NAME } from '../constants';
import { getOrderByNumberApi, orderBurgerApi } from '../../utils/burger-api';
import { ordersActions } from '../slices/orders-slice/orders';
import { TOrder } from '@utils-types';
import { orderActions } from '../slices/order-slice/order';

export const placeNewOrder = createAsyncThunk(
  `${ORDER_SLICE_NAME}/placeNewOrder`,
  async (ingredientsId: string[], { dispatch }): Promise<TOrder> => {
    try {
      const res: TOrder = (await orderBurgerApi(ingredientsId)).order;
      return res;
    } catch (error) {
      console.warn('NEWORDER ERROR', error);
      throw error;
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
