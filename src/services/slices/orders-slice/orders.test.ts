import { expect, describe } from '@jest/globals';
import OrdersSlice, {
  ordersActions,
  initialState,
  OrdersState,
  ordersReducer,
  ordersSelectors
} from './orders';
import { mockNewOrder } from '../../../../mocks/order';
import { RequestStatus } from '../../constants';
import { configureStore } from '@reduxjs/toolkit';

const { addOrder, getOrders, placeNewOrder } = ordersActions;
const { selectOrders, selectOrdersStatus } = ordersSelectors;

const mockOrdersState: OrdersState = {
  orders: [mockNewOrder],
  ordersStatus: RequestStatus.SUCCESS
};

describe('orders reducer', () => {
  it('корректная инициализация', () => {
    const state = OrdersSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });
});

describe('тесты синхронных экшенов', () => {
  it('добавление нового заказа', () => {
    const newState = ordersReducer(initialState, addOrder(mockNewOrder));
    expect(newState.orders).toEqual(mockOrdersState.orders);
  });
});

describe('тесты асинхронных экшенов', () => {
  it('getOrders pending', () => {
    const action = getOrders.pending('', undefined);
    const newState = ordersReducer(initialState, action);
    expect(newState.ordersStatus).toBe(RequestStatus.LOADING);
    expect(newState.orders).toEqual(initialState.orders);
  });

  it('getOrders fulfilled', () => {
    const action = getOrders.fulfilled([mockNewOrder], '', undefined);
    const newState = ordersReducer(initialState, action);
    expect(newState.ordersStatus).toBe(RequestStatus.SUCCESS);
    expect(newState.orders).toEqual(mockOrdersState.orders);
  });

  it('getOrders rejected', () => {
    const error = new Error('Error');
    const action = getOrders.rejected(error, '', undefined);
    const newState = ordersReducer(initialState, action);
    expect(newState.ordersStatus).toBe(RequestStatus.FAILED);
    expect(newState.orders).toEqual(initialState.orders);
  });
});

describe('тесты селекторов ordersSlice', () => {
  const store = configureStore({
    reducer: {
      orders: ordersReducer
    },
    preloadedState: {
      orders: mockOrdersState
    }
  });

  it('получение списка заказов', () => {
    const orders = selectOrders(store.getState());
    expect(orders).toHaveLength(mockOrdersState.orders.length);
    expect(orders).toEqual(mockOrdersState.orders);
  });

  it('получение статуса запроса списка заказов', () => {
    const requestStatus = selectOrdersStatus(store.getState());
    expect(requestStatus).toEqual(mockOrdersState.ordersStatus);
  });
});
