import { createAsyncThunk } from '@reduxjs/toolkit';
import { INGREDIENTS_SLICE_NAME } from '../constants';
import { getIngredientsApi } from '../../../src/utils/burger-api';


export const fetchIngredients = createAsyncThunk(
  `${INGREDIENTS_SLICE_NAME}/fetchIngredients`,
  async () => {
    const data = await getIngredientsApi();
    return data;
  }
);
