import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { INGREDIENTS_SLICE_NAME, RequestStatus } from '../constants';
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

  reducers: {
    // setIngredients: (state, action: PayloadAction<TIngredient[] |>) =>
    //   (state.ingredients = action.payload)
  },

  extraReducers(builder) {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.requestStatus = RequestStatus.LOADING;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        console.dir(action.payload);
        state.ingredients = action.payload;
        state.requestStatus = RequestStatus.SUCCESS;
        console.dir(state.ingredients);
      });
  },

  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIngredientsStatus: (state) => state.requestStatus
  }
});

export const ingredientsSelectors = IngredientsSlice.selectors;

export default IngredientsSlice;
