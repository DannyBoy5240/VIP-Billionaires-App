import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
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
  inputStyle: {
    height: 36,
    fontSize: 16,
    paddingVertical: 0,
  },
  selectStyle: {},
  textareaStyle: {
    height: 120,
    textAlignVertical: 'top',
    paddingVertical: 24,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  oauthContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  back: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 0,
  },
  terms: {
    flexDirection: 'row',
  },
  termItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  signupText: {
    fontSize: 27,
    fontWeight: '600',
    marginVertical: 22,
  },
  loginIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  description: {
    alignItems: 'center',
    marginBottom: 24,
  },
  loginTitle: {
    fontSize: 24,
    lineHeight: 36,
    fontWeight: '700',
    fontFamily: 'HindVadodara-Bold',
    marginBottom: 4,
  },
  loginText: {
    fontFamily: 'Raleway',
    fontSize: 14,
    lineHeight: 16,
  },
})
