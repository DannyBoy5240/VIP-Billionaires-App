import {StyleSheet} from 'react-native';
import {COLOR_WHITE} from '../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    height: 350,
  },
  logoInnerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingTop: 40,
    height: 300,
  },
  logo: {
    height: 120,
    maxHeight: 180,
    resizeMode: 'contain',
  },
  logoText: {
    maxWidth: '60%',
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
  },
  mainText: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'HindVadodara-Bold',
  },
  subText: {
    textAlign: 'center',
    marginHorizontal: 48,
    marginTop: 12,
    fontFamily: 'Raleway',
    fontSize: 14,
    lineHeight: 16,
  },
  subLinkText: {
    textAlign: 'center',
    marginHorizontal: 48,
    marginTop: 12,
    fontFamily: 'Raleway-Bold',
    fontSize: 14,
    lineHeight: 16,
  },
  actionBtn: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  iconStyle: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 12,
  },
  actionText: {
    textTransform: 'uppercase',
    fontSize: 20,
    color: 'white',
  },
});
