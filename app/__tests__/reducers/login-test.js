import login, { initialState } from '../../reducers/login';
import * as ActionTypes from '../../actions/actionsTypes';

describe('login reducer', () => {
  it('return the initial state', () => {
    expect(login(initialState, {})).toEqual(initialState);
  });

  it('handle APP.INIT', () => {
    const action = {
      type: ActionTypes.APP.INIT,
    };
    expect(login(initialState, action)).toEqual({
      ...initialState,
    });
  });

  it('handle LOGIN.SUCCESS', () => {
    const action = {
      type: ActionTypes.LOGIN.SUCCESS,
      data: {
        user: {},
      },
    };
    expect(login(initialState, action)).toEqual({
      ...initialState,
      isFetching: false,
      isAuthenticated: true,
      user: action.data.user,
    });
  });

  it('handle LOGOUT', () => {
    const action = {
      type: ActionTypes.LOGOUT,
    };
    expect(login(initialState, action)).toEqual({
      ...initialState,
    });
  });

  it('handle USER.SET', () => {
    const action = {
      type: ActionTypes.USER.SET,
      data: {
        user: {},
      },
    };
    expect(login(initialState, action)).toEqual({
      ...initialState,
      user: {},
    });
  });
});