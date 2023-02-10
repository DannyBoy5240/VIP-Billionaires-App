import { Dimensions, StyleSheet } from 'react-native'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    alignSelf: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    flexDirection: 'row',
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,
    alignItems: 'center',
    height: 130,
    paddingLeft: 17,
    marginVertical: 5,
  },
  closeIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  phone: {
    fontFamily: 'Hind Vadodara',
    fontSize: 12,
    fontWeight: '400',
    marginLeft: 10,
  },
  locationHomeImage: {
    width: 18,
    height: 18,
  },
  location: {
    fontFamily: 'Hind Vadodara',
    fontSize: 12,
    fontWeight: '400',
    marginLeft: 10,
  },
  genderAndDob: {
    fontFamily: 'Raleway',
    fontWeight: '300',
    fontSize: 12,
    marginBottom: 10,
  },
  iconAndText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    marginBottom: 3,
    fontSize: 16,
    fontFamily: 'Hind Vadodara',
    fontWeight: '500',
  },
})

export default styles
