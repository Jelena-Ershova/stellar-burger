import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TBurgerState = {
  burgerIngredients: TIngredient[];
  loading: boolean;
};

export const initialState: TBurgerState = {
  burgerIngredients: [],
  loading: false
};

export const getIngredients = createAsyncThunk<TIngredient[]>(
  'ingredients/getIngredients',
  getIngredientsApi
);

export const burgerIngredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    burgerIngredients: (state) => state.burgerIngredients,
    loading: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.burgerIngredients = action.payload;
        state.loading = false;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { burgerIngredients, loading } = burgerIngredientsSlice.selectors;
export const ingredientsReducer = burgerIngredientsSlice.reducer;
