import store, { rootReducer } from './store';

describe('Тesting rootReducer', () => {
  it('checking the operation of rootReducer', () => {
    const initialState = store.getState();
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });
});
