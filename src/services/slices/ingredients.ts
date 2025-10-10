import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { INGREDIENTS_SLICE_NAME, RequestStatus } from '@constants';
import { fetchIngredients } from '../thunk/ingredientsThunk';

interface IngredientsState {
  ingredients: TIngredient[];
  requestStatus: RequestStatus;
}

const initialState: IngredientsState = {
  ingredients: [],
  requestStatus: RequestStatus.IDLE
};

const IngredientsSlice = createSlice({
  name: INGREDIENTS_SLICE_NAME,
  initialState,

  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.requestStatus = RequestStatus.LOADING;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.requestStatus = RequestStatus.SUCCESS;
      });
  },

  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIngredientsStatus: (state) => state.requestStatus
  }
});

export const ingredientsActions = {
  ...IngredientsSlice.actions,
  fetchIngredients
};
export const ingredientsSelectors = IngredientsSlice.selectors;

export default IngredientsSlice;
