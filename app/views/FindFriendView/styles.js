import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1 },
  searchBox: {
    margin: 20,
    paddingLeft: 10,
    height: 40,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchText: {
    fontSize: 16,
    marginLeft: 10 ,
  },
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
    flex: 1,
    overflow: 'hidden',
  },
  itemContent: {
    flexDirection: 'column',
    marginLeft: 16,
    flex: 1,
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
  itemPost: {
    fontSize: 14,
  },
  itemAction: {
    width: 102,
    height: 24,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionContainer: {
    width: 100,
    height: 30,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 0,
    fontWeight: 'bold',
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
