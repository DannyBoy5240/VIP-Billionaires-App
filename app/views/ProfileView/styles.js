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
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: -50,
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
  searchToolBox: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
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
    fontSize: 16,
    fontWeight: '500',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  website: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: '500',
  },
  job: {
    marginTop: 10,
    fontSize: 16,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: -50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    borderRadius: 25,
    width: 100,
    height: 100,
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
    fontSize: 24,
    fontWeight: '400',
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
  editProfileTxtBtn: {
    width: 357,
    height: 46,
    borderRadius: 14,
    marginTop: 14,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  editProfileTxt: {
    fontSize: 16,
    fontWeight: '500',
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
    width: '33%',
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
    fontFamily: 'Hind Vadodara',
    marginBottom: 8,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Hind Vadodara',
  },
  followWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  topRightButtons: {
    position: 'relative',
    top: 20,
    zIndex: 2,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 15,
    width: 360,
    height: 49,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItem: {
    width: 175,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItemText: {
    fontWeight: '400',
    fontSize: 13,
  },

  tile1: {
    width: 200,
    height: 200,
    margin: 5,
    borderRadius: 6,
  },
  tile2: {
    width: width - 230,
    height: 95,
    margin: 5,
    borderRadius: 6,
  },
  tile3: {
    width: (width - 40) / 3,
    height: 167,
    margin: 5,
    borderRadius: 6,
  },

  apptitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  iconContainer: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: '#F5BF4D',
    borderWidth: 2,
    borderColor: '#FEFBFF',
    borderRadius: 13,
    width: 23,
    height: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prevButton: {
    width: 36,
    height: 36,
    borderWidth: 1,
    borderColor: 'rgba(133, 133, 133, 0.25)',
    borderRadius: 8,
  },
});
