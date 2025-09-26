import { createSlice } from '@reduxjs/toolkit';
import { BURGER_CONSTRUCTOR_SLICE_NAME } from '../constants';
import { TIngredient } from '@utils-types';

interface BurgerConstructorState {
  bun: TIngredient | null;
  ingredients: TIngredient[];
}

const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: []
};

const BurgerConstructorSlice = createSlice({
  name: BURGER_CONSTRUCTOR_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers(builder) {},
  selectors: {
    selectBurgerBun: (state) => state.bun,
    selectBurgerIngredients: (state) => state.ingredients
  }
});

export const burgerConstructorSelectors = BurgerConstructorSlice.selectors;

export default BurgerConstructorSlice;
