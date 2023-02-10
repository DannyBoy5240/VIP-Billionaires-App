import { StyleSheet } from 'react-native'
import { COLOR_WHITE } from '../../constants/colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_WHITE,
  },
  logo: {
    height: 82,
    resizeMode: 'contain',
  },
  formContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  submitBtn: {
    marginTop: 8,
    paddingVertical: 2,
    alignSelf: 'center',
  },
  forgotContainer: {
    marginBottom: 10,
  },
  forgotText: {
    textAlign: 'right',
    textDecorationLine: 'none',
    color: '#C4C4C4',
    fontFamily: 'Raleway',
    fontSize: 14,
    lineHeight: 16,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  description: {
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 48,
  },
  loginTitle: {
    fontSize: 24,
    lineHeight: 36,
    fontFamily: 'HindVadodara-Bold',
  },
  loginText: {
    fontFamily: 'Raleway',
    fontSize: 14,
    lineHeight: 16,
    textAlign: 'center',
  },
})
