import { orderInfoThunk, orderInfoSlice, initialState } from './orderInfoSlice';

describe('testing orderInfoSlice', () => {
  const actions = {
    getOrderInfo: {
      pending: {
        type: orderInfoThunk.pending.type,
        payload: null
      },
      rejected: {
        type: orderInfoThunk.rejected.type,
        error: { message: 'test error - orderInfoThunk' }
      },
      fulfilled: {
        type: orderInfoThunk.fulfilled.type,
        payload: { orders: ['test', 'info', 'orders'] }
      }
    }
  };
  describe('testing the receipt of an order by number', () => {
    it('testing the pending status', () => {
      const newState = orderInfoSlice.reducer(
        { ...initialState },
        actions.getOrderInfo.pending
      );
      expect(newState.orderRequest).toBe(true);
      expect(newState.error).toBe(undefined);
    });
    it('testing the rejected state', () => {
      const newState = orderInfoSlice.reducer(
        { ...initialState },
        actions.getOrderInfo.rejected
      );
      expect(newState.orderRequest).toBe(false);
      expect(newState.error).toBe(actions.getOrderInfo.rejected.error.message);
    });
    it('testing the fulfilled state', () => {
      const newState = orderInfoSlice.reducer(
        { ...initialState },
        actions.getOrderInfo.fulfilled
      );
      expect(newState.orderRequest).toBe(false);
      expect(newState.orders).toEqual(
        actions.getOrderInfo.fulfilled.payload.orders
      );
    });
  });
});
