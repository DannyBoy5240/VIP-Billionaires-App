import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {
  HEADER_BAR_END,
  HEADER_BAR_START,
  COLOR_YELLOW,
  themes,
} from '../../constants/colors';
import StatusBar from '../../containers/StatusBar';
import SafeAreaView from '../../containers/SafeAreaView';
import {withTheme} from '../../theme';
import SearchBox from '../../containers/SearchBox';
import debounce from '../../utils/debounce';
import styles from './styles';
import {setUser as setUserAction} from '../../actions/login';
import images from '../../assets/images';
import firebaseSdk, {
  DB_ACTION_ADD,
  DB_ACTION_DELETE,
  NOTIFICATION_TYPE_FOLLOW,
} from '../../lib/firebaseSdk';
import ActivityIndicator from '../../containers/ActivityIndicator';
import sharedStyles from '../Styles';
import I18n from '../../i18n';
import {GradientHeader} from '../../containers/GradientHeader';
import {navigateToProfile} from '../../utils/const';
import {VectorIcon} from '../../containers/VectorIcon';

const FollowView = props => {
  const navigation = useNavigation();
  const [state, setState] = useState({
    type: props.route.params?.type,
    account: props.route.params?.account,
    refreshing: false,
    loading: true,
    updating: false,
  });
  const [data, setData] = useState([]);
  const [text, setText] = useState('');

  const {theme, user, setUser} = props;
  const {type, refreshing, updating, account, loading} = state;

  const [isPostTab, setIsPostTab] = useState(type === 'followers');
  const [followersList, setFollowersList] = useState([]);
  const [followingsList, setFollowingsList] = useState([]);

  const isSelf = user.userId === account.userId;

  useEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'Hind Vadodara',
        color: themes[theme].activeTintColor,
        marginTop: 10,
      },
      title: I18n.t('back_to_profile'),
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginTop: 10,
          }}
          onPress={() => navigation.goBack()}>
          <VectorIcon
            size={20}
            name={'arrowleft'}
            type={'AntDesign'}
            color={themes[theme].activeTintColor}
            style={{marginLeft: 18}}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  useEffect(() => {
    getData(text);
  }, [isPostTab]);

  useEffect(() => {
    getData(text);
  }, [text, user]);

  const getData = useCallback(
    debounce(async searchText => {
      const userSnaps = await firestore()
        .collection(firebaseSdk.TBL_USER)
        .get();
      const postSnaps = await firestore()
        .collection(firebaseSdk.TBL_POST)
        .get();

      const users = [];
      const followers = [];
      const followings = [];
      const posts = [];

      postSnaps.forEach(p => posts.push({id: p.id, userId: p.data().userId}));
      userSnaps.forEach(s => {
        const userInfo = {...s.data(), id: s.id};
        const userPosts = posts.filter(p => p.userId === userInfo.userId);
        if (userInfo.userId !== user.userId) {
          users.push({...userInfo, postCount: userPosts.length});
        }

        if (isSelf) {
          if (user.followings.includes(userInfo.userId))
            followings.push({...userInfo, postCount: userPosts.length});
          if (user.followers.includes(userInfo.userId))
            followers.push({...userInfo, postCount: userPosts.length});
        } else {
          if (!isPostTab) {
            if (account.followings.includes(userInfo.userId)) {
              friends.push({...userInfo, postCount: userPosts.length});
            }
          } else {
            if (account.followers.includes(userInfo.userId)) {
              friends.push({...userInfo, postCount: userPosts.length});
            }
          }
        }
      });

      if (searchText.length > 0) {
        let data1 = followers.filter(d => {
          const key = d.displayName;
          return key.toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
        });
        setFollowersList(data1);

        let data2 = followings.filter(d => {
          const key = d.displayName;
          return key.toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
        });
        setFollowingsList(data2);

        setState({...state, loading: false, refreshing: false});
      } else {
        setFollowersList(followers);
        setFollowingsList(followings);

        setState({...state, loading: false, refreshing: false});
      }
    }, 200),
    [],
  );

  const onSearchChangeText = text => {
    setText(text);
    setState({...state, loading: false});
  };

  const onToggleFollow = (item, following) => {
    console.log('onToggleFollow started!!!');
    console.log('item ==> ', item);
    console.log('following ==> ', following);
    console.log('user ==> ', user);

    setState({...state, updating: true});
    firebaseSdk
      .updateFollows(
        user.id,
        item.id,
        following ? DB_ACTION_DELETE : DB_ACTION_ADD,
      )
      .then(({myFollowings}) => {
        if (!following) {
          const activity = {
            type: NOTIFICATION_TYPE_FOLLOW,
            sender: user.userId,
            receiver: item.userId,
            content: '',
            text: item.text,
            postId: null,
            title: item.displayName,
            message: I18n.t('user_follows_you', {
              name: user.displayName,
            }),
            date: new Date(),
          };
          firebaseSdk.addActivity(activity, item.token).then(r => {});
        }
        setUser({followings: myFollowings});
        setState({...state, updating: false});
      })
      .catch(err => {
        setState({...state, updating: false});
      });

    console.log('onToogleFollow finished!!!');
  };

  const renderItem = ({item}) => {
    let following = user.followings.includes(item.userId);
    // const isSelf = user.userId === item.userId;

    return (
      <TouchableOpacity
        onPress={() => {
          navigateToProfile(navigation, user, item);
        }}
        style={styles.itemContainer}>
        <View style={styles.itemHeader}>
          <Image
            source={item.avatar ? {uri: item.avatar} : images.default_avatar}
            style={[
              styles.itemImage,
              {borderWidth: 4, borderColor: 'solid rgba(43, 45, 46, 0.28)'},
            ]}
          />
          <View style={styles.itemContent}>
            <Text
              style={[styles.itemText, {color: themes[theme].activeTintColor}]}>
              {item.displayName}
            </Text>
            {/* <Text
              style={[styles.itemPost, {color: themes[theme].textColor}]}>{`${
              item.postCount
            } ${I18n.t('Posts').toLowerCase()}`}</Text> */}
            <Text style={[styles.itemPost, {color: themes[theme].textColor}]}>
              {item.company + ' ' + item.role}
            </Text>
          </View>
        </View>
        {isSelf && (
          <TouchableOpacity
            style={[
              styles.actionContainer,
              {
                backgroundColor: following
                  ? themes[theme].tintActive
                  : themes[theme].searchboxBackground,
              },
            ]}
            onPress={() => onToggleFollow(item, following)}
            disabled={!isPostTab}>
            <Text
              style={[
                styles.actionText,
                {
                  color: isPostTab ? COLOR_YELLOW : themes[theme].textColor,
                },
              ]}>
              {following ? I18n.t('Following') : I18n.t('Follow')}
            </Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  const renderFooter = () => {
    if (loading) {
      return <ActivityIndicator theme={theme} size={'large'} />;
    }
    return null;
  };

  const onRefresh = () => {
    setState({...state, refreshing: true});
    getData('');
  };

  return (
    <View
      style={[
        sharedStyles.container,
        {backgroundColor: themes[theme].navbarBackground},
      ]}>
      <SafeAreaView
        style={[
          sharedStyles.contentContainer,
          {
            backgroundColor: themes[theme].backgroundColor,
            paddingTop: 10,
            paddingHorizontal: 10,
          },
        ]}>
        <StatusBar />
        <View style={styles.tab}>
          <TouchableOpacity
            onPress={() => setIsPostTab(true)}
            style={[
              styles.tabItem,
              {
                borderBottomColor: !isPostTab
                  ? 'transparent'
                  : themes[theme].activeTintColor,
              },
            ]}>
            <Text
              style={[
                styles.tabItemText,
                {color: themes[theme].activeTintColor},
              ]}>
              {followersList.length + ' ' + I18n.t('followers_lower')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsPostTab(false)}
            style={[
              styles.tabItem,
              {
                borderBottomColor: isPostTab
                  ? 'transparent'
                  : themes[theme].activeTintColor,
              },
            ]}>
            <Text
              style={[
                styles.tabItemText,
                {color: themes[theme].activeTintColor},
              ]}>
              {followingsList.length + ' ' + I18n.t('followings_lower')}
            </Text>
          </TouchableOpacity>
        </View>
        {isSelf && (
          <SearchBox
            onChangeText={onSearchChangeText}
            testID="federation-view-search"
            clearTextType={true}
            placeholder={I18n.t('Search')}
          />
        )}
        {updating && (
          <ActivityIndicator absolute theme={theme} size={'large'} />
        )}
        <View style={styles.container}>
          {((isPostTab && followersList.length > 0) ||
            (!isPostTab && followingsList.length > 0)) && (
            <FlatList
              style={{height: '100%'}}
              data={isPostTab ? followersList : followingsList}
              renderItem={renderItem}
              keyExtractor={item => item.userId}
              ListFooterComponent={renderFooter}
              ItemSeparatorComponent={() => (
                <View style={sharedStyles.listSeparator} />
              )}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor={themes[theme].actionColor}
                />
              }
            />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

const mapStateToProps = state => ({
  user: state.login.user,
});

const mapDispatchToProps = dispatch => ({
  setUser: params => dispatch(setUserAction(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(FollowView));
