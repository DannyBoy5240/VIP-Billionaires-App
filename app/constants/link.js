import { getBundleId, isIOS } from '../utils/deviceInfo';

const APP_STORE_ID = '1466592518';

export const PLAY_MARKET_LINK = `https://play.google.com/store/apps/details?id=${getBundleId}`;
export const APP_STORE_LINK = `https://itunes.apple.com/app/id${APP_STORE_ID}`;
export const STORE_REVIEW_LINK = isIOS
  ? `itms-apps://itunes.apple.com/app/id${APP_STORE_ID}?action=write-review`
  : `market://details?id=${getBundleId}`;
