import * as ActionTypes from '../../actions/actionsTypes';
import * as Actions from '../../actions/login';

describe('login actions', () => {
  let testedCount = 0;
  it('loginReset', () => {
    const expectedAction = {
      type: ActionTypes.LOGIN.RESET,
    };
    expect(Actions.loginReset()).toEqual(expectedAction);
    testedCount++;
  });

  it('loginSuccess', () => {
    const data = {};
    const expectedAction = {
      type: ActionTypes.LOGIN.SUCCESS,
      data,
    };
    expect(Actions.loginSuccess(data)).toEqual(expectedAction);
    testedCount++;
  });

  it('logout', () => {
    const forcedByServer = false;
    const expectedAction = {
      type: ActionTypes.LOGOUT,
      forcedByServer,
    };
    expect(Actions.logout()).toEqual(expectedAction);
    testedCount++;
  });

  it('setUser', () => {
    const user = {};
    const expectedAction = {
      type: ActionTypes.USER.SET,
      user,
    };
    expect(Actions.setUser(user)).toEqual(expectedAction);
    testedCount++;
  });
  
  it('test all login actions', () => {
    const keys = Object.keys(Actions);
    let actionCount = 0;
    for (let k in keys) {
      if (typeof Actions[keys[k]] === 'function') {
        actionCount ++;
      }
    }
    const expectedCount = {
      count: testedCount,
    };
    const received = () => ({
      count: actionCount,
    });
    expect(received()).toEqual(expectedCount);
  });
});