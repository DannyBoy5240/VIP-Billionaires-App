import * as types from '../actions/actionsTypes'

export const initialState = {
  cart: [],
  order: {},
}

export default function cart(state = initialState, action) {
  switch (action.type) {
    case types.CART.ADD: {
      let duplicate = false
      const newCart = state.cart.map(o => {
        if (
          o.id === action.product.id &&
          o.size === action.product.size &&
          o.color === action.product.color
        ) {
          duplicate = true
          return {
            ...o,
            quantity: o.quantity + 1,
          }
        }
        return o
      })

      if (duplicate) {
        return {
          ...state,
          cart: newCart,
        }
      }
      return {
        ...state,
        cart: [...state.cart, action.product],
      }
    }
    case types.CART.REMOVE:
      return {
        ...state,
        cart: state.cart.filter(p => p.id !== action.id),
      }
    case types.CART.CLEAR:
      return initialState
    case types.CART.CREATE_ORDER:
      return {
        ...state,
        order: action.order,
      }
    case types.CART.UPDATE_ORDER:
      return {
        ...state,
        order: { ...state.order, ...action.order },
      }
    default:
      return state
  }
}
