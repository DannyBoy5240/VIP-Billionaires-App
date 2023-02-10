import * as types from '../actions/actionsTypes';

export const initialState = {
  unread: 0,
};

export default function chat(state = initialState, action) {
  switch (action.type) {
  case types.CHAT.SET_UNREAD:
    return {
      ...state,
      unread: action.unread,
    };
  default:
    return state;
  }
}
