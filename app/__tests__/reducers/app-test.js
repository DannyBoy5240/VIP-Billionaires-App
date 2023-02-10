import app, { initialState } from '../../reducers/app';
import * as ActionTypes from '../../actions/actionsTypes';

describe('app reducer', () => {
  it('return the initial state', () => {
    expect(app(initialState, {})).toEqual(initialState);
  });

  it('handle APP_STATE.FOREGROUND', () => {
    const action = {
      type: ActionTypes.APP_STATE.FOREGROND,
    };
    expect(app(initialState, action)).toEqual({
      ...initialState,
      inactive: false,
      foreground: true,
      background: false,
    });
  });

  it('handle APP_STATE.BACKGROUND', () => {
    const action = {
      type: ActionTypes.APP_STATE.BACKGROUND,
    };
    expect(app(initialState, action)).toEqual({
      ...initialState,
      inactive: false,
      foreground: false,
      background: true,
    });
  });

  it('handle APP_STATE.INACTIVE', () => {
    const action = {
      type: ActionTypes.APP_STATE.INACTIVE,
    };
    expect(app(initialState, action)).toEqual({
      ...initialState,
      inactive: true,
      foreground: false,
      background: false,
    });
  });

  it('handle APP.START', () => {
    const action = {
      type: ActionTypes.APP.START,
      root: '',
      text: '',
    };
    expect(app(initialState, action)).toEqual({
      ...initialState,
      root: action.root,
      text: action.text,
    });
  });

  it('handle APP.INIT', () => {
    const action = {
      type: ActionTypes.APP.INIT,
    };
    expect(app(initialState, action)).toEqual({
      ...initialState,
      ready: false,
    });
  });

  it('handle APP.READY', () => {
    const action = {
      type: ActionTypes.APP.READY,
    };
    expect(app(initialState, action)).toEqual({
      ...initialState,
      ready: true,
    });
  });

  it('handle APP.SET_MASTER_DETAIL', () => {
    const action = {
      type: ActionTypes.APP.SET_MASTER_DETAIL,
      isMasterDetail: true,
    };
    expect(app(initialState, action)).toEqual({
      ...initialState,
      isMasterDetail: action.isMasterDetail,
    });
  });
  
  it('handle APP.SET_ROUTE', () => {
    const action = {
      type: ActionTypes.APP.SET_ROUTE,
      routeName: '',
    };
    expect(app(initialState, action)).toEqual({
      ...initialState,
      route: action.routeName,
    });
  });
});