import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import {themes} from '../../constants/colors';
import StatusBar from '../../containers/StatusBar';
import {withTheme} from '../../theme';
import NoFriends from './NoFriends';
import ActivityIndicator from '../../containers/ActivityIndicator';
import * as HeaderButton from '../../containers/HeaderButton';
import MainScreen from '../../containers/MainScreen';
import firebaseSdk, {
  DB_ACTION_ADD,
  DB_ACTION_DELETE,
  DB_ACTION_UPDATE,
  NOTIFICATION_TYPE_LIKE,
} from '../../lib/firebaseSdk';
import Post from './Post';
import {withActionSheet} from '../../containers/ActionSheet';
import {showErrorAlert, showToast} from '../../lib/info';
import I18n from '../../i18n';
import {setUser as setUserAction} from '../../actions/login';
import images from '../../assets/images';
import styles from './styles';
import {navigateToProfile, onSharePost} from '../../utils/const';

const PostView = props => {
  const navigation = useNavigation();
  const tabbarHeight = useBottomTabBarHeight();
  const [state, setState] = useState({
    text: '',
    data: [],
    postUsers: [],
    showModal: false,
    showAddModal: false,
    editMeetup: null,
    reviewMeetup: null,
    refreshing: false,
    loading: false,
    notifying: false,
    isUpdating: false,
  });

  const {user, theme, setUser} = props;
  const {data, loading, isUpdating, refreshing, postUsers} = state;

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButton.Drawer
          navigation={navigation}
          testID="rooms-list-view-sidebar"
          theme={theme}
        />
      ),
      title: I18n.t('Posts'),
      headerRight: () => (
        <HeaderButton.Search
          title="menu"
          navigation={navigation}
          testID="rooms-list-view-create-channel"
          theme={theme}
        />
      ),
      headerBackground: () => <View />,
      headerTitleStyle: {
        color: themes[theme].activeTintColor,
      },
    });
  }, [theme]);

  useEffect(() => {
    init();
  }, [user]);

  const init = async () => {
    const postUsers = [];
    const postSubscribe = await firestore().collection(firebaseSdk.TBL_POST);
    postSubscribe.onSnapshot(async querySnapShot => {
      const userSnaps = await firestore()
        .collection(firebaseSdk.TBL_USER)
        .get();
      const users = [];
      userSnaps.forEach(s => users.push(s.data()));

      const list = [];
      querySnapShot.forEach(doc => {
        const post = doc.data();
        if (!user.blocked || !user.blocked.includes(post.userId)) {
          const owner = users.find(u => u.userId === post.userId);
          if (!postUsers.find(postUser => postUser.userId === owner.userId)) {
            postUsers.push(owner);
          }
          list.push({id: doc.id, ...post, owner});
        }
      });
      list.sort((a, b) => b.date - a.date);
      setState({...state, data: list, refreshing: false, postUsers: postUsers});
      // console.log('list', list, users);
    });
  };

  const onOpenPost = item => {
    navigation.push('PostDetail', {post: item});
  };

  const onOpenProfile = item => {
    if (item.userId === user.userId) {
      navigation.navigate('Profile');
    } else {
      navigateToProfile(navigation, user, item);
    }
  };

  const onToggleLike = (item, isLiking) => {
    let update = {};
    if (isLiking) {
      update = {id: item.id, likes: item.likes.filter(l => l !== user.userId)};
    } else {
      update = {id: item.id, likes: [...item.likes, user.userId]};
    }

    setState({...state, isUpdating: true});
    firebaseSdk
      .setData(firebaseSdk.TBL_POST, DB_ACTION_UPDATE, update)
      .then(() => {
        if (!isLiking && item.owner.userId !== user.userId) {
          const postImage =
            item.type === 'video'
              ? item.thumbnail
              : item.type === 'photo'
              ? item.photo
              : '';
          const activity = {
            type: NOTIFICATION_TYPE_LIKE,
            sender: user.userId,
            receiver: item.owner.userId,
            content: '',
            text: item.text,
            postId: item.id,
            postImage,
            postType: item.type,
            title: item.owner.displayName,
            message: I18n.t('likes_your_post', {name: user.displayName}),
            date: new Date(),
          };
          firebaseSdk.addActivity(activity, item.owner.token).then(r => {});
        }
      })
      .catch(() => {
        setState({...state, isUpdating: false});
      });
  };

  const onActionPost = item => {
    const onReport = () => {
      const report = {
        userId: user.userId,
        postId: item.id,
        ownerId: item.owner.userId,
        createdAt: new Date(),
      };

      setState({...state, isUpdating: true});
      firebaseSdk
        .setData(firebaseSdk.TBL_REPORTS, DB_ACTION_ADD, report)
        .then(() => {
          setState({...state, isUpdating: false});
          showToast(I18n.t('Report_post_complete'));
        })
        .catch(err => {
          showErrorAlert(I18n.t('Report_post_failed'), I18n.t('Oops'));
          setState({...state, isUpdating: false});
        });
    };

    const onBlock = () => {
      const account = item.owner;
      const blocked = user.blocked ?? [];
      const update = {id: user.id, blocked: [...blocked, account.userId]};

      setState({...state, isUpdating: true});
      firebaseSdk
        .setData(firebaseSdk.TBL_USER, DB_ACTION_UPDATE, update)
        .then(() => {
          setUser({blocked: update.blocked});
          showToast(I18n.t('Block_user_complete'));
          setState({...state, isUpdating: false});
          init();
        })
        .catch(err => {
          showErrorAlert(I18n.t('Block_user_failed'), I18n.t('Oops'));
          setState({...state, isUpdating: false});
        });
    };

    // Actions
    const options = [
      {
        title: I18n.t('Report_post'),
        onPress: onReport,
      },
      {
        title: I18n.t('Block_user'),
        // danger: true,
        onPress: onBlock,
      },
    ];

    const onEdit = () => {
      navigation.push('EditPost', {postId: item.id});
    };

    const onRemove = () => {
      setState({...state, isUpdating: true});
      firebaseSdk
        .setData(firebaseSdk.TBL_POST, DB_ACTION_DELETE, {id: item.id})
        .then(() => {
          showToast(I18n.t('Remove_post_complete'));
          setState({...state, isUpdating: false});
        })
        .catch(err => {
          showErrorAlert(I18n.t('Remove_post_failed'), I18n.t('Oops'));
          setState({...state, isUpdating: false});
        });
    };

    const ownerOptions = [
      {
        title: I18n.t('edit_post'),
        onPress: onEdit,
      },
      {
        title: I18n.t('Remove'),
        // danger: true,
        onPress: onRemove,
      },
    ];

    const isOwner = item.owner.userId === user.userId;
    return {options: isOwner ? ownerOptions : options};
    // showActionSheet({ options: isOwner ? ownerOptions : options });
  };

  const renderFooter = () => {
    if (loading) {
      return <ActivityIndicator theme={theme} size={'large'} />;
    }
    return null;
  };

  const onRefresh = () => {
    setState({...state, refreshing: true});
    init();
  };

  return (
    <MainScreen navigation={navigation}>
      <StatusBar />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 5,
        }}>
        <HeaderButton.Drawer
          navigation={navigation}
          testID="rooms-list-view-sidebar"
          theme={theme}
        />
        <Text
          style={{
            fontSize: 17,
            fontWeight: 'bold',
            color: themes[theme].activeTintColor,
          }}>
          {I18n.t('Posts')}
        </Text>
        <HeaderButton.Search
          title="menu"
          navigation={navigation}
          testID="rooms-list-view-create-channel"
          theme={theme}
        />
      </View>
      {isUpdating && (
        <ActivityIndicator absolute theme={theme} size={'large'} />
      )}
      <View>
        {postUsers.length > 0 || !loading ? (
          <ScrollView horizontal contentContainerStyle={styles.postUserList}>
            {postUsers.map(user => {
              return (
                <TouchableOpacity
                  onPress={() => onOpenProfile(user)}
                  style={{width: 70, marginRight: 20}}>
                  <View style={styles.postUser}>
                    <Image
                      source={
                        user?.avatar
                          ? {uri: user.avatar}
                          : images.default_avatar
                      }
                      style={styles.postUserAvatar}
                    />
                  </View>
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.postUserName,
                      {color: themes[theme].activeTintColor},
                    ]}>
                    {user?.displayName}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : null}
      </View>
      {data.length > 0 || loading ? (
        <FlatList
          style={{flexGrow: 1}}
          data={data}
          renderItem={({item, index}) => (
            <Post
              key={index}
              item={item}
              onPress={() => onOpenPost(item)}
              onPressUser={() => onOpenProfile(item)}
              onPressShare={() => onSharePost(item)}
              onLike={isLiking => onToggleLike(item, isLiking)}
              isLiking={item.likes && item.likes.includes(user.userId)}
              onActions={onActionPost(item)}
              theme={theme}
              style={{
                marginBottom:
                  index === data.length - 1 ? tabbarHeight : undefined,
              }}
            />
          )}
          keyExtractor={item => item.id}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={themes[theme].actionColor}
            />
          }
          contentContainerStyle={{paddingBottom: 20}}
        />
      ) : (
        <NoFriends onPress={() => {}} />
      )}
    </MainScreen>
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
)(withActionSheet(withTheme(PostView)));
