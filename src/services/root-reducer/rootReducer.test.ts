import { configureStore } from '@reduxjs/toolkit';
import { expect, describe, it, beforeEach } from '@jest/globals';
import rootReducer from './root-reducer';
import { RootState } from '../store';
import {
  BURGER_CONSTRUCTOR_SLICE_NAME,
  FEED_SLICE_NAME,
  INGREDIENTS_SLICE_NAME,
  ORDER_SLICE_NAME,
  ORDERS_SLICE_NAME,
  USER_SLICE_NAME
} from '../constants';

import { ingredientsReducer } from '../slices/ingredients-slice/ingredients';
import { burgerConstructorReducer } from '../slices/burgerConstructor-slice/burgerConstructor';
import { feedReducer } from '../slices/feed-slice/feed';
import { orderReducer } from '../slices/order-slice/order';
import { ordersReducer } from '../slices/orders-slice/orders';
import { userReducer } from '../slices/user-slice/user';

describe('инициализация rootReducer', () => {
  let store: ReturnType<typeof configureStore<RootState>>;
  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer
    });
  });
  it('корректная инициализация', () => {
    const state = store.getState();
    expect(state[INGREDIENTS_SLICE_NAME]).toEqual(expect.any(Object));
    expect(state[BURGER_CONSTRUCTOR_SLICE_NAME]).toEqual(expect.any(Object));
    expect(state[FEED_SLICE_NAME]).toEqual(expect.any(Object));
    expect(state[ORDER_SLICE_NAME]).toEqual(expect.any(Object));
    expect(state[ORDERS_SLICE_NAME]).toEqual(expect.any(Object));
    expect(state[USER_SLICE_NAME]).toEqual(expect.any(Object));
  });

  it('проверка возврата корректного начального состояния стора', () => {
    const initAction = { type: '@@INIT' };
    const state = rootReducer(undefined, initAction);
    expect(state).toEqual({
      [BURGER_CONSTRUCTOR_SLICE_NAME]: burgerConstructorReducer(
        undefined,
        initAction
      ),
      [INGREDIENTS_SLICE_NAME]: ingredientsReducer(undefined, initAction),
      [FEED_SLICE_NAME]: feedReducer(undefined, initAction),
      [ORDER_SLICE_NAME]: orderReducer(undefined, initAction),
      [ORDERS_SLICE_NAME]: ordersReducer(undefined, initAction),
      [USER_SLICE_NAME]: userReducer(undefined, initAction)
    });
  });
});
