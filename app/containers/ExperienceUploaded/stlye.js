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
    height: 97,
    paddingLeft: 17,
    marginVertical: 5,
  },
  jobTitle: {
    marginBottom: 3,
    fontSize: 16,
    fontFamily: 'Hind Vadodara',
    fontWeight: '500',
  },
  companyNameAndNumberOfYears: {
    fontFamily: 'Raleway',
    fontWeight: '300',
    fontSize: 12,
    marginBottom: 10,
  },
  salaryText: {
    color: '#F5BF4D',
    fontFamily: 'Hind Vadodara',
    fontWeight: '500',
    fontSize: 14,
  },
  closeIcon: {
    position: 'absolute',
    top: 20,
    right: 20
  },
});

export default styles;