import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Share,
  ScrollView,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/native';
// Geo
// import ScrollView from 'react-native-nested-scroll-view';

import {withTheme} from '../../theme';
import KeyboardView from '../../containers/KeyboardView';
import sharedStyles from '../Styles';
import StatusBar from '../../containers/StatusBar';
import styles from './styles';
import images from '../../assets/images';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import SafeAreaView from '../../containers/SafeAreaView';
import {setUser as setUserAction} from '../../actions/login';
import CsTextInput from '../../containers/CsTextInput';
import ActivityIndicator from '../../containers/ActivityIndicator';
import {
  POST_TYPE_PHOTO,
  POST_TYPE_TEXT,
  POST_TYPE_VIDEO,
} from '../../constants/app';
import firebaseSdk, {
  DB_ACTION_ADD,
  DB_ACTION_DELETE,
  DB_ACTION_UPDATE,
  NOTIFICATION_TYPE_COMMENT,
  NOTIFICATION_TYPE_LIKE,
} from '../../lib/firebaseSdk';
import {themes, COLOR_GRAY_DARK, COLOR_WHITE} from '../../constants/colors';
import {VectorIcon} from '../../containers/VectorIcon';
import {dateStringFromNow, dateToString} from '../../utils/datetime';
import I18n from '../../i18n';
import PopupMenu from '../../containers/PopupMenu';
import {showErrorAlert, showToast} from '../../lib/info';
import {getUserRepresentString, onSharePost} from '../../utils/const';

import {dateStringFromNowShort} from '../../utils/datetime';

