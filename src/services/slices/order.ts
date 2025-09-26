import { createSlice } from '@reduxjs/toolkit';
import { ORDER_SLICE_NAME, RequestStatus } from '../constants';
import { TNewOrderResponse } from '@api';
import { TOrder } from '@utils-types';

interface OrderStatus {
  info: TOrder | null;
  orderStatus: RequestStatus;
}

const initialState: OrderStatus = {
  info: null,
  orderStatus: RequestStatus.IDLE
};

const OrderSlice = createSlice({
  name: ORDER_SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {}
});

export const orderSelectors = OrderSlice.selectors;
export default OrderSlice;
