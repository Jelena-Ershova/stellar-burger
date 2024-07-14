import {
  registerUserThunk,
  loginUserThunk,
  updateUserThunk,
  logoutThunk,
  userSlice,
  initialState
} from './userSlice';

describe('testing userSlice', () => {
  const actions = {
    registerUser: {
      pending: {
        type: registerUserThunk.pending.type,
        payload: null
      },
      rejected: {
        type: registerUserThunk.rejected.type,
        error: { message: 'test error registerUserThunk' }
      },
      fulfilled: {
        type: registerUserThunk.fulfilled.type,
        payload: { user: { name: 'test_user', email: 'test-user@test.com' } }
      }
    },
    loginUser: {
      pending: {
        type: loginUserThunk.pending.type,
        payload: null
      },
      rejected: {
        type: loginUserThunk.rejected.type,
        error: { message: 'test error loginUserThunk' }
      },
      fulfilled: {
        type: loginUserThunk.fulfilled.type,
        payload: { user: { name: 'test_user', email: 'test-user@test.com' } }
      }
    },
    updateUser: {
      pending: {
        type: updateUserThunk.pending.type,
        payload: null
      },
      rejected: {
        type: updateUserThunk.rejected.type,
        error: { message: 'test error updateUserThunk' }
      },
      fulfilled: {
        type: updateUserThunk.fulfilled.type,
        payload: { user: { name: 'test_user', email: 'test-user@test.com' } }
      }
    },
    logoutUser: {
      pending: {
        type: logoutThunk.pending.type,
        payload: null
      },
      rejected: {
        type: logoutThunk.rejected.type,
        error: { message: 'test error logoutThunk' }
      },
      fulfilled: {
        type: logoutThunk.fulfilled.type,
        payload: null
      }
    }
  };
  describe('Testing user registration', () => {
    it('testing the pending status', () => {
      const newState = userSlice.reducer(
        { ...initialState },
        actions.registerUser.pending
      );
      expect(newState.error).toBe(undefined);
    });
    it('testing the rejected state', () => {
      const newState = userSlice.reducer(
        { ...initialState },
        actions.registerUser.rejected
      );
      expect(newState.error).toBe(actions.registerUser.rejected.error.message);
    });
    it('testing the fulfilled state', () => {
      const newState = userSlice.reducer(
        { ...initialState },
        actions.registerUser.fulfilled
      );
      expect(newState.error).toBe(undefined);
      expect(newState.userData).toEqual(
        actions.registerUser.fulfilled.payload.user
      );
    });
  });

  describe('Testing the login', () => {
    it('testing the pending status', () => {
      const newState = userSlice.reducer(
        { ...initialState },
        actions.loginUser.pending
      );
      expect(newState.error).toBe(undefined);
    });
    it('testing the rejected state', () => {
      const newState = userSlice.reducer(
        { ...initialState },
        actions.loginUser.rejected
      );
      expect(newState.error).toBe(actions.loginUser.rejected.error.message);
    });
    it('testing the fulfilled state', () => {
      const newState = userSlice.reducer(
        { ...initialState },
        actions.loginUser.fulfilled
      );
      expect(newState.error).toBe(undefined);
      expect(newState.userData).toEqual(
        actions.loginUser.fulfilled.payload.user
      );
    });
  });

  describe('Testing the user update', () => {
    it('testing the pending status', () => {
      const newState = userSlice.reducer(
        { ...initialState },
        actions.updateUser.pending
      );
      expect(newState.error).toBe(undefined);
    });
    it('testing the rejected state', () => {
      const newState = userSlice.reducer(
        { ...initialState },
        actions.updateUser.rejected
      );
      expect(newState.error).toBe(actions.updateUser.rejected.error.message);
    });
    it('testing the fulfilled state', () => {
      const newState = userSlice.reducer(
        { ...initialState },
        actions.updateUser.fulfilled
      );
      expect(newState.error).toBe(undefined);
      expect(newState.userData).toEqual(
        actions.updateUser.fulfilled.payload.user
      );
    });
  });

  describe('Testing the logout', () => {
    it('testing the pending status', () => {
      const newState = userSlice.reducer(
        { ...initialState },
        actions.logoutUser.pending
      );
      expect(newState.error).toBe(undefined);
    });
    it('testing the rejected state', () => {
      const newState = userSlice.reducer(
        { ...initialState },
        actions.logoutUser.rejected
      );
      expect(newState.error).toBe(actions.logoutUser.rejected.error.message);
    });
    it('testing the fulfilled state', () => {
      const newState = userSlice.reducer(
        { ...initialState },
        actions.logoutUser.fulfilled
      );
      expect(newState.userData).toEqual(null);
    });
  });
});
