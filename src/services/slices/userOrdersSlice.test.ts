import {
  userOrderThunk,
  userOrderSlice,
  initialState
} from './userOrdersSlice';

describe('testing userOrdersSlice', () => {
  const actions = {
    getUserOrders: {
      pending: {
        type: userOrderThunk.pending.type,
        payload: null
      },
      rejected: {
        type: userOrderThunk.rejected.type,
        error: { message: 'test error userOrderThunk' }
      },
      fulfilled: {
        type: userOrderThunk.fulfilled.type,
        payload: { orders: ['test 1', 'test 2'] }
      }
    }
  };
  describe('Testing the receipt of the list of orders', () => {
    it('testing the pending status', () => {
      const newState = userOrderSlice.reducer(
        { ...initialState },
        actions.getUserOrders.pending
      );
      expect(newState.orderRequest).toBe(true);
      expect(newState.error).toBe(undefined);
    });
    it('testing the rejected state', () => {
      const newState = userOrderSlice.reducer(
        { ...initialState },
        actions.getUserOrders.rejected
      );
      expect(newState.orderRequest).toBe(false);
      expect(newState.error).toBe(actions.getUserOrders.rejected.error.message);
    });
    it('testing the fulfilled state', () => {
      const newState = userOrderSlice.reducer(
        { ...initialState },
        actions.getUserOrders.fulfilled
      );
      expect(newState.orderRequest).toBe(false);
      expect(newState.orders).toEqual(actions.getUserOrders.fulfilled.payload);
    });
  });
});
