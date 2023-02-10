import cart, { initialState } from '../../reducers/cart';
import * as ActionTypes from '../../actions/actionsTypes';

describe('cart reducer', () => {
  it('return the initial state', () => {
    expect(cart(initialState, {})).toEqual(initialState);
  });

  it('handle CART.ADD', () => {
    const action = {
      type: ActionTypes.CART.ADD,
      product: {},
    };
    expect(cart(initialState, action)).toEqual({
      ...initialState,
      cart: [action.product],
    });
  });

  it('handle CART.REMOVE', () => {
    const action = {
      type: ActionTypes.CART.REMOVE,
      id: 1,
    };
    const state = {
      ...initialState,
      cart: [{ id: 0 }, { id: 1 }],
    };
    expect(cart(state, action)).toEqual({
      ...state,
      cart: [{ id: 0 }],
    });
  });

  it('handle CART.CLEAR', () => {
    const action = {
      type: ActionTypes.CART.CLEAR,
    };
    const state = {
      ...initialState,
      cart: [{ id: 0 }, { id: 1 }],
    };
    expect(cart(state, action)).toEqual({
      ...initialState,
    });
  });

  it('handle CART.CREATE_ORDER', () => {
    const action = {
      type: ActionTypes.CART.CREATE_ORDER,
      order: { 'key1': '' },
    };
    const state = {
      ...initialState,
      order: { 'key0': '' },
    };
    expect(cart(state, action)).toEqual({
      ...state,
      order: { 'key1': '' },
    });
  });

  it('handle CART.UPDATE_ORDER', () => {
    const action = {
      type: ActionTypes.CART.UPDATE_ORDER,
      order: { 'key1': '' },
    };
    const state = {
      ...initialState,
      order: { 'key0': '' },
    };
    expect(cart(state, action)).toEqual({
      ...state,
      order: { 'key0': '', 'key1': '' },
    });
  });
});