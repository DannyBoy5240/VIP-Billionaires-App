import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  headerContainer: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  headerText: {
    paddingHorizontal: 18,
    resizeMode: 'contain',
    alignSelf: 'center',
    fontSize: 20,
  },
  formContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  submitBtn: {
    marginTop: 20,
    paddingVertical: 2,
    alignSelf: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
});
