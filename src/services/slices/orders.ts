import { createSlice } from '@reduxjs/toolkit';
import { ORDERS_SLICE_NAME, RequestStatus } from '../constants';
import { TOrderResponse } from '@api';
import { TOrder } from '@utils-types';

interface OrdersStatus {
  orders: TOrder[];
  ordersStatus: RequestStatus;
}

const initialState: OrdersStatus = {
  orders: [],
  ordersStatus: RequestStatus.IDLE
};

const OrdersSlice = createSlice({
  name: ORDERS_SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {}
});

export const ordersSelectors = OrdersSlice.selectors;
export default OrdersSlice;
