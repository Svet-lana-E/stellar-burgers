import { createSlice } from '@reduxjs/toolkit';
import { ORDER_SLICE_NAME, RequestStatus } from '@constants';
import { TNewOrderResponse } from '@api';
import { TOrder } from '@utils-types';
import { placeNewOrder } from '../thunk/orderThunk';

interface OrderState {
  info: TOrder | null;
  orderStatus: RequestStatus;
  newOrderStatusRequest: boolean;
}

const initialState: OrderState = {
  info: null,
  orderStatus: RequestStatus.IDLE,
  newOrderStatusRequest: false
};

const OrderSlice = createSlice({
  name: ORDER_SLICE_NAME,
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      state.info?.ingredients.push(action.payload);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(placeNewOrder.pending, (state) => {
        state.orderStatus = RequestStatus.LOADING;
      })
      .addCase(placeNewOrder.fulfilled, (state) => {
        state.orderStatus = RequestStatus.SUCCESS;
      })
      .addCase(placeNewOrder.rejected, (state) => {
        state.orderStatus = RequestStatus.FAILED;
      });
  },
  selectors: {}
});

export const { addIngredient } = OrderSlice.actions;
export const orderSelectors = OrderSlice.selectors;
export default OrderSlice;
