import { createSlice } from '@reduxjs/toolkit';
import { ORDERS_SLICE_NAME, RequestStatus } from '@constants';
import { TOrder } from '@utils-types';
import { placeNewOrder } from '../thunk/orderThunk';

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
    // removeOrder: (state, action: { payload: TOrder }) => {
    //   state.orders.filter(order => order.status !== 'готов')}
  },
  selectors: {
    selectOrders: (state) => state.orders,
    selectOrdersStatus: (state) => state.ordersStatus
  }
});

export const ordersActions = { ...OrdersSlice.actions, placeNewOrder };
export const ordersSelectors = OrdersSlice.selectors;
export default OrdersSlice;
