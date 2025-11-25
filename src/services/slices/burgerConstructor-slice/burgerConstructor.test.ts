import { expect, describe } from '@jest/globals';
import BurgerConstructorSlice, {
  burgerConstructorActions,
  burgerConstructorReducer,
  burgerConstructorSelectors,
  BurgerConstructorState,
  initialState
} from './burgerConstructor';
import { configureStore } from '@reduxjs/toolkit';
import {
  mockIngredient,
  mockBun,
  mockIngredient2,
  mockSauce,
  mockIngredientId,
  mockBunId,
  mockIngredientId2,
  mockSauceId
} from '../../../../mocks/ingredients';

const {
  addToNewBurger,
  removeFromNewBurger,
  deleteBurger,
  handleMoveDown,
  handleMoveUp
} = burgerConstructorActions;

const { selectBurgerBun, selectBurgerIngredients } = burgerConstructorSelectors;

const mockConstructorState: BurgerConstructorState = {
  bun: { ...mockBun, id: mockBunId },
  ingredients: [
    { ...mockIngredient, id: mockIngredientId },
    { ...mockIngredient2, id: mockIngredientId2 },
    { ...mockSauce, id: mockSauceId }
  ]
};

describe('burgerConstructor reducer', () => {
  it('корректная инициализация', () => {
    const state = BurgerConstructorSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });
});

describe('тесты синхронных экшенов', () => {
  it('добавить булку в бургер', () => {
    const newState = burgerConstructorReducer(
      initialState,
      addToNewBurger({
        ingredient: mockBun,
        id: mockBunId
      })
    );

    expect(newState.bun).toEqual({ ...mockBun, id: mockBunId });
    expect(newState.bun.id).toBe(mockBunId);
    expect(newState.bun.name).toBe(mockBun.name);
    expect(newState.bun!.type).toBe(mockBun.type);
    expect(newState.ingredients).toHaveLength(0);
  });

  it('добавить ингредиент в бургер', () => {
    const newState = burgerConstructorReducer(
      initialState,
      addToNewBurger({
        ingredient: mockIngredient,
        id: mockIngredientId
      })
    );

    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toEqual({
      ...mockIngredient,
      id: mockIngredientId
    });
    expect(newState.ingredients[0].id).toBe(mockIngredientId);
    expect(newState.ingredients[0].name).toBe(mockIngredient.name);
    expect(newState.ingredients[0].type).toBe(mockIngredient.type);
    expect(newState.bun).toBe(null);
  });

  it('удалить ингредиент из бургера', () => {
    const newState = burgerConstructorReducer(
      mockConstructorState,
      removeFromNewBurger(mockConstructorState.ingredients[0])
    );

    expect(newState.ingredients).toHaveLength(2);
    expect(newState.ingredients).toEqual([
      { ...mockIngredient2, id: mockIngredientId2 },
      { ...mockSauce, id: mockSauceId }
    ]);
    expect(newState.bun).toEqual({ ...mockBun, id: mockBunId });
  });

  it('удалить бургер', () => {
    const newState = burgerConstructorReducer(
      mockConstructorState,
      deleteBurger()
    );
    expect(newState.bun).toBe(null);
    expect(newState.ingredients).toHaveLength(0);
  });

  it('подвинуть ингредиент вниз (поменять ингредиент местами с нижним ингредиентом)', () => {
    const newState = burgerConstructorReducer(
      mockConstructorState,
      handleMoveDown(mockConstructorState.ingredients[0])
    );
    expect(newState.ingredients[0]).toEqual(
      mockConstructorState.ingredients[1]
    );
    expect(newState.ingredients[1]).toEqual(
      mockConstructorState.ingredients[0]
    );
  });

  it('подвинуть ингредиент вверх (поменять ингредиент местами с верхним ингредиентом)', () => {
    const newState = burgerConstructorReducer(
      mockConstructorState,
      handleMoveUp(mockConstructorState.ingredients[2])
    );
    expect(newState.ingredients[1]).toEqual(
      mockConstructorState.ingredients[2]
    );
    expect(newState.ingredients[2]).toEqual(
      mockConstructorState.ingredients[1]
    );
  });
});

describe('тесты селекторов burgerConstructor', () => {
  const store = configureStore({
    reducer: {
      burgerConstructor: burgerConstructorReducer
    },
    preloadedState: {
      burgerConstructor: mockConstructorState
    }
  });

  it('получение булки бургера', () => {
    const bun = selectBurgerBun(store.getState());
    expect(bun).toEqual(mockConstructorState.bun);
  });

  it('получение ингредиентов бургера', () => {
    const ingredients = selectBurgerIngredients(store.getState());
    expect(ingredients).toEqual(mockConstructorState.ingredients);
    expect(ingredients).toHaveLength(mockConstructorState.ingredients.length);
  });
});
