import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    alignSelf: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    flexDirection: 'row',
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    alignItems: 'center',
    height: 89,
    paddingLeft: 17,
    marginTop: 5
  },
  closeIcon: {
    position: 'absolute',
    top: 20,
    right: 20
  },
  imageNameContainer: {
    marginLeft: 13
  },
  imageName: {
    fontWeight: '500',
    fontFamily: 'Hind Vadodara',
    fontSize: 16,
    marginBottom: 5
  },
  uploadNewImageText: {
    fontFamily: 'Raleway',
    fontSize: 12,
    marginLeft: 6
  },
  uploadIconAndText: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default styles;