import { StyleSheet } from 'react-native';
import {
  COLOR_BLUE_DARK,
  COLOR_ORANGE,
  COLOR_WHITE,
  COLOR_YELLOW,
} from '../../constants/colors';

export default StyleSheet.create({
  header: {
    height: 200,
  },
  swiperContainer: {
    backgroundColor: 'black',
  },
  slides: {
    height: 200,
    width: '100%',
  },
  slideImage: {},
  topCategoryTitle: {
    fontSize: 14,
    lineHeight: 26,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  dot: {
    backgroundColor: COLOR_WHITE,
    borderColor: COLOR_YELLOW,
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
    backgroundColor: COLOR_YELLOW,
    borderColor: COLOR_YELLOW,
    borderWidth: 1,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  productContainer: {
    marginHorizontal: 20,
    marginVertical: 4,
  },
  productImageContainer: {},
  productImage: {
    width: 160,
    height: 160,
    borderRadius: 12,
    borderColor: 'grey',
    borderWidth: StyleSheet.hairlineWidth,
  },
  productInfo: {
    marginTop: 4,
  },
  productKanaTitle: {
    fontSize: 10,
    width: 160,
  },
  productTitle: {
    fontSize: 10,
  },
  productPrice: {
    fontSize: 10,
  },
});
