import { orderBurgerThunk, initialState, orderSlice } from './orderSlice';

describe('Тesting orderSlice', () => {
  const actions = {
    postOrder: {
      pending: {
        type: orderBurgerThunk.pending.type,
        payload: null
      },
      rejected: {
        type: orderBurgerThunk.rejected.type,
        error: { message: 'test error - orderBurgerThunk' }
      },
      fulfilled: {
        type: orderBurgerThunk.fulfilled.type,
        payload: { order: { number: '45555' } }
      }
    }
  };

  describe('test order sending', () => {
    it('testing the pending status', () => {
      const newState = orderSlice.reducer(
        { ...initialState },
        actions.postOrder.pending
      );
      expect(newState.orderRequest).toBe(true);
      expect(newState.error).toBe(undefined);
    });
    it('testing the rejected state', () => {
      const newState = orderSlice.reducer(
        { ...initialState },
        actions.postOrder.rejected
      );
      expect(newState.orderRequest).toBe(false);
      expect(newState.error).toBe(actions.postOrder.rejected.error.message);
    });
    it('testing the fulfilled state', () => {
      const newState = orderSlice.reducer(
        { ...initialState },
        actions.postOrder.fulfilled
      );
      expect(newState.orderRequest).toBe(false);
      expect(newState.order?.number).toBe(
        actions.postOrder.fulfilled.payload.order.number
      );
    });
  });
});
