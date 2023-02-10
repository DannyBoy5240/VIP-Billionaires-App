import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: 250,
  },
  mainContent: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: 50,
    backgroundColor: 'white',
  },
  backAction: {
    position: 'absolute',
    bottom: 62,
    right: 12,
  },
  backImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    backgroundColor: '#aaaaaa',
  },
  logo: {
    maxHeight: 150,
    resizeMode: 'contain',
  },
  profileContainer: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  mainInfo: {
    flexDirection: 'row',
  },
  bio: {
    marginTop: 4,
    fontSize: 12,
  },
  city: {
    marginTop: 10,
    fontSize: 12,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  website: {
    marginTop: 2,
  },
  job: {
    marginTop: 2,
    fontSize: 12,
  },
  avatarContainer: {
    borderRadius: 25,
    marginTop: 75,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatar: {
    borderRadius: 25,
    width: 90,
    height: 90,
  },
  avatarName: {
    fontSize: 18,
    fontWeight: '400',
  },
  avatarjob: {
    fontSize: 12,
    fontWeight: '500',
  },
  avatarwebsite: {
    fontSize: 13,
  },
  profileInfo: {
    flexGrow: 1,
    alignItems: 'center',
    marginVertical: 20,
  },
  profileTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  handle: {
    fontSize: 12,
    color: 'grey',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileName: {
    fontSize: 15,
    fontWeight: '700',
  },
  settingIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  editProfile: {
    marginTop: 12,
  },
  editProfileBtn: {
    width: 100,
    height: 24,
    resizeMode: 'contain',
  },
  actionContainer: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemAction: {
    width: 100,
    height: 24,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 8,
  },
  optionContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
  },
  borderLeft: {
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: 'grey',
  },
  borderRight: {
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: 'grey',
  },
  optionValue: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  optionTitle: {
    fontSize: 16,
  },
  followWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -25,
    paddingHorizontal: '10%',
  },
  topRightButtons: {
    position: 'absolute',
    top: 15,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolButton: {
    width: 44,
    height: 44,
    resizeMode: 'contain',
  },
  sideButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: '#2A2A2AB2',
    justifyContent: 'center',
  },
  tabContainer: {
    paddingHorizontal: 20,
    height: 50,
    alignItems: 'center',
    marginBottom: 15,
  },
  tab: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 14,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  tabItemText: {
    fontWeight: '400',
    fontSize: 13,
  },

  tile1: {
    width: 200,
    height: 200,
    margin: 5,
  },
  tile2: {
    width: width - 230,
    height: 95,
    margin: 5,
  },
  tile3: {
    width: (width - 40) / 3,
    height: 167,
    margin: 5,
  },
  buttonWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
    marginBottom: 17,
    borderBottomWidth: 1,
    paddingBottom: 21,
    paddingHorizontal: 26,
  },
  followButton: {
    borderRadius: 14,
    borderWidth: 1,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {with: 2, height: 2},
    shadowRadius: 2,
    elevation: 2,
    flex: 1,
    height: 46,
  },
  followingButton: {
    paddingHorizontal: 30,
    borderRadius: 20,
    marginHorizontal: 10,
    borderWidth: 1,
  },
  followText: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 14,
  },
  messageButton: {
    borderRadius: 20,
    marginHorizontal: 10,
    alignItems: 'center',
    marginTop: 6,
  },
  messageText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#eeeeee',
    paddingVertical: 10,
  },
});
