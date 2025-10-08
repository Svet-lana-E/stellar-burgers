import { createSlice } from '@reduxjs/toolkit';
import { ORDER_SLICE_NAME, RequestStatus } from '@constants';
import { TNewOrderResponse } from '@api';
import { TOrder } from '@utils-types';
import { placeNewOrder } from '../thunk/orderThunk';

interface OrderState {
  info: TOrder | null;
  orderStatus: RequestStatus;
  newOrderRequestStatus: boolean;
}

const initialState: OrderState = {
  info: null,
  orderStatus: RequestStatus.IDLE,
  newOrderRequestStatus: false
};

const OrderSlice = createSlice({
  name: ORDER_SLICE_NAME,
  initialState,
  reducers: {
    deleteOrderInfo: (state) => {
      state.info = null;
    },
    setNewOrderRequest: (state, action: { payload: boolean }) => {
      state.newOrderRequestStatus = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(placeNewOrder.pending, (state) => {
        state.orderStatus = RequestStatus.LOADING;
        state.newOrderRequestStatus = true;
      })
      .addCase(placeNewOrder.fulfilled, (state, action) => {
        state.orderStatus = RequestStatus.SUCCESS;
        state.info = action.payload;
      })
      .addCase(placeNewOrder.rejected, (state) => {
        state.orderStatus = RequestStatus.FAILED;
      });
  },
  selectors: {
    selectNewOrderRequest: (state) => state.newOrderRequestStatus,
    selectNewOrder: (state) => state.info
  }
});

export const orderActions = { ...OrderSlice.actions, placeNewOrder };
export const orderSelectors = OrderSlice.selectors;

export default OrderSlice;
