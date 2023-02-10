import {StyleSheet} from 'react-native';

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
    paddingBottom: 8,
    paddingHorizontal: 18,
    position: 'relative',
  },
  thumbnailContainer: {
    position: 'relative',
  },
  editIcon: {
    right: 0,
    top: 0,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  video: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
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
  itemBoxContainer: {
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 9,
  },
  itemBoxText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 23,
  },
  itemBoxMark: {
    flexDirection: 'row',
  },
  publishBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 46,
    borderRadius: 6,
    marginTop: 18,
  },
  publishBtnText: {
    fontSize: 16,
    fontWeight: '600',
  },
  commentHeader: {
    marginBottom: 20,
    fontSize: 16,
    fontWeight: '600',
  },
  commentBox: {
    borderRadius: 8,
    marginBottom: 8,
    textAlignVertical: 'top',
    padding: 12,
  },
  previewImage: {
    padding: 12,
    width: 100,
    height: 100,
    marginVertical: 8,
  },
});
