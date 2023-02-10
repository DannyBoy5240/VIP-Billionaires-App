import {Share} from 'react-native';

import {CATEGORY_ARRAY} from '../constants/app';
import firebaseSdk, {DB_ACTION_UPDATE} from '../lib/firebaseSdk';

export const getActivities = activities => {
  if (!activities) return '';
  const categories = activities.map(a => CATEGORY_ARRAY[a]);
  return categories.join(',');
};

export const onSharePost = item => {
  const permalink =
    'https://apps.apple.com/us/app/vip-billionaires-social-chat/id1076103571';
  Share.share({
    message: permalink,
  })
    .then(res => {
      const update = {id: item.id, shares: (item.shares ?? 0) + 1};
      firebaseSdk
        .setData(firebaseSdk.TBL_POST, DB_ACTION_UPDATE, update)
        .catch(err => {});
    })
    .catch(() => {});
};

export const getUserRepresentString = user => {
  if (user && user.displayName && user.handle) {
    return `@${user.displayName
      .replace(/ /g, '')
      .toLowerCase()
      .substring(0, 8)}_${user.handle.substring(1, 8)}`;
  }
  return '';
};

export const navigateToProfile = (navigation, owner, other) => {
  if (owner.userId === other.userId) {
    // navigation.navigate('Profile');
  } else {
    navigation.push('OtherProfile', {userId: other.userId});
  }
};
