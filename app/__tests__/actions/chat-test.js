import * as ActionTypes from '../../actions/actionsTypes';
import * as Actions from '../../actions/chat';

describe('chat actions', () => {
  let testedCount = 0;
  it('setUnread', () => {
    const unread = {};
    const expectedAction = {
      type: ActionTypes.CHAT.SET_UNREAD,
      unread,
    };
    expect(Actions.setUnread(unread)).toEqual(expectedAction);
    testedCount++;
  });

  it('fetchUnread', () => {
    const expectedAction = {
      type: ActionTypes.CHAT.FETCH_UNREAD,
    };
    expect(Actions.fetchUnread()).toEqual(expectedAction);
    testedCount++;
  });
  
  it('test all chat actions', () => {
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