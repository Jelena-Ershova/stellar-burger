import { feedSlice, feedThunk, initialState } from './feedSlice';

describe('testing feedSlice', () => {
  const actions = {
    getFeeds: {
      pending: {
        type: feedThunk.pending.type,
        payload: null
      },
      rejected: {
        type: feedThunk.rejected.type,
        error: { message: 'test error feedThunk' }
      },
      fulfilled: {
        type: feedThunk.fulfilled.type,
        payload: { orders: ['order1', 'order2'], total: 2, totalToday: 1 }
      }
    }
  };
  describe('testing the receipt of the order feed', () => {
    it('testing the pending status', () => {
      const newState = feedSlice.reducer(
        { ...initialState },
        actions.getFeeds.pending
      );
      expect(newState.isLoading).toBe(true);
      expect(newState.error).toBe(undefined);
    });
    it('testing the rejected state', () => {
      const newState = feedSlice.reducer(
        { ...initialState },
        actions.getFeeds.rejected
      );
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe(actions.getFeeds.rejected.error.message);
    });
    it('testing the fulfilled state', () => {
      const newState = feedSlice.reducer(
        { ...initialState },
        actions.getFeeds.fulfilled
      );
      expect(newState.isLoading).toBe(false);
      expect(newState.feeds).toEqual(actions.getFeeds.fulfilled.payload.orders);
      expect(newState.total).toEqual(actions.getFeeds.fulfilled.payload.total);
      expect(newState.totalToday).toEqual(
        actions.getFeeds.fulfilled.payload.totalToday
      );
    });
  });
});
