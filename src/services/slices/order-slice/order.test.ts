import { expect, describe } from '@jest/globals';
import OrderSlice, {
  orderActions,
  initialState,
  OrderState,
  orderReducer,
  orderSelectors
} from './order';
import { RequestStatus } from '../../constants';
import { mockNewOrder } from '../../../../mocks/order';
import { configureStore } from '@reduxjs/toolkit';

const { selectNewOrder, selectNewOrderRequest } = orderSelectors;

const { placeNewOrder, deleteOrderInfo, setNewOrderRequest } = orderActions;

const mockOrderState: OrderState = {
  info: mockNewOrder,
  orderStatus: RequestStatus.SUCCESS,
  newOrderRequestStatus: true
};

describe('order reducer', () => {
  it('корректная инициализация', () => {
    const state = OrderSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });
});

describe('тесты синхронных экшенов', () => {
  it('удаление информации о новом заказе', () => {
    const newState = orderReducer(mockOrderState, deleteOrderInfo());
    expect(newState.info).toEqual(initialState.info);
  });

  it('изменение статуса запроса нового заказа', () => {
    const newState = orderReducer(
      initialState,
      setNewOrderRequest(!initialState.newOrderRequestStatus)
    );
    expect(newState.newOrderRequestStatus).toEqual(
      mockOrderState.newOrderRequestStatus
    );
  });
});

describe('тесты асинхронных экшенов', () => {
  it('placeNewOrder pending', () => {
    const action = placeNewOrder.pending('', mockNewOrder.ingredients);
    const newState = orderReducer(initialState, action);
    expect(newState.orderStatus).toBe(RequestStatus.LOADING);
    expect(newState.info).toEqual(initialState.info);
    expect(newState.newOrderRequestStatus).toEqual(
      mockOrderState.newOrderRequestStatus
    );
  });

  it('placeNewOrder fulfilled', () => {
    const action = placeNewOrder.fulfilled(
      mockNewOrder,
      '',
      mockNewOrder.ingredients
    );
    const newState = orderReducer(initialState, action);
    expect(newState.orderStatus).toBe(RequestStatus.SUCCESS);
    expect(newState.info).toEqual(mockNewOrder);
  });

  it('placeNewOrder rejected', () => {
    const error = new Error('Error');
    const action = placeNewOrder.rejected(error, '', mockNewOrder.ingredients);
    const newState = orderReducer(initialState, action);
    expect(newState.orderStatus).toBe(RequestStatus.FAILED);
    expect(newState.info).toEqual(initialState.info);
    expect(newState.newOrderRequestStatus).toEqual(
      initialState.newOrderRequestStatus
    );
  });
});

describe('тесты селекторов orderSlice', () => {
  const store = configureStore({
    reducer: {
      order: orderReducer
    },
    preloadedState: {
      order: mockOrderState
    }
  });

  it('получение нового заказа', () => {
    const newOrder = selectNewOrder(store.getState());
    expect(newOrder).toEqual(mockOrderState.info);
  });

  it('получение статуса отправки нового заказа', () => {
    const newRequestStatus = selectNewOrderRequest(store.getState());
    expect(newRequestStatus).toEqual(mockOrderState.newOrderRequestStatus);
  });
});
