import * as ActionTypes from '../../actions/actionsTypes';
import * as Actions from '../../actions/cart';

describe('cart actions', () => {
  let testedCount = 0;
  it('addToCart', () => {
    const product = {};
    const expectedAction = {
      type: ActionTypes.CART.ADD,
      product,
    };
    expect(Actions.addToCart(product)).toEqual(expectedAction);
    testedCount++;
  });
  
  it('removeFromCart', () => {
    const id = 0;
    const expectedAction = {
      type: ActionTypes.CART.REMOVE,
      id,
    };
    expect(Actions.removeFromCart(id)).toEqual(expectedAction);
    testedCount++;
  });

  it('clearCart', () => {
    const expectedAction = {
      type: ActionTypes.CART.CLEAR,
    };
    expect(Actions.clearCart()).toEqual(expectedAction);
    testedCount++;
  });

  it('createOrder', () => {
    const order = '';
    const expectedAction = {
      type: ActionTypes.CART.CREATE_ORDER,
      order,
    };
    expect(Actions.createOrder(order)).toEqual(expectedAction);
    testedCount++;
  });

  it('updateOrder', () => {
    const order = '';
    const expectedAction = {
      type: ActionTypes.CART.UPDATE_ORDER,
      order,
    };
    expect(Actions.updateOrder(order)).toEqual(expectedAction);
    testedCount++;
  });

  it('test all cart actions', () => {
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