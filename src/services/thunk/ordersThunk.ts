import { getOrdersApi } from '@api';
import { ORDERS_SLICE_NAME } from '@constants';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrders = createAsyncThunk(
  `${ORDERS_SLICE_NAME}/getOrders`,
  async () => {
    try {
      const res = await getOrdersApi();
      return res;
    } catch (error) {
      console.warn('ORDERS-HISTORY ERROR', error);
      throw error;
    }
  }
);
