import { CHAT } from './actionsTypes';

export function setUnread(unread) {
  return {
    type: CHAT.SET_UNREAD,
    unread,
  };
}

export function fetchUnread() {
  return {
    type: CHAT.FETCH_UNREAD,
  };
}
