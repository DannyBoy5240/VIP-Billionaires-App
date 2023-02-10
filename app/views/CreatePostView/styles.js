import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  headerContainer: {
    marginVertical: 16,
    marginHorizontal: 18,
    borderRadius: 16,
    borderWidth: 0.8,
    borderColor: 'grey',
  },
  userContainer: {
    margin: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    resizeMode: 'contain',
  },
  userName: {
    marginLeft: 8,
    fontWeight: 'bold',
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
    paddingHorizontal: 8,
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
});
