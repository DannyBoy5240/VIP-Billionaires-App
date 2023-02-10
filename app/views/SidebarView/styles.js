import { StyleSheet, Dimensions } from 'react-native'
import { isIOS } from '../../utils/deviceInfo'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
  profileContainer: {
    height: isIOS ? 140 : 100,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 4,
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  profileInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 220,
    height: 90,
    resizeMode: 'contain',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'white',
  },
  profileName: {
    fontFamily: 'Raleway',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 20,
  },
  roleName: {
    fontFamily: 'Raleway',
    fontSize: 12,
    lineHeight: 20,
  },
  menuIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
  },
  itemLeft: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  itemCenter: {
    marginHorizontal: 10,
  },
  itemText: {
    fontFamily: 'Hind Vadodara',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
  },
  itemsRight: {
    flex: 1,
    height: 0.5,
    backgroundColor: 'white',
  },
  logoutContainer: {
    height: 70,
    paddingTop: 5,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 6,
    justifyContent: 'center',
  },
  logoutText: {
    fontFamily: 'Hind Vadodara',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 12,
  },
  logoutIcon: {
    width: 26,
    height: 26,
    marginRight: 8,
    tintColor: '#C4C4C4',
  },
  closeIconAndText: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 60,
    justifyContent: 'center',
    alignSelf: 'flex-start',
    position: 'absolute',
    top: 10,
    right: 26,
  },
  closeIcon: {
    marginRight: 8,
  },
  menuText: {
    fontFamily: 'Raleway',
    fontSize: 16,
    lineHeight: 26,
    marginTop: 16,
  },
  bottomView: {
    flexDirection: 'row',
    marginTop: 20,
  },
  privacyTermsEulaContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: 16,
    justifyContent: 'space-between',
  },
  languageContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    justifyContent: 'space-around',
  },
  text: {
    fontSize: 12,
  },
  languageText: {
    fontFamily: 'Hind Vadodara',
    fontWeight: '600',
    fontSize: 12,
  },
  chevronIcon: {
    alignSelf: 'center',
  },
})
