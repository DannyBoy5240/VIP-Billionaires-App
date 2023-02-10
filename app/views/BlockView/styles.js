import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {},
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContent: {
    flexDirection: 'column',
    marginLeft: 16,
  },
  itemImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  itemAction: {
    width: 100,
    height: 24,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unBlockText: {
    color: '#efc455',
    paddingVertical: 4,
    width: 100,
    borderColor: '#efc455',
    borderWidth: 1,
    textAlign: 'center',
  },
  blockText: {
    width: 100,
    paddingVertical: 4,
    paddingHorizontal: 12,
    color: 'black',
    backgroundColor: '#efc455',
    textAlign: 'center',
  },
  emptyContainer: {
    flexGrow: 1,
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
