import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  viewContainer: {
    marginTop: 25,
  },
  chatRoomCounter: {
    flexDirection: 'row',
    padding: 14,
  },
  chatRoomText: {
    fontFamily: 'Raleway',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 19,
    marginRight: 6,
    marginTop: 17,
  },
  chatTextBox: {
    width: 50,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatListContainer: {
    marginTop: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 8,
  },
  avatarContainer: {
    flexDirection: 'row',
    position: 'relative',
  },
  badge: {
    bottom: 0,
    right: 0,
    borderWidth: 2,
    position: 'absolute',
  },
  itemContent: {
    flexGrow: 1,
    flex: 1,
    marginHorizontal: 12,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  itemTitle: {
    fontFamily: 'Hind Vadodara',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 4,
  },
  itemMessage: {
    fontFamily: 'Hind Vadodara',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 22,
    color: '#C4C4C4',
  },
});
