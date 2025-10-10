import { createSlice } from '@reduxjs/toolkit';
import { ORDERS_SLICE_NAME, RequestStatus } from '@constants';
import { TOrder } from '@utils-types';
import { placeNewOrder } from '../thunk/orderThunk';
import { getOrders } from '../thunk/ordersThunk';

interface OrdersState {
  orders: TOrder[];
  ordersStatus: RequestStatus;
}

const initialState: OrdersState = {
  orders: [],
  ordersStatus: RequestStatus.IDLE
};

const OrdersSlice = createSlice({
  name: ORDERS_SLICE_NAME,
  initialState,
  reducers: {
    addOrder: (state, action: { payload: TOrder }) => {
      state.orders.push(action.payload);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getOrders.fulfilled, (state, action) => {
        if (action.payload) {
          state.orders = action.payload;
          state.ordersStatus = RequestStatus.SUCCESS;
        }
      })
      .addCase(getOrders.pending, (state) => {
        state.ordersStatus = RequestStatus.LOADING;
      })
      .addCase(getOrders.rejected, (state) => {
        state.ordersStatus = RequestStatus.FAILED;
      });
  },
  selectors: {
    selectOrders: (state) => state.orders,
    selectOrdersStatus: (state) => state.ordersStatus
  }
});

export const ordersActions = {
  ...OrdersSlice.actions,
  placeNewOrder,
  getOrders
};
export const ordersSelectors = OrdersSlice.selectors;
export default OrdersSlice;
