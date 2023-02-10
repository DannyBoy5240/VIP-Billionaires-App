import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  headerContainer: {
    marginTop: 20,
    paddingVertical: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    maxHeight: 150,
    resizeMode: 'contain',
  },
  mainText: {
    textAlign: 'center',
    marginHorizontal: 64,
    textTransform: 'uppercase',
    fontSize: 20,
  },
  subText: {
    textAlign: 'center',
    marginHorizontal: 64,
    textTransform: 'uppercase',
    marginTop: 20,
  },
  actionBtn: {
    marginHorizontal: 40,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