const PostDetailView = props => {
  const navigation = useNavigation();
  const postData = props.route.params?.post;
  const [text, setText] = useState('');
  const [state, setState] = useState({
    post: postData,
    thumbnail: null,
    playing: false,
    comment: '',
    initializing: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [inputMode, setInputMode] = useState(false);
  const [photoMode, setPhotoMode] = useState(false);
  const textInput = useRef(null);
  const {user, theme} = props;
  const {post, comment, playing, initializing} = state;

  const [curComment, setCurComment] = useState('');

  const [shareUser1, setShareUser1] = useState('');
  const [shareUser2, setShareUser2] = useState('');

  useEffect(() => {
    init(post.id);
    initShareUsers();
  }, []);

  const initShareUsers = async () => {
    let shares = post.shares;
    if (shares && shares.length >= 1) {
      await firebaseSdk
        .getUser(shares[0])
        .then(user => {
          setShareUser1(user.avatar);
        })
        .catch(err => {
          setShareUser1('');
        });

      if (shares.length >= 2) {
        await firebaseSdk
          .getUser(shares[1])
          .then(user => {
            setShareUser2(user.avatar);
          })
          .catch(err => {
            setShareUser2('');
          });
      }
    }
  };

  const setSafeState = states => {
    setState({...state, ...states});
  };
  const init = async id => {
    let postSubscribe = await firestore()
      .collection(firebaseSdk.TBL_POST)
      .doc(id);
    postSubscribe.onSnapshot(async querySnapShot => {
      const userSnaps = await firestore()
        .collection(firebaseSdk.TBL_USER)
        .get();
      const users = [];
      userSnaps.forEach(s => users.push(s.data()));
      const data = querySnapShot.data();

      const owner = users.find(u => u.userId === data.userId);
      const likes_accounts = data.likes.map(l => {
        const like_user = users.find(u => u.userId === l);
        return {userId: l, avatar: like_user?.avatar};
      });
      const comment_accounts = data.comments
        .map(c => {
          const comment_user = users.find(u => u.userId === c.userId);
          return {
            ...c,
            avatar: comment_user?.avatar,
            displayName: comment_user.displayName,
            handle: comment_user.handle,
          };
        })
        .sort((b, a) => a.date.seconds - b.date.seconds);
      const post = {
        id: querySnapShot.id,
        ...data,
        owner,
        likes_accounts,
        comment_accounts,
      };

      setSafeState({post, initializing: false});
    });
  };

  const isValid = str => {
    if (!str.trim().length) {
      return false;
    }
    return true;
  };

  const toggleLikes = isLiking => {
    let update = {};
    if (isLiking) {
      update = {id: post.id, likes: post.likes.filter(l => l !== user.userId)};
    } else {
      update = {id: post.id, likes: [...post.likes, user.userId]};
    }

    setIsLoading(true);
    firebaseSdk
      .setData(firebaseSdk.TBL_POST, DB_ACTION_UPDATE, update)
      .then(() => {
        if (!isLiking && post.owner.userId !== user.userId) {
          const postImage =
            post.type === 'video'
              ? post.thumbnail
              : post.type === 'photo'
              ? post.photo
              : '';
          const activity = {
            type: NOTIFICATION_TYPE_LIKE,
            sender: user.userId,
            receiver: post.owner.userId,
            content: '',
            text: post.text,
            postId: post.id,
            postImage,
            postType: post.type,
            title: post.owner.displayName,
            message: I18n.t('likes_your_post', {name: user.displayName}),
            date: new Date(),
          };
          firebaseSdk.addActivity(activity, post.owner.token).then(r => {});
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const onComment = cm => {
    let str = comment;
    if (cm) {
      str = cm;
    }
    if (isValid(str)) {
      let update = {
        id: post.id,
        comments: [
          ...post.comments,
          {userId: user.userId, text: str.trim(), date: new Date()},
        ],
      };

      setIsLoading(true);
      textInput.current.blur();
      firebaseSdk
        .setData(firebaseSdk.TBL_POST, DB_ACTION_UPDATE, update)
        .then(() => {
          if (post.owner.userId !== user.userId) {
            const postImage =
              post.type === 'video'
                ? post.thumbnail
                : post.type === 'photo'
                ? post.photo
                : '';
            const activity = {
              type: NOTIFICATION_TYPE_COMMENT,
              sender: user.userId,
              receiver: post.owner.userId,
              content: str.trim(),
              text: post.text,
              postId: post.id,
              postImage,
              postType: post.type,
              title: post.owner.displayName,
              message: I18n.t('commented_in_your_post', {
                name: user.displayName,
              }),
              date: new Date(),
            };
            firebaseSdk.addActivity(activity, post.owner.token).then(r => {});
          }
          textInput.current.clear();
          // setState({ ...state, comment: '', isLoading: false });
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  };

  if (initializing) {
    if (theme === 'light') {
      return (
        <ImageBackground
          style={sharedStyles.container}
          source={images.bg_splash_onboard}>
          <StatusBar />
          <ActivityIndicator absolute theme={theme} size={'large'} />
        </ImageBackground>
      );
    }
    return (
      <View style={sharedStyles.container}>
        <StatusBar />
        <ActivityIndicator absolute theme={theme} size={'large'} />
      </View>
    );
  }

  const onAction = item => {
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
          navigation.goBack();
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
  };

  const onSubmitComment = () => {
    let update = {
      id: post.id,
      comments: [
        ...post.comments,
        {userId: user.userId, text: curComment.trim(), date: new Date()},
      ],
    };

    setIsLoading(true);
    firebaseSdk
      .setData(firebaseSdk.TBL_POST, DB_ACTION_UPDATE, update)
      .then(() => {
        if (post.owner.userId !== user.userId) {
          const postImage =
            post.type === 'video'
              ? post.thumbnail
              : post.type === 'photo'
              ? post.photo
              : '';
          const activity = {
            type: NOTIFICATION_TYPE_COMMENT,
            sender: user.userId,
            receiver: post.owner.userId,
            content: str.trim(),
            text: post.text,
            postId: post.id,
            postImage,
            postType: post.type,
            title: post.owner.displayName,
            message: I18n.t('commented_in_your_post', {
              name: user.displayName,
            }),
            date: new Date(),
          };
          firebaseSdk.addActivity(activity, post.owner.token).then(r => {});
        }
        showToast(I18n.t('add_comment_success'));
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const isLiking = post.likes && post.likes.includes(user.userId);
  return (
    <View style={sharedStyles.container}>
      <StatusBar />
      <KeyboardView
        contentContainerStyle={[
          sharedStyles.contentContainer,
          {
            backgroundColor: themes[theme].backgroundColor,
            height: '100%',
          },
        ]}
        keyboardVerticalOffset={128}>
        {/* Header Navigate Bar */}
        <View
          style={{
            height: 40,
            borderBottomWidth: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 15,
            borderBottomColor: themes[theme].borderColor,
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              paddingVertical: 8,
            }}>
            <Image
              style={{
                width: 18,
                height: 14,
                tintColor: themes[theme].activeTintColor,
              }}
              source={images.nav_back}
            />
            <Text
              style={[
                styles.profileName,
                {
                  color: themes[theme].activeTintColor,
                  fontSize: 14,
                  marginLeft: 10,
                },
              ]}>
              {/* {I18n.t(post.type)} */}
              {I18n.t('back_to_home')}
            </Text>
          </TouchableOpacity>
        </View>
        {isLoading && (
          <ActivityIndicator absolute theme={theme} size={'large'} />
        )}
        <ScrollView>
          <View style={styles.container} {...scrollPersistTaps}>
            <View style={styles.owner}>
              <View style={styles.avatarContainer}>
                <Image
                  source={
                    post.owner.avatar
                      ? {uri: post.owner.avatar}
                      : images.default_avatar
                  }
                  style={styles.avatar}
                />
              </View>
              <View style={styles.profileInfo}>
                <Text
                  style={[
                    styles.profileName,
                    {color: themes[theme].activeTintColor},
                  ]}>
                  {post.owner.displayName}
                </Text>
                <Text
                  style={{
                    color: themes[theme].normalTextColor,
                    fontSize: 12,
                    marginTop: 3,
                  }}>
                  {post?.date ? dateStringFromNowShort(post?.date) : null}
                </Text>
              </View>
              <PopupMenu
                theme={theme}
                options={onAction(post).options}
                renderTrigger={() => (
                  <VectorIcon
                    type="Feather"
                    name="more-horizontal"
                    size={18}
                    color={themes[theme].activeTintColor}
                  />
                )}
              />
            </View>
            <View style={styles.content}>
              {post.type === POST_TYPE_TEXT && (
                <Text
                  style={[
                    styles.titleText,
                    {color: themes[theme].normalTextColor},
                  ]}>
                  {post.text}
                </Text>
              )}
              {post.type === POST_TYPE_PHOTO && (
                <>
                  <Text
                    style={[
                      styles.titleText,
                      {color: themes[theme].normalTextColor},
                    ]}>
                    {post.text}
                  </Text>
                  <TouchableOpacity
                    style={{
                      borderRadius: 20,
                      overflow: 'hidden',
                      backgroundColor: themes[theme].modalBackground,
                    }}
                    onPress={() => setPhotoMode(true)}>
                    <Image
                      source={{uri: post.photo}}
                      style={styles.photoImage}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                </>
              )}
              {post.type === POST_TYPE_VIDEO && (
                <>
                  <Text
                    style={[
                      styles.titleText,
                      {color: themes[theme].titleText},
                    ]}>
                    {post.text}
                  </Text>
                  {playing ? (
                    <Video
                      source={{uri: post.video}}
                      style={styles.video}
                      controls
                      onEnd={() => setState({...state, playing: false})}
                      resizeMode={'contain'}
                    />
                  ) : (
                    <View
                      style={[styles.thumbnailContainer, {borderRadius: 20}]}>
                      <Image
                        source={{uri: post.thumbnail}}
                        style={styles.thumbnail}
                        resizeMode={'contain'}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          if (playing) {
                            // onPress();
                          } else {
                            setState({...state, playing: true});
                          }
                        }}
                        style={[styles.playIcon, {position: 'absolute'}]}>
                        <VectorIcon
                          name="playcircleo"
                          type={'AntDesign'}
                          size={72}
                          color={'white'}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              )}
            </View>
            <View
              style={[
                styles.separator,
                {backgroundColor: themes[theme].separatorColor},
              ]}
            />
            {/* Post Toolkit */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 40,
                paddingHorizontal: 10,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => toggleLikes(isLiking)}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={images.heart}
                    style={[styles.miniIcon, {opacity: isLiking ? 0.5 : 1}]}
                  />
                  <Text
                    style={[styles.count, {color: themes[theme].titleColor}]}>
                    {post.likes && post.likes.length > 0
                      ? post.likes.length
                      : null}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  // onPress={onPress}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={images.chat}
                    style={[styles.miniIcon, {opacity: 0.5}]}
                  />
                  <Text
                    style={[styles.count, {color: themes[theme].titleColor}]}>
                    {post.comments && post.comments.length > 0
                      ? post.comments.length
                      : null}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.shareContainer}>
                {post.shares && post.shares.length >= 2 ? (
                  <View style={styles.sharedUserBox}>
                    <View
                      style={[
                        styles.shareCouBack,
                        styles.shareCouBack1,
                        {
                          borderWidth: 1,
                          borderColor: COLOR_WHITE,
                        },
                      ]}>
                      <Image
                        source={
                          !shareUser2 || shareUser2 === ''
                            ? images.default_avatar
                            : {uri: shareUser2}
                        }
                        style={[styles.sharedAvatar]}
                      />
                    </View>
                    <View
                      style={[
                        styles.shareCouBack,
                        styles.shareCouBack2,
                        {
                          borderWidth: 1,
                          borderColor: COLOR_WHITE,
                        },
                      ]}>
                      <Image
                        source={
                          !shareUser1 || shareUser1 === ''
                            ? images.default_avatar
                            : {uri: shareUser1}
                        }
                        style={[styles.sharedAvatar]}
                      />
                    </View>
                    <View
                      style={[
                        styles.shareCouBack,
                        styles.shareCouBack3,
                        {
                          backgroundColor:
                            'linear-gradient(0deg, rgba(140, 140, 140, 0.83), rgba(140, 140, 140, 0.83))',
                        },
                      ]}>
                      <Text
                        style={[
                          styles.shareCouText,
                          {color: themes[theme].buttonBackground},
                        ]}>
                        {post.shares.length - 2}+
                      </Text>
                    </View>
                  </View>
                ) : post.shares && post.shares.length === 1 ? (
                  <View style={styles.sharedUserBox}>
                    <View
                      style={[
                        styles.shareCouBack,
                        styles.shareCouBack2,
                        {
                          borderWidth: 1,
                          borderColor: COLOR_WHITE,
                        },
                      ]}>
                      <Image
                        source={
                          !shareUser1 || shareUser1 === ''
                            ? images.default_avatar
                            : {uri: shareUser1}
                        }
                        style={[styles.sharedAvatar]}
                      />
                    </View>
                    <View
                      style={[
                        styles.shareCouBack,
                        styles.shareCouBack3,
                        {
                          backgroundColor:
                            'linear-gradient(0deg, rgba(140, 140, 140, 0.83), rgba(140, 140, 140, 0.83))',
                        },
                      ]}>
                      <Text
                        style={[
                          styles.shareCouText,
                          {color: themes[theme].buttonBackground},
                        ]}>
                        {post.shares.length - 1}+
                      </Text>
                    </View>
                  </View>
                ) : (
                  <></>
                )}

                <TouchableOpacity
                  style={styles.shareButton}
                  // onPress={onSharePost(post)}
                >
                  <VectorIcon
                    type="MaterialCommunityIcons"
                    name="share"
                    size={24}
                    color={themes[theme].iconColor}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* <Text
              style={[styles.captionText, { color: themes[theme].infoText }]}>
              {dateToString(post.date, 'hh:MM A · DD MMM YY')}
            </Text> */}
            {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => toggleLikes(isLiking)}>
                <Image
                  source={images.heart}
                  style={[
                    styles.toolIcon,
                    {
                      tintColor: isLiking
                        ? 'red'
                        : themes[theme].inactiveTintColor,
                    },
                  ]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setInputMode(true);
                  setTimeout(() => {
                    if (textInput.current) {
                      textInput.current.focus();
                    }
                  }, 10);
                }}>
                <Image
                  source={images.chat}
                  style={[
                    styles.toolIcon,
                    {
                      tintColor: themes[theme].inactiveTintColor,
                      width: 20,
                      height: 20,
                    },
                  ]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{position: 'absolute', right: 0}}
                onPress={() => {
                  onSharePost(post);
                }}>
                <Image
                  source={images.share}
                  style={[
                    styles.toolIcon,
                    {
                      tintColor: themes[theme].inactiveTintColor,
                    },
                  ]}
                />
              </TouchableOpacity>
            </View> */}
          </View>
          {/* Comment EditBox */}
          <View style={styles.commentBoxContainer}>
            <View
              style={[
                styles.commentEditBox,
                {backgroundColor: themes[theme].buttonBackground},
              ]}>
              <View style={styles.commentContextContainer}>
                <Image
                  source={
                    post.owner.avatar
                      ? {uri: post.owner.avatar}
                      : images.default_avatar
                  }
                  style={[
                    styles.commentSmallAvatar,
                    {borderColor: themes[theme].tabBorderColor},
                  ]}
                />
                <TextInput
                  multiline={true}
                  numberOfLines={2}
                  onChangeText={text => setCurComment(text)}
                  placeholder={I18n.t('add_your_comment')}
                  placeholderTextColor={COLOR_GRAY_DARK}
                  style={{
                    marginLeft: 15,
                    width: Dimensions.get('window').width - 160,
                    padding: 0,
                    color: themes[theme].activeTintColor,
                  }}
                />
              </View>
              <TouchableOpacity
                style={styles.commentEditBtn}
                onPress={onSubmitComment}>
                <VectorIcon
                  type="Ionicons"
                  name="add"
                  size={20}
                  color={themes[theme].activeTintColor}
                />
                <Text
                  style={[
                    styles.commentEditBtnText,
                    {color: themes[theme].activeTintColor},
                  ]}>
                  {I18n.t('Send')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* All Comments List */}
          <View>
            <View style={styles.commentContentHeader}>
              <Text
                style={{fontSize: 16, color: themes[theme].activeTintColor}}>
                {I18n.t('all_comments')}
              </Text>
              <Text style={{fontSize: 14, color: themes[theme].textColor}}>
                {I18n.t('view_all') + ' ' + 5}
              </Text>
            </View>
            <View style={styles.commentContents}>
              {post.comment_accounts &&
                post.comment_accounts.map((c, index) => (
                  // Each Comment Content
                  <View style={styles.commentContainer} key={index}>
                    <View
                      style={[
                        styles.commentMain,
                        {backgroundColor: themes[theme].commentCardBox},
                      ]}>
                      <Image
                        source={
                          c.avatar ? {uri: c.avatar} : images.default_avatar
                        }
                        style={styles.commentAvatar}
                      />
                      <View style={[styles.commentContent]}>
                        <View
                          style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            style={[
                              styles.commentAccountName,
                              {
                                fontWeight: 'bold',
                                color: themes[theme].activeTintColor,
                              },
                            ]}>
                            {c.displayName}
                          </Text>
                          <VectorIcon
                            type="Feather"
                            name="more-horizontal"
                            size={20}
                            color={themes[theme].iconColor}
                          />
                          {/* <Text
                            style={[
                              styles.commentAccountName,
                              {color: themes[theme].infoText},
                            ]}>
                            {` · ${getUserRepresentString(c)}`}
                          </Text> */}
                        </View>
                        {/* <Text style={{ color: themes[theme].infoText, fontSize: 12, marginTop: 4 }}>{I18n.t('replying_to', { name: index == 0 ? post.owner.handle : post.comment_accounts[index - 1].handle })}</Text> */}
                        <Text
                          style={[
                            styles.commentText,
                            {
                              color: themes[theme].textColor,
                              marginVertical: 10,
                            },
                          ]}>
                          {c.text}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                          }}>
                          <Text
                            style={[
                              styles.commentAccountName,
                              {color: themes[theme].deactiveTintColor},
                            ]}>
                            {dateStringFromNow(c.date)}
                          </Text>
                          <TouchableOpacity
                            style={{flexDirection: 'row', marginLeft: 15}}>
                            <VectorIcon
                              type="Entypo"
                              name="reply"
                              size={20}
                              color={themes[theme].textColor}
                            />
                            <Text
                              style={[
                                styles.replyButton,
                                {color: themes[theme].deactiveTintColor},
                              ]}>
                              {I18n.t('reply_now')}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                    {/* <View style={styles.commentFooter}></View> */}
                  </View>
                ))}
            </View>
          </View>
        </ScrollView>
        {inputMode && (
          <View style={styles.comment}>
            <CsTextInput
              inputRef={e => {
                textInput.current = e;
              }}
              onBlur={() => setInputMode(false)}
              containerStyle={styles.commentInput}
              inputStyle={{
                paddingVertical: 8,
                borderRadius: 8,
                backgroundColor: themes[theme].auxiliaryBackground,
                color: 'black',
              }}
              placeholder={I18n.t('placeholder_reply')}
              returnKeyType="send"
              keyboardType="default"
              onChangeText={text => setState({...state, comment: text})}
              onSubmitEditing={onComment}
              theme={theme}
            />
            <TouchableOpacity onPress={() => onComment()}>
              <Image
                source={images.ic_send}
                style={[
                  {
                    width: 30,
                    height: 30,
                    tintColor: themes[theme].activeTintColor,
                    marginRight: 10,
                  },
                ]}
              />
            </TouchableOpacity>
          </View>
        )}
        {/* Show the Detailed Image when click the image of the post */}
        {photoMode && (
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              backgroundColor: '#000000E0',
            }}>
            <Image
              source={{uri: post.photo}}
              style={{width: '100%', height: '100%' /*resizeMode: 'contain'*/}}
            />
            <View
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                justifyContent: 'space-between',
              }}>
              {/* Top Return Home Button */}
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  marginTop: 10,
                }}>
                <TouchableOpacity
                  onPress={() => setPhotoMode(false)}
                  style={{
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <VectorIcon
                    type="AntDesign"
                    name="arrowleft"
                    size={18}
                    color={themes[theme].activeTintColor}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: COLOR_WHITE,
                      marginLeft: 15,
                    }}>
                    Back to Home
                  </Text>
                </TouchableOpacity>
                {/* <PopupMenu
                  theme={theme}
                  options={onAction(post).options}
                  renderTrigger={() => (
                    <Image
                      source={images.more}
                      style={[styles.more, { tintColor: 'white' }]}
                    />
                  )}
                /> */}
              </View>
              {/* Post Image Content */}
              <View style={{padding: 30}}>
                {/* Detailed Post Image Content */}
                <View style={styles.owner}>
                  <View style={styles.avatarContainer}>
                    <Image
                      source={
                        post.owner.avatar
                          ? {uri: post.owner.avatar}
                          : images.default_avatar
                      }
                      style={styles.avatar}
                    />
                  </View>
                  <View style={styles.profileInfo}>
                    <Text
                      style={[
                        styles.profileName,
                        {color: themes[theme].activeTintColor},
                      ]}>
                      {post.owner.displayName}
                    </Text>
                    <Text
                      style={{
                        color: themes[theme].normalTextColor,
                        fontSize: 12,
                        marginTop: 3,
                      }}>
                      {post?.date ? dateStringFromNowShort(post?.date) : null}
                    </Text>
                  </View>
                  <PopupMenu
                    theme={theme}
                    options={onAction(post).options}
                    renderTrigger={() => (
                      <VectorIcon
                        type="Feather"
                        name="more-horizontal"
                        size={18}
                        color={themes[theme].activeTintColor}
                      />
                    )}
                  />
                </View>
                {/* Text Content */}
                <View>
                  <Text
                    style={[
                      styles.titleText,
                      {color: themes[theme].normalTextColor},
                    ]}>
                    {post.text}
                  </Text>
                </View>
                {/* Detailed Post Image Toolkit */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 40,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity
                      onPress={() => toggleLikes(isLiking)}
                      style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={images.heart}
                        style={[styles.miniIcon, {opacity: isLiking ? 0.5 : 1}]}
                      />
                      <Text
                        style={[
                          styles.count,
                          {color: themes[theme].titleColor},
                        ]}>
                        {post.likes && post.likes.length > 0
                          ? post.likes.length
                          : null}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      // onPress={onPress}
                      style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={images.chat}
                        style={[styles.miniIcon, {opacity: 0.5}]}
                      />
                      <Text
                        style={[
                          styles.count,
                          {color: themes[theme].titleColor},
                        ]}>
                        {post.comments && post.comments.length > 0
                          ? post.comments.length
                          : null}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.shareContainer}>
                    {post.shares && post.shares.length >= 2 ? (
                      <View style={styles.sharedUserBox}>
                        <View
                          style={[
                            styles.shareCouBack,
                            styles.shareCouBack1,
                            {
                              borderWidth: 1,
                              borderColor: COLOR_WHITE,
                            },
                          ]}>
                          <Image
                            source={
                              !shareUser2 || shareUser2 === ''
                                ? images.default_avatar
                                : {uri: shareUser2}
                            }
                            style={[styles.sharedAvatar]}
                          />
                        </View>
                        <View
                          style={[
                            styles.shareCouBack,
                            styles.shareCouBack2,
                            {
                              borderWidth: 1,
                              borderColor: COLOR_WHITE,
                            },
                          ]}>
                          <Image
                            source={
                              !shareUser1 || shareUser1 === ''
                                ? images.default_avatar
                                : {uri: shareUser1}
                            }
                            style={[styles.sharedAvatar]}
                          />
                        </View>
                        <View
                          style={[
                            styles.shareCouBack,
                            styles.shareCouBack3,
                            {
                              backgroundColor:
                                'linear-gradient(0deg, rgba(140, 140, 140, 0.83), rgba(140, 140, 140, 0.83))',
                            },
                          ]}>
                          <Text
                            style={[
                              styles.shareCouText,
                              {color: themes[theme].buttonBackground},
                            ]}>
                            {post.shares.length - 2}+
                          </Text>
                        </View>
                      </View>
                    ) : post.shares && post.shares.length === 1 ? (
                      <View style={styles.sharedUserBox}>
                        <View
                          style={[
                            styles.shareCouBack,
                            styles.shareCouBack2,
                            {
                              borderWidth: 1,
                              borderColor: COLOR_WHITE,
                            },
                          ]}>
                          <Image
                            source={
                              !shareUser1 || shareUser1 === ''
                                ? images.default_avatar
                                : {uri: shareUser1}
                            }
                            style={[styles.sharedAvatar]}
                          />
                        </View>
                        <View
                          style={[
                            styles.shareCouBack,
                            styles.shareCouBack3,
                            {
                              backgroundColor:
                                'linear-gradient(0deg, rgba(140, 140, 140, 0.83), rgba(140, 140, 140, 0.83))',
                            },
                          ]}>
                          <Text
                            style={[
                              styles.shareCouText,
                              {color: themes[theme].buttonBackground},
                            ]}>
                            {post.shares.length - 1}+
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <></>
                    )}

                    <TouchableOpacity
                      style={styles.shareButton}
                      // onPress={onSharePost(post)}
                    >
                      <VectorIcon
                        type="MaterialCommunityIcons"
                        name="share"
                        size={24}
                        color={themes[theme].iconColor}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      </KeyboardView>
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
)(withTheme(PostDetailView));
