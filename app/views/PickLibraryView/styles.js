import { StyleSheet } from 'react-native';
import { COLOR_BLACK, COLOR_WHITE } from '../../constants/colors';

export default StyleSheet.create({
  headerContainer: {
    marginVertical: 16,
    marginHorizontal: 18,
    borderRadius: 16,
    borderWidth: 0.8,
    borderColor: 'grey',
  },
  roundInput: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 16,
  },
  underlineInput: {
    marginHorizontal: 8,
    marginTop: 12,
  },
  imageStyle: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  videoContainer: {
    height: 300,
    width: '100%',
    resizeMode: 'contain',
  },
  textStyle: {
    height: 200,
    textAlignVertical: 'top',
  },
  inputContainer: {
    flexGrow: 1,
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  video: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  thumbnailContainer: {
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  playIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 300,
  },
  recentText: {
    marginTop: 24,
    marginBottom: 4,
    marginLeft: 4,
  },
  selectImageContainer: {
    marginTop: 10,
  },
  selectImage: {
    width: '100%',
    height: 300,
  },
  galleryView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#000000E0',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {},
  slideImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  swipeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    backgroundColor: COLOR_WHITE,
    borderColor: COLOR_WHITE,
    borderWidth: 1,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  activeDot: {
    backgroundColor: COLOR_BLACK,
    borderColor: COLOR_WHITE,
    borderWidth: 1,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  emptyContainer: {
    marginTop: 120,
  },
  emptyText: {
    alignSelf: 'center',
    fontSize: 16,
  },
});
