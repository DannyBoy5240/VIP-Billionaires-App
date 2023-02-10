import chat, { initialState } from '../../reducers/chat';
import * as ActionTypes from '../../actions/actionsTypes';

describe('chat reducer', () => {
  it('return the initial state', () => {
    expect(chat(initialState, {})).toEqual(initialState);
  });

  it('handle CHAT.SET_UNREAD', () => {
    const action = {
      type: ActionTypes.CHAT.SET_UNREAD,
      unread: 1,
    };
    expect(chat(initialState, action)).toEqual({
      ...initialState,
      unread: 1,
    });
  });
});