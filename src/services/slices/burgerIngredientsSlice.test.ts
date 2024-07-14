import {
  burgerIngredientsSlice,
  getIngredients,
  initialState
} from './burgerIngredientsSlice';

describe('testing burgerIngredientsSlice', () => {
  const actions = {
    getIngredients: {
      pending: {
        type: getIngredients.pending.type,
        payload: null
      },
      rejected: {
        type: getIngredients.rejected.type,
        error: { message: 'test error getIngredients' }
      },
      fulfilled: {
        type: getIngredients.fulfilled.type,
        payload: ['ingredient1', 'ingredient2', 'ingredient3']
      }
    }
  };

  describe('testing the receipt of ingredients', () => {
    it('testing the pending status', () => {
      const newState = burgerIngredientsSlice.reducer(
        { ...initialState },
        actions.getIngredients.pending
      );
      expect(newState.loading).toBe(true);
    });
    it('testing the rejected state', () => {
      const newState = burgerIngredientsSlice.reducer(
        { ...initialState },
        actions.getIngredients.rejected
      );
      expect(newState.loading).toBe(false);
      expect(newState.error).toBe(
        actions.getIngredients.rejected.error.message
      );
    });
    it('testing the fulfilled state', () => {
      const newState = burgerIngredientsSlice.reducer(
        { ...initialState },
        actions.getIngredients.fulfilled
      );
      expect(newState.loading).toBe(false);
      expect(newState.error).toBe(null);
      expect(newState.burgerIngredients).toEqual(
        actions.getIngredients.fulfilled.payload
      );
    });
  });
});
