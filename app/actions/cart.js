import * as types from './actionsTypes';

export function addToCart(product) {
  return {
    type: types.CART.ADD,
    product,
  };
}

export function removeFromCart(id) {
  return {
    type: types.CART.REMOVE,
    id,
  };
}

export function clearCart() {
  return {
    type: types.CART.CLEAR,
  };
}

export function createOrder(order) {
  return {
    type: types.CART.CREATE_ORDER,
    order,
  };
}

export function updateOrder(order) {
  return {
    type: types.CART.UPDATE_ORDER,
    order,
  };
}
