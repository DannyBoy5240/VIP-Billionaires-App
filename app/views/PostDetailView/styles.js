import {StyleSheet} from 'react-native';
import {COLOR_YELLOW} from '../../constants/colors';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  owner: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 49,
    height: 49,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: '#2F3131',
  },
  profileInfo: {
    marginLeft: 10,
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 14,
    fontWeight: '600',
  },
  captionText: {
    marginTop: 12,
    fontSize: 14,
  },
  content: {
    position: 'relative',
  },
  titleText: {
    paddingVertical: 12,
    fontSize: 14,
    lineHeight: 19,
  },
  photoImage: {
    flex: 1,
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  likingImage: {
    position: 'absolute',
    left: 12,
    bottom: 12,
    width: 48,
    height: 48,
  },
  video: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  thumbnailContainer: {
    position: 'relative',
    backgroundColor: 'black',
  },
  thumbnail: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  playIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 300,
  },
  likes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesContent: {
    fontSize: 14,
  },
  actionImage: {
    width: 24,
    height: 24,
    paddingVertical: 4,
    marginHorizontal: 8,
    tintColor: COLOR_YELLOW,
  },
  comment: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentInput: {
    flexGrow: 1,
    borderBottomWidth: 0,
    marginLeft: 12,
    marginBottom: 0,
  },
  likesAccounts: {
    flexDirection: 'row',
    marginLeft: 12,
  },
  likeAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'grey',
  },
  commentContents: {
    marginTop: 12,
  },
  commentContainer: {
    marginBottom: 10,
    paddingHorizontal: 12,
  },
  commentMain: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 14,
    padding: 12,
  },
  commentContent: {
    flexGrow: 1,
    borderRadius: 8,
    marginLeft: 12,
    padding: 4,
  },
  commentAccountName: {
    fontSize: 14,
  },
  commentText: {
    fontSize: 14,
    color: 'grey',
  },
  commentFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 54,
  },
  commentTime: {
    fontSize: 12,
    color: 'grey',
  },
  commentAvatar: {
    width: 45,
    height: 45,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: '#2B2D2E',
  },
  commentSmallAvatar: {
    width: 33,
    height: 33,
    borderWidth: 1,
    borderRadius: 50,
  },
  replyAction: {
    marginLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentTimeIcon: {
    width: 12,
    height: 12,
    marginLeft: 4,
  },
  commentReplyIcon: {
    width: 12,
    height: 12,
  },
  replyText: {
    marginLeft: 4,
    fontSize: 12,
  },
  separator: {
    width: '100%',
    height: 1,
    marginVertical: 10,
  },
  toolIcon: {
    width: 22,
    height: 22,
    marginRight: 12,
    resizeMode: 'contain',
  },
  more: {
    width: 8,
    height: 24,
    padding: 8,
    resizeMode: 'contain',
  },
  input: {
    flex: 1,
    fontSize: 13,
    lineHeight: 14,
    flexWrap: 'wrap',
    marginHorizontal: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    height: 40,
    alignItems: 'center',
  },
  count: {
    fontSize: 12,
    fontFamily: 'Hind Vadodara',
    marginHorizontal: 6,
    marginRight: 12,
  },
  shareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareCouText: {
    fontSize: 10,
    fontWeight: '600',
    fontFamily: 'Hind Vadodara',
  },
  shareCouBack: {
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  shareCouBack1: {
    marginRight: -5,
    zIndex: 2,
  },
  shareCouBack2: {
    marginRight: -5,
    zIndex: 3,
  },
  shareCouBack3: {
    zIndex: 4,
  },
  shareButton: {
    marginLeft: 8,
  },
  sharedUserBox: {
    flexDirection: 'row',
  },
  commentBoxContainer: {
    paddingHorizontal: 12,
  },
  commentContextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentEditBox: {
    width: '100%',
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
  },
  commentEditBtn: {
    flexDirection: 'row',
    marginRight: 5,
  },
  commentEditBtnText: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
    marginLeft: 8,
    marginTop: 1,
  },
  commentContentHeader: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 30,
    marginBottom: 17,
  },
  replyButton: {
    fontSize: 12,
    fontWeight: '400',
    marginLeft: 4,
  },
  miniIcon: {
    width: 17,
    height: 15,
  },
  sharedAvatar: {
    width: 20,
    height: 20,
    borderRadius: 50,
  },
});
