import React, {useState, useEffect} from 'react';
import {
  HEADER_BAR_END,
  HEADER_BAR_START,
  COLOR_YELLOW,
  COLOR_GRAY_DARK,
  COLOR_LIGHT_DARK,
  COLOR_BTN_BACKGROUND,
  themes,
} from '../../constants/colors';
import StatusBar from '../../containers/StatusBar';
import {withTheme} from '../../theme';
import {
  Image,
  SafeAreaView,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Share,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {connect} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import {chunk} from 'lodash';

import images from '../../assets/images';
import styles from './styles';
import {setUser as setUserAction} from '../../actions/login';
import ActivityIndicator from '../../containers/ActivityIndicator';
import {isValidURL} from '../../utils/validators';
import firebaseSdk, {
  DB_ACTION_ADD,
  DB_ACTION_DELETE,
  DB_ACTION_UPDATE,
  NOTIFICATION_TYPE_FOLLOW,
  NOTIFICATION_TYPE_LIKE,
} from '../../lib/firebaseSdk';
import {showErrorAlert, showToast} from '../../lib/info';
import {withActionSheet} from '../../containers/ActionSheet';
import {VectorIcon} from '../../containers/VectorIcon';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import I18n from '../../i18n';
import PostText from '../ProfileView/PostText';
import {
  POST_TYPE_PHOTO,
  POST_TYPE_TEXT,
  POST_TYPE_VIDEO,
} from '../../constants/app';
import PopupMenu from '../../containers/PopupMenu';
import {getUserRepresentString, onSharePost} from '../../utils/const';

const OtherProfileView = props => {
  const {navigation, user, theme} = props;
  const userId = props.route.params?.userId;
  const [state, setState] = useState({
    account: {
      userId: userId,
    },
    posts: [],
    isLoading: true,
    updating: false,
    refreshing: false,
  });
  const [isPostTab, setIsPostTab] = useState(true);

  const {account, posts, image_path, isLoading} = state;
  let unSubscribePost = '';

  useEffect(() => {
    init();
  }, []);

  const setSafeState = states => {
    setState({...state, ...states});
  };

  const init = () => {
    const {navigation} = props;
    firebaseSdk
      .getUser(state.account.userId)
      .then(user => {
        const userPostSubscribe = firestore()
          .collection(firebaseSdk.TBL_POST)
          .where('userId', '==', state.account.userId);
        unSubscribePost = userPostSubscribe.onSnapshot(querySnap => {
          let posts = [];
          if (querySnap) {
            querySnap.forEach(doc => {
              posts.push({id: doc.id, ...doc.data(), owner: user});
            });
            posts.sort((a, b) => b.date - a.date);
            setSafeState({account: user, isLoading: false, posts});
          }
        });
      })
      .catch(err => {
        setSafeState({isLoading: false});
        showErrorAlert(I18n.t('user_not_found'), '', () => navigation.pop());
      });

    console.log(state.posts);
  };

  const openLink = url => {
    if (url && url.length > 0 && isValidURL(url)) {
      Linking.openURL(url);
    }
  };

  const onToggleFollow = following => {
    const {user, setUser} = props;
    const {account} = state;

    setState({...state, loading: true});
    firebaseSdk
      .updateFollows(
        user.id,
        account.id,
        following ? DB_ACTION_DELETE : DB_ACTION_ADD,
      )
      .then(({myFollowings, userFollowers}) => {
        if (!following) {
          const activity = {
            type: NOTIFICATION_TYPE_FOLLOW,
            sender: user.userId,
            receiver: account.userId,
            content: '',
            postId: null,
            title: account.displayName,
            message: `${user.displayName} ${I18n.t('follow_you')}.`,
            date: new Date(),
          };
          firebaseSdk.addActivity(activity, account.token).then(r => {
            console.log(r);
          });
        }
        setUser({followings: myFollowings});
        const newAccount = {...account, followers: userFollowers};
        setState({...state, loading: false, account: newAccount});
      })
      .catch(err => {
        setState({...state, loading: false});
      });
  };

  const sendMessage = async () => {
    const {user, navigation} = props;
    const {account} = state;
    const roomSnaps = await firestore().collection(firebaseSdk.TBL_ROOM).get();
    let room = null;
    roomSnaps.forEach(doc => {
      const roomInfo = doc.data();
      if (
        (user.userId === roomInfo.sender &&
          account.userId === roomInfo.receiver) ||
        (user.userId === roomInfo.receiver &&
          account.userId === roomInfo.sender)
      ) {
        room = {id: doc.id, ...roomInfo, account};
      }
    });

    if (!room) {
      room = {
        sender: user.userId,
        receiver: account.userId,
        date: new Date(),
        lastMessage: '',
        confirmUser: '',
        unReads: 0,
      };
      const roomDocRef = await firestore()
        .collection(firebaseSdk.TBL_ROOM)
        .add(room);
      const roomDoc = await roomDocRef.get();
      return navigation.navigate('Chat', {
        room: {id: roomDoc.id, ...roomDoc.data(), account},
      });
    }
    navigation.navigate('Chat', {room});
  };

  const goToFollowers = async () => {
    const {navigation} = props;
    navigation.push('Follow', {
      type: 'followers',
      account: state.account,
    });
  };

  const goToFollowings = async () => {
    const {navigation} = props;
    navigation.push('Follow', {
      type: 'followings',
      account: state.account,
    });
  };

  const goToPosts = () => {};

  const onOpenPost = item => {
    props.navigation.push('PostDetail', {post: item});
  };

  const onToggleLike = (item, isLiking) => {
    const {user} = props;

    let update = {};
    if (isLiking) {
      update = {id: item.id, likes: item.likes.filter(l => l !== user.userId)};
    } else {
      update = {id: item.id, likes: [...item.likes, user.userId]};
    }

    setState({...state, isLoading: true});
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
            message: `${user.displayName} likes your post.`,
            date: new Date(),
          };
          firebaseSdk.addActivity(activity, item.owner.token).then(r => {});
        }
      })
      .catch(() => {
        setState({...state, isLoading: false});
      });
  };

  const onActionPost = item => {
    const onReport = () => {
      const {user} = props;
      const {account} = state;
      const report = {
        userId: user.userId,
        postId: item ? item.id : null,
        ownerId: account.userId,
        createdAt: new Date(),
      };

      setState({...state, isLoading: true});
      firebaseSdk
        .setData(firebaseSdk.TBL_REPORTS, DB_ACTION_ADD, report)
        .then(() => {
          showToast(
            item
              ? I18n.t('Report_post_complete')
              : I18n.t('Report_user_complete'),
          );
          setState({...state, isLoading: false});
        })
        .catch(err => {
          showErrorAlert(
            item ? I18n.t('Report_post_failed') : I18n.t('Report_user_failed'),
            I18n.t('Oops'),
          );
          setState({...state, isLoading: false});
        });
    };

    const onBlock = () => {
      const {account} = state;
      const {user, setUser} = props;
      let blocked = user.blocked ?? [];
      let update = {id: user.id, blocked: [...blocked, account.userId]};

      setState({...state, isLoading: true});
      firebaseSdk
        .setData(firebaseSdk.TBL_USER, DB_ACTION_UPDATE, update)
        .then(() => {
          setUser({blocked: update.blocked});
          showToast(I18n.t('Block_user_complete'));
          setState({...state, isLoading: false});
          props.navigation.pop();
        })
        .catch(err => {
          showErrorAlert(I18n.t('Block_user_failed'), I18n.t('Oops'));
          setState({...state, isLoading: false});
        });
    };

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
    return {options};
  };

  const following = user && user.followings.includes(account.userId);

  return (
    <View style={{flex: 1}}>
      <StatusBar />
      <SafeAreaView style={styles.topRightButtons}>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => navigation.goBack()}>
          <VectorIcon
            size={20}
            name={'arrowleft'}
            type={'AntDesign'}
            color={themes[theme].activeTintColor}
            style={{marginLeft: 18}}
          />
          <Text style={{color: themes[theme].activeTintColor, marginLeft: 5}}>
            {I18n.t('back_to_page')}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
      <ScrollView {...scrollPersistTaps}>
        {/* Display Avatar Detail */}
        <View
          style={[
            styles.avatarContainer,
            {backgroundColor: themes[theme].backgroundColor},
          ]}>
          <Image
            source={
              account.avatar ? {uri: account.avatar} : images.default_avatar
            }
            style={styles.avatar}
          />
          <View style={{marginLeft: 25}}>
            <Text
              style={[
                styles.avatarName,
                {color: themes[theme].activeTintColor},
              ]}>
              {account.displayName}
            </Text>
            <Text style={[styles.avatarjob, {color: themes[theme].textColor}]}>
              {account.company}
            </Text>
            <Text style={[styles.avatarjob, {color: themes[theme].textColor}]}>
              {account.role}
            </Text>
            <Text style={[styles.avatarwebsite, {color: COLOR_YELLOW}]}>
              {account.website}
            </Text>
          </View>
        </View>
        {/* Display Posts/Followings/Followers items, Following/Chat, Posts/Media */}
        <View
          style={[
            styles.mainContent,
            {backgroundColor: themes[theme].backgroundColor},
          ]}>
          {/* Posts/Followings/Followers */}
          <View style={styles.followWrap}>
            <View
              // onPress={() => goToPosts()}
              style={styles.optionContainer}>
              <Text
                style={[
                  styles.optionValue,
                  {color: themes[theme].activeTintColor},
                ]}>
                {account.followings?.length ?? 0}
              </Text>
              <Text style={[styles.optionTitle, {color: COLOR_GRAY_DARK}]}>
                {I18n.t('Posts')}
              </Text>
            </View>
            <View
              // onPress={() => goToFollowings()}
              style={styles.optionContainer}>
              <Text
                style={[
                  styles.optionValue,
                  {color: themes[theme].activeTintColor},
                ]}>
                {account.followings?.length ?? 0}
              </Text>
              <Text style={[styles.optionTitle, {color: COLOR_GRAY_DARK}]}>
                {I18n.t('Followings')}
              </Text>
            </View>
            <View
              // onPress={() => goToFollowers()}
              style={[styles.optionContainer]}>
              <Text
                style={[
                  styles.optionValue,
                  {color: themes[theme].activeTintColor},
                ]}>
                {account.followers?.length ?? 0}
              </Text>
              <Text style={[styles.optionTitle, {color: COLOR_GRAY_DARK}]}>
                {I18n.t('Followers')}
              </Text>
            </View>
          </View>
          {/* Following/Chat */}
          <View
            style={[
              styles.buttonWrap,
              {borderColor: themes[theme].borderColor},
            ]}>
            {!following ? (
              <TouchableOpacity
                onPress={() => onToggleFollow(following)}
                style={[
                  styles.followButton,
                  {borderColor: themes[theme].borderColor},
                ]}>
                <Text
                  style={[styles.followText, {color: themes[theme].textColor}]}>
                  {I18n.t('Follow')}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => onToggleFollow(following)}
                style={[
                  styles.followButton,
                  {
                    backgroundColor: themes[theme].backgroundColor,
                    borderColor: themes[theme].borderColor,
                  },
                ]}>
                <Text
                  style={[
                    styles.followText,
                    {
                      color: themes[theme].activeTintColor,
                    },
                  ]}>
                  {I18n.t('Following')}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={sendMessage}
              style={[styles.messageButton]}>
              <VectorIcon
                size={28}
                name={'chatbubble-ellipses-outline'}
                type={'Ionicons'}
                color={COLOR_LIGHT_DARK}
                style={{marginLeft: 16}}
              />
            </TouchableOpacity>
          </View>
          {/* Post - Media Tabs */}
          <View style={styles.tabContainer}>
            <View
              style={[
                styles.tab,
                {backgroundColor: themes[theme].buttonBackground},
              ]}>
              <TouchableOpacity
                onPress={() => setIsPostTab(true)}
                style={[
                  styles.tabItem,
                  {
                    backgroundColor: isPostTab
                      ? COLOR_BTN_BACKGROUND
                      : 'transparent',
                  },
                ]}>
                <Text
                  style={[
                    styles.tabItemText,
                    {color: themes[theme].activeTintColor},
                  ]}>
                  {I18n.t('Posts')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsPostTab(false)}
                style={[
                  styles.tabItem,
                  {
                    backgroundColor: !isPostTab
                      ? COLOR_BTN_BACKGROUND
                      : 'transparent',
                  },
                ]}>
                <Text
                  style={[
                    styles.tabItemText,
                    {color: themes[theme].activeTintColor},
                  ]}>
                  {I18n.t('media')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {isPostTab ? (
            posts.map(p => {
              if (p.type === POST_TYPE_TEXT)
                return (
                  <PostText
                    key={p.id}
                    item={p}
                    onPress={() => onOpenPost(p)}
                    onPressUser={() => {}}
                    onPressShare={() => onSharePost(p)}
                    onLike={isLiking => onToggleLike(p, isLiking)}
                    isLiking={p.likes && p.likes.includes(user.userId)}
                    onActions={onActionPost(p)}
                    theme={theme}
                  />
                );
            })
          ) : (
            <View
              style={{
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                backgroundColor: themes[theme].postBackground,
                shadowColor: 'black',
                shadowOpacity: 0.2,
                shadowOffset: {x: 2, y: 2},
                elevation: 2,
                padding: 5,
              }}>
              {chunk(
                posts.filter(
                  p => p.type === POST_TYPE_PHOTO || p.type === POST_TYPE_VIDEO,
                ),
                3,
              ).map((p, index) => {
                if (index % 4 === 0)
                  return (
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity onPress={() => onOpenPost(p[0])}>
                        <Image
                          source={{uri: p[0]?.photo || p[0]?.thumbnail}}
                          style={[
                            styles.tile1,
                            index === 0 && {borderTopLeftRadius: 50},
                          ]}
                        />
                      </TouchableOpacity>
                      <View>
                        <TouchableOpacity onPress={() => onOpenPost(p[1])}>
                          <Image
                            source={{uri: p[1]?.photo || p[1]?.thumbnail}}
                            style={[
                              styles.tile2,
                              index === 0 && {borderTopRightRadius: 50},
                            ]}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onOpenPost(p[2])}>
                          <Image
                            source={{uri: p[2]?.photo || p[2]?.thumbnail}}
                            style={styles.tile2}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                if (index % 4 === 1 || index % 4 === 3)
                  return (
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity onPress={() => onOpenPost(p[0])}>
                        <Image
                          source={{uri: p[0]?.photo || p[0]?.thumbnail}}
                          style={styles.tile3}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => onOpenPost(p[1])}>
                        <Image
                          source={{uri: p[1]?.photo || p[1]?.thumbnail}}
                          style={styles.tile3}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => onOpenPost(p[2])}>
                        <Image
                          source={{uri: p[2]?.photo || p[2]?.thumbnail}}
                          style={styles.tile3}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                if (index % 4 === 2)
                  return (
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        <TouchableOpacity onPress={() => onOpenPost(p[0])}>
                          <Image
                            source={{uri: p[0]?.photo || p[0]?.thumbnail}}
                            style={styles.tile2}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onOpenPost(p[1])}>
                          <Image
                            source={{uri: p[1]?.photo || p[1]?.thumbnail}}
                            style={styles.tile2}
                          />
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity onPress={() => onOpenPost(p[2])}>
                        <Image
                          source={{uri: p[2]?.photo || p[2]?.thumbnail}}
                          style={styles.tile1}
                        />
                      </TouchableOpacity>
                    </View>
                  );
              })}
            </View>
          )}
        </View>
      </ScrollView>
      {isLoading ? (
        <ActivityIndicator absolute size="large" theme={theme} />
      ) : null}
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
)(withActionSheet(withTheme(OtherProfileView)));
