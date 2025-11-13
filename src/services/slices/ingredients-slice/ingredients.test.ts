import { expect, describe } from '@jest/globals';
import IngredientsSlice, {
  ingredientsActions,
  IngredientsState,
  initialState,
  ingredientsReducer,
  ingredientsSelectors
} from './ingredients';
import { RequestStatus } from '../../constants';
import {
  mockBun,
  mockIngredient,
  mockIngredient2,
  mockSauce
} from '../../../../mocks/ingredients';
import { configureStore } from '@reduxjs/toolkit';

const { fetchIngredients } = ingredientsActions;

const { selectIngredients, selectIngredientsStatus } = ingredientsSelectors;

const mockIngredientsState: IngredientsState = {
  ingredients: [mockIngredient, mockIngredient2, mockBun, mockSauce],
  requestStatus: RequestStatus.SUCCESS
};

describe('ingredients reducer', () => {
  it('корректная инициализация', () => {
    const state = IngredientsSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });
});

describe('тесты асинхронных экшенов', () => {
  it('fetchIngredients pending', () => {
    const action = fetchIngredients.pending('', undefined);
    const newState = ingredientsReducer(initialState, action);
    expect(newState.requestStatus).toBe(RequestStatus.LOADING);
    expect(newState.ingredients).toEqual([]);
  });

  it('fetchIngredients fulfilled', () => {
    const action = fetchIngredients.fulfilled(
      mockIngredientsState.ingredients,
      '',
      undefined
    );
    const newState = ingredientsReducer(initialState, action);
    expect(newState.requestStatus).toBe(RequestStatus.SUCCESS);
    expect(newState.ingredients).toEqual(mockIngredientsState.ingredients);
  });
});

describe('тесты селекторов ingredientsSlice', () => {
  const store = configureStore({
    reducer: {
      ingredientList: ingredientsReducer
    },
    preloadedState: {
      ingredientList: mockIngredientsState
    }
  });

  it('получение списка ингредиентов', () => {
    const ingredients = selectIngredients(store.getState());
    expect(ingredients).toEqual(mockIngredientsState.ingredients);
  });

  it('получение статуса загрузки списка ингредиентов', () => {
    const status = selectIngredientsStatus(store.getState());
    expect(status).toEqual(mockIngredientsState.requestStatus);
  });
});
