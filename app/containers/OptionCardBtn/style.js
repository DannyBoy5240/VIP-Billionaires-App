import { Dimensions, StyleSheet } from 'react-native'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    flexDirection: 'row',
    padding: 10,
    marginVertical: 4,
    alignItems: 'center',
  },
  imageView: {
    width: 48,
    height: 48,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  textsContainer: {
    marginLeft: 14,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
  },
  smallText: {
    fontFamily: 'Raleway',
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 4,
  },
  rightIcon: {
    position: 'absolute',
    right: 14,
    alignSelf: 'center',
  },
})

export default styles
