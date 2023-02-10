import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flexGrow: 1,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginTop: 120,
  },
  logo: {
    height: 240,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  logoText: {
    maxWidth: '80%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
})
