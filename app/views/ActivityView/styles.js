import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  headerText: {
    fontFamily: 'Raleway',
    fontSize: 24,
    lineHeight: 26,
    paddingHorizontal: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  border: {
    borderBottomWidth: 0.5,
  },
  itemContent: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 12,
    paddingRight: 20,
  },
  itemImage: {
    width: 48,
    height: 48,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  itemTitle: {
    fontFamily: 'Hind Vadodara',
    fontSize: 14,
    lineHeight: 21,
  },
  itemText: {
    marginVertical: 4,
    fontSize: 14,
    lineHeight: 21,
  },
  postImageContainer: {
    position: 'relative',
  },
  postImages: {
    width: 52,
    height: 52,
    borderRadius: 4,
  },
  playIcon: {
    top: 10,
    left: 10,
    position: 'absolute',
  },
  emptyText: {
    marginTop: 40,
    fontSize: 16,
    alignSelf: 'center',
  },
  captionText: {
    fontFamily: 'Raleway',
    fontSize: 12,
    lineHeight: 14,
  },
  tabBar: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 0.5,
  },
  activeTab: {
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tabText: {fontFamily: 'Raleway', fontWeight: '500', fontSize: 14},
});
