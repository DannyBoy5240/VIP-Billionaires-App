import { StyleSheet } from 'react-native'
import { COLOR_WHITE } from '../../constants/colors'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_WHITE,
  },
  topLinearGradient: {
    height: 4,
  },
  mainContainer: {
    padding: 20,
    height: '100%',
  },
  logoContainer: {
    marginTop: 140,
  },
  logo: {
    height: 140,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  logoText: {
    maxWidth: '80%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  welcome: {
    marginTop: 20,
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    lineHeight: 38,
  },
  welcomeText: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Raleway',
  },
  submitBtn: {
    marginBottom: 12,
  },
  buttonWrap: {
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    alignItems: 'center',
  },
})
