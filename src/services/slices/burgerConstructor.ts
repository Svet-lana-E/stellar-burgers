import { createSlice } from '@reduxjs/toolkit';
import { BURGER_CONSTRUCTOR_SLICE_NAME } from '@constants';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

interface BurgerConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: []
};

const BurgerConstructorSlice = createSlice({
  name: BURGER_CONSTRUCTOR_SLICE_NAME,
  initialState,
  reducers: {
    addToNewBurger: (
      state,
      action: { payload: { ingredient: TIngredient; id: string } }
    ) => {
      const { ingredient, id } = action.payload;
      const newIngredient: TConstructorIngredient = {
        ...ingredient,
        id: id
      };
      if (ingredient.type === 'bun') {
        return { ...state, bun: newIngredient };
      } else {
        return { ...state, ingredients: [...state.ingredients, newIngredient] };
      }
    },
    removeFromNewBurger: (
      state,
      action: { payload: TConstructorIngredient }
    ) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    deleteBurger: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    handleMoveUp: (state, action: { payload: TConstructorIngredient }) => {
      const ingredients = state.ingredients;
      const i = state.ingredients.findIndex(
        (item) => item.id === action.payload.id
      );
      if (i >= 0 && i <= ingredients.length - 1) {
        const temp = ingredients[i];
        ingredients[i] = ingredients[i - 1];
        ingredients[i - 1] = temp;
      }
    },
    handleMoveDown: (state, action: { payload: TConstructorIngredient }) => {
      const ingredients = state.ingredients;
      const i = state.ingredients.findIndex(
        (item) => item.id === action.payload.id
      );
      if (i >= 0 && i < ingredients.length - 1) {
        const temp = ingredients[i];
        ingredients[i] = ingredients[i + 1];
        ingredients[i + 1] = temp;
      }
    }
  },
  selectors: {
    selectBurgerBun: (state) => state.bun,
    selectBurgerIngredients: (state) => state.ingredients
  }
});

export const burgerConstructorActions = BurgerConstructorSlice.actions;
export const burgerConstructorSelectors = BurgerConstructorSlice.selectors;

export default BurgerConstructorSlice;
