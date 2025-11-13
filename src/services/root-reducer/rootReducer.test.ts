import { configureStore } from '@reduxjs/toolkit';
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
});
