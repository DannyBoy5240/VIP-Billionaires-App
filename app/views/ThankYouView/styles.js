import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logoContainer: {
    height: 350,
  },
  logoInnerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    height: 300,
    backgroundColor: 'red'
  },
  logo: {
    maxHeight: 180,
    resizeMode: 'contain',
    width: 175,
    height: 105,
    alignSelf: 'center'
  },
  logoText: {
    maxWidth: '60%',
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
  },
  mainText: {
    textAlign: 'center',
    marginHorizontal: 32,
    textTransform: 'uppercase',
    fontSize: 16,
    fontFamily: 'Hind Vadodara',
    fontWeight: '600',
  },
  subText: {
    textAlign: 'center',
    marginHorizontal: 32,
    marginTop: 20,
    fontFamily: 'Raleway',
    fontSize: 14
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
  avatar: {
    alignSelf: 'center',
    marginBottom: 10
  },
  submittedApplicationText: {
    fontFamily: 'Raleway',
    fontWeight: '500',
    fontSize: 12,
    margin: 24
  },
  logoutText: {
    alignSelf: 'flex-end',
    marginRight: 33,
    marginVertical: 11
  }
});
