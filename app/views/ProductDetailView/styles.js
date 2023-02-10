import { StyleSheet } from 'react-native';
import {
  COLOR_BLUE_DARK,
  COLOR_ORANGE,
  COLOR_WHITE,
  COLOR_YELLOW,
} from '../../constants/colors';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 100,
  },
  productContainer: {
    marginTop: 8,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  productTitle: {
    fontSize: 18,
    textAlign: 'center',
  },
  productName: {
    marginTop: 4,
    fontSize: 18,
  },
  productCaption: {
    textAlign: 'center',
    marginTop: 4,
    fontSize: 12,
  },
  productImage: {
    marginTop: 8,
    width: '100%',
    height: 280,
    resizeMode: 'cover',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    borderColor: 'grey',
  },
  sizeContainer: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  sizeContent: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  colorContainer: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  colorContent: {
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'grey',
    paddingVertical: 12,
  },
  colorItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
  },
  selectColorText: {
    width: '100%',
    textTransform: 'uppercase',
    backgroundColor: '#FCEFD2',
    borderRadius: 4,
    textAlign: 'center',
  },
  colorImage: {
    width: 60,
    height: 60,
  },
  colorText: {
    textTransform: 'uppercase',
  },
  itemContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'grey',
    width: 60,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  selectItemContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'grey',
    width: 60,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    backgroundColor: '#FCEFD2',
  },
  itemImage: {},
  itemText: {},
  variantTitle: {},
  targetProductItem: {
    alignItems: 'center',
  },
  targetProductTitle: {},
  targetProductVariant: {},
  targetProductPrice: {
    fontSize: 24,
  },
  actionBtn: {
    marginTop: 20,
    alignItems: 'center',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
