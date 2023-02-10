import * as ActionTypes from '../../actions/actionsTypes';
import * as Actions from '../../actions/app';

describe('app actions', () => {
  let testedCount = 0;
  it('appStart', () => {
    const root = {};
    const args = { param1: '', param2: '' };
    const expectedAction = {
      type: ActionTypes.APP.START,
      root,
      ...args,
    };
    expect(Actions.appStart({ root, ...args })).toEqual(expectedAction);
    testedCount++;
  });

  it('appReady', () => {
    const expectedAction = {
      type: ActionTypes.APP.READY,
    };
    expect(Actions.appReady()).toEqual(expectedAction);
    testedCount++;
  });

  it('appInit', () => {
    const expectedAction = {
      type: ActionTypes.APP.INIT,
    };
    expect(Actions.appInit()).toEqual(expectedAction);
    testedCount++;
  });

  it('appInitLocalSettings', () => {
    const expectedAction = {
      type: ActionTypes.APP.INIT_LOCAL_SETTINGS,
    };
    expect(Actions.appInitLocalSettings()).toEqual(expectedAction);
    testedCount++;
  });

  it('setMasterDetail', () => {
    const isMasterDetail = {};
    const expectedAction = {
      type: ActionTypes.APP.SET_MASTER_DETAIL,
      isMasterDetail,
    };
    expect(Actions.setMasterDetail(isMasterDetail)).toEqual(expectedAction);
    testedCount++;
  });

  it('setRoute', () => {
    const routeName = 'ROOT';
    const expectedAction = {
      type: ActionTypes.APP.SET_ROUTE,
      routeName,
    };
    expect(Actions.setRoute(routeName)).toEqual(expectedAction);
    testedCount++;
  });
  
  it('test all app actions', () => {
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