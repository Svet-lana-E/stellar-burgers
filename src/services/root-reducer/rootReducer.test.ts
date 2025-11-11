import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root-reducer';
import { RootState } from '@store';


describe('инициализация rootReducer', () => {
  let store: ReturnType<typeof configureStore<RootState>>;
  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer
    });
  });
  it('корректная инициализация', () => {
    const state = store.getState();
    expect(state.ingredientList).toEqual(expect.any(Object));
    expect(state.burgerConstructor).toEqual(expect.any(Object));
    expect(state.feed).toEqual(expect.any(Object));
    expect(state.order).toEqual(expect.any(Object));
    expect(state.orders).toEqual(expect.any(Object));
    expect(state.user).toEqual(expect.any(Object));
  });
});
