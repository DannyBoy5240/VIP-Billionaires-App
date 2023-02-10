import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    bottom: -20,
    paddingBottom: 90,
    paddingHorizontal: 14,
    position: 'absolute',
  },
  title: {
    fontFamily: 'Hind Vadodara',
    fontWeight: '600',
    fontSize: 20,
    marginTop: 26,
    alignSelf: 'center',
  },
  descriptionText: {
    fontFamily: 'Raleway',
    fontWeight: '400',
    fontSize: 12,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: 20,
  },
  submitBtn: {
    marginTop: 8,
    paddingVertical: 2,
    alignSelf: 'center',
    height: 45,
    width: width * 0.92,
  },
});

export default styles;
