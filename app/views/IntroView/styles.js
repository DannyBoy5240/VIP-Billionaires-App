import { Dimensions, StyleSheet } from 'react-native'
import { COLOR_YELLOW } from '../../constants/colors'

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30,
  },
  image: {
    maxWidth: '80%',
    height: 300,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    paddingVertical: 32,
    paddingHorizontal: 42,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  text: {
    fontFamily: 'Inter',
    fontSize: 12,
    lineHeight: 20,
    fontWeight: '300',
    textAlign: 'center',
  },
  submitBtn: {
    marginBottom: 36,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: height * 0.05,
    left: 16,
    right: 16,
    height: height * 0.2
  },
  paginationDots: {
    height: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activatedDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: COLOR_YELLOW,
    borderStyle: 'solid',
    backgroundColor: COLOR_YELLOW,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: '#605E5E',
    borderStyle: 'solid',
    backgroundColor: '#2B2D2E',
  },
})
