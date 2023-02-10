import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {
  FlatList,
  Image,
  RefreshControl,
  TextInput,
  TouchableOpacity,
  SafeAreaView as RNSafeAreaView,
  View,
  Text,
  Animated,
  Platform,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import {BorderlessButton} from 'react-native-gesture-handler';
import SoundPlayer from 'react-native-sound-player';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {themes} from '../../constants/colors';
import SafeAreaView from '../../containers/SafeAreaView';
import {withTheme} from '../../theme';
import styles from './styles';
import images from '../../assets/images';
import firebaseSdk from '../../lib/firebaseSdk';
import {showErrorAlert} from '../../lib/info';
import Message from './Message';
import {
  checkCameraPermission,
  checkPhotosPermission,
  imagePickerConfig,
} from '../../utils/permissions';
import ActivityIndicator from '../../containers/ActivityIndicator';
import {isIOS} from '../../utils/deviceInfo';
import {fetchUnread as fetchUnreadAction} from '../../actions/chat';
import debounce from '../../utils/debounce';
import I18n from '../../i18n';
import StatusBar from '../../containers/StatusBar';
import {useKeyboardAnimationReplica} from 'react-native-keyboard-controller';
import {VectorIcon} from '../../containers/VectorIcon';
import {Badge} from 'react-native-paper';
import AudioRecord from 'react-native-audio-record';
import {Buffer} from 'buffer';

const scrollPersistTaps = {
  keyboardShouldPersistTaps: 'always',
  keyboardDismissMode: 'interactive',
};

let typingTimeout = null;

const ChatView = props => {
  const navigation = useNavigation();
  const [state, setState] = useState({
    loading: false,
    room: props.route.params?.room,
    inputText: '',
    showActiveImage: false,
    refreshing: false,
    sending: false,
    otherTyping: false,
  });
  const [canSoundPlay, setCanSoundPlay] = useState(false);
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);

  const {user, theme, insets, fetchUnread} = props;

  const {refreshing, sending, showActiveImage, otherTyping, room, inputText} =
    state;
  const unSubscribeMessage = useRef(null);
  const finishedLoadingFileLister = useRef(null);
  const finishedLoadingLister = useRef(null);
  const finishedPlayingLister = useRef(null);

  const [isRecording, setIsRecording] = useState(false);
  const [audioFile, setAudioFile] = useState('');

  useEffect(() => {
    init();
    if (Platform.OS === 'ios') {
      finishedLoadingFileLister.current = SoundPlayer.addEventListener(
        'FinishedLoadingFile',
        () => {
          setCanSoundPlay(true);
        },
      );
      finishedLoadingLister.current = SoundPlayer.addEventListener(
        'FinishedLoading',
        () => {
          setCanSoundPlay(true);
        },
      );
      finishedPlayingLister.current = SoundPlayer.addEventListener(
        'FinishedPlaying',
        () => {
          setCanSoundPlay(true);
        },
      );
      SoundPlayer.loadSoundFile('chat', 'caf');
    }

    return async () => {
      if (unSubscribeMessage.current) {
        unSubscribeMessage.current();
        unSubscribeMessage.current = null;
      }
      if (finishedLoadingFileLister.current) {
        finishedLoadingFileLister.current.remove();
      }
      if (finishedLoadingLister.current) {
        finishedLoadingLister.current.remove();
      }
      if (finishedPlayingLister.current) {
        finishedPlayingLister.current.remove();
      }
      try {
        await setUnReads();
        firebaseSdk.onOffline(room.id, user.userId);
        firebaseSdk.typing(room.id, user.userId, false);
        fetchUnread();
      } catch (e) {
        console.log('leftRoom Error', e);
      }
    };
  }, []);

  useEffect(() => {
    firebaseSdk.onOnline(state.room.id, props.user.userId);
    return () => {
      handleTyping(false);
    };
  }, []);

  const isOnline = true;

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{padding: 16}}
            onPress={() => navigation.goBack()}>
            <VectorIcon
              type="MaterialCommunityIcons"
              name="arrow-left"
              color={themes[theme].activeTintColor}
              size={24}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexGrow: 1, flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.avatarContainer}>
              <Image
                source={
                  room.account?.avatar
                    ? {uri: room.account?.avatar}
                    : images.default_avatar
                }
                style={styles.itemImage}
              />
              <Badge
                visible={true}
                size={12}
                style={[
                  styles.badge,
                  {
                    backgroundColor: isOnline
                      ? themes[theme].onlineStatusColor
                      : themes[theme].focusedBackground,
                  },
                  {borderColor: themes[theme].backgroundColor},
                ]}></Badge>
            </View>
            <View style={{flex: 1, alignSelf: 'center', marginLeft: 10}}>
              <Text
                style={[styles.displayName, {color: themes[theme].titleColor}]}>
                {room.account.displayName}
              </Text>
              <Text
                style={[
                  styles.status,
                  {
                    color: isOnline
                      ? themes[theme].onlineStatusColor
                      : themes[theme].focusedBackground,
                  },
                ]}>
                {isOnline ? 'Online Now' : 'Offline Now'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => <></>,
      headerStyle: {
        backgroundColor: themes[theme].backgroundColor,
      },
    });
  }, [theme]);

  const setUnReads = async () => {
    if (room.confirmUser === user.userId) {
      await firestore()
        .collection(firebaseSdk.TBL_ROOM)
        .doc(room.id)
        .update({confirmUser: '', unReads: 0});
    }
  };

  const init = async () => {
    await setUnReads();
    if (unSubscribeMessage.current) {
      unSubscribeMessage.current();
      unSubscribeMessage.current = null;
    }
    const messagesSubscribe = await firestore().collection(
      firebaseSdk.TBL_MESSAGE,
    );
    unSubscribeMessage.current = messagesSubscribe.onSnapshot(
      async querySnapShot => {
        const userSnaps = await firestore()
          .collection(firebaseSdk.TBL_USER)
          .get();
        const users = [];
        userSnaps.forEach(s => users.push(s.data()));

        const list = [];
        querySnapShot.forEach(doc => {
          const message = doc.data();
          const isOwn = message.sender === user.userId;
          if (message.roomId === room.id) {
            list.push({
              id: doc.id,
              msg: message.message,
              photo: message.photo,
              createdAt: moment(message.date.seconds * 1000),
              isOwn,
              owner: isOwn
                ? {
                    userId: user.userId,
                    name: user.displayName,
                    avatar: user.avatar,
                  }
                : {
                    userId: room.account.userId,
                    name: room.account.displayName,
                    avatar: room.account.avatar,
                  },
            });
          }
        });

        list.sort((a, b) => b.createdAt - a.createdAt);
        if (messages.length > 0 && messages.length !== list.length) {
          playSound();
        }
        if (messages > 0) {
          setMessages([...messages, ...list]);
        } else {
          setMessages(list);
        }

        const typingRef = database().ref(
          'rooms/' + room.id + '/typing/' + room.account.userId,
        );
        typingRef.on('value', snapshot => {
          const otherTyping = snapshot.val();
          setState({...state, otherTyping});
        });
      },
    );

    initAudioRecord();
  };

  const sendMessage = async () => {
    inputRef.current.setNativeProps({text: ''});
    handleTyping(false);
    if (inputText.trim().length === 0) {
      return;
    }
    const text = inputText.trim();
    setState({...state, inputText: ''});
    try {
      const message = {
        roomId: room.id,
        message: text,
        date: new Date(),
        sender: user.userId,
        receiver: room.account.userId,
      };
      await firebaseSdk.saveMessage(room.id, message, user, room.account);
    } catch (e) {
      console.log('error', e);
      showErrorAlert(I18n.t('error_sending_message'));
    }
  };

  const onChangeText = debounce(async text => {
    const isTextEmpty = text.length === 0;
    handleTyping(!isTextEmpty);
    setState({...state, inputText: text});
  }, 100);

  const handleTyping = isTyping => {
    if (!isTyping) {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
        typingTimeout = null;
      }
      firebaseSdk.typing(room.id, user.userId, false);
      return;
    }

    if (typingTimeout) {
      return;
    }

    typingTimeout = setTimeout(() => {
      firebaseSdk.typing(room.id, user.userId, true);
    }, 1000);
  };

  const sendMediaMessage = async image_path => {
    try {
      setState({...state, sending: true});
      const image_url = await firebaseSdk.uploadMedia(
        firebaseSdk.STORAGE_TYPE_PHOTO,
        image_path,
      );

      const message = {
        roomId: room.id,
        message: 'photo',
        photo: image_url,
        date: new Date(),
        sender: user.userId,
        receiver: room.account.userId,
      };

      await firebaseSdk.saveMessage(room.id, message, user, room.account);
      setState({...state, sending: false});
    } catch (e) {
      console.log('error', e);
      showErrorAlert(I18n.t('error_sending_message'));
      setState({...state, sending: false});
    }
  };

  const playSound = () => {
    if (Platform.OS === 'ios') {
      if (canSoundPlay) {
        setCanSoundPlay(false);
        SoundPlayer.play();
        console.log('play sound');
      }
    }
  };

  const onUploadPhoto = async () => {
    if (await checkCameraPermission()) {
      ImagePicker.openCamera(imagePickerConfig).then(image => {
        sendMediaMessage(image.path);
      });
    }
  };

  const onUploadImage = async () => {
    if (await checkPhotosPermission()) {
      ImagePicker.openPicker(imagePickerConfig).then(image => {
        sendMediaMessage(image.path);
      });
    }
  };

  const leftButtons = () => {
    return (
      <>
        <BorderlessButton
          key="file-message-image"
          onPress={onUploadImage}
          style={[
            styles.actionButtonContainer,
            {backgroundColor: themes[theme].borderColor},
          ]}
          testID="messagebox-action-upload-image">
          <AntDesign
            name="plus"
            size={18}
            style={{
              color: themes[theme].activeTintColor,
            }}
          />
        </BorderlessButton>
        {/* <BorderlessButton
          key="file-message-photo"
          onPress={onUploadPhoto}
          style={styles.actionButtonContainer}
          testID="messagebox-action-upload-photo">
          <Image
            style={styles.actionButtonPhoto}
            source={images.upload_photo}
          />
        </BorderlessButton> */}
      </>
    );
  };

  const onRefresh = async () => {
    setState({...state, refreshing: true});
    await init();
    setState({...state, refreshing: false});
  };

  const onPressMedia = message => {
    setState({...state, showActiveImage: message.photo});
  };

  const renderItem = (item, prevItem, index) => {
    let dateSeparator = null;
    if (!prevItem) {
      dateSeparator = item.createdAt;
    } else if (!moment(item.createdAt).isSame(prevItem.createdAt, 'day')) {
      dateSeparator = item.createdAt;
    }

    const message = (
      <Message
        key={item.id}
        onPressMedia={() => onPressMedia(item)}
        item={item}
      />
    );

    if (dateSeparator) {
      return (
        <>
          {message}
          <View
            style={[
              styles.dateSeparator,
              {backgroundColor: themes[theme].messageOwnBackground},
            ]}>
            <Text
              style={[styles.dateSepText, {color: themes[theme].subTextColor}]}>
              {moment(dateSeparator).format('DD MMM hh:mm')}
            </Text>
          </View>
        </>
      );
    }
    return message;
  };

  initAudioRecord = () => {
    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      wavFile: 'test.wav',
    };

    AudioRecord.init(options);

    AudioRecord.on('data', data => {
      const chunk = Buffer.from(data, 'base64');
      console.log('chunk size', chunk.byteLength);
      // do something with audio chunk
    });
  };

  const onVoiceRecord = async () => {
    if (isRecording) {
      console.log('voice record stops!!!');

      // let audioFile = await AudioRecord.stop();
      // console.log('audioFile context', audioFile);
      // setAudioFile(audioFile);

      setIsRecording(false);
    } else {
      console.log('voice record starts!!!');

      const status = await AudioRecord.start();
      console.log('Recording status: ', status);

      setAudioFile('');
      setIsRecording(true);

      console.log('---');
    }
  };

  const renderTyping = () => {
    if (otherTyping) {
      return (
        <Text
          style={[styles.typing, {color: themes[theme].infoText}]}>{`${I18n.t(
          'Typing',
        )}...`}</Text>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={{backgroundColor: themes[theme].chatBackground}}>
      <StatusBar />
      {sending && <ActivityIndicator absolute theme={theme} size={'large'} />}
      <FlatList
        style={{flex: 1}}
        data={messages}
        renderItem={({item, index}) =>
          renderItem(item, messages[index + 1], index)
        }
        keyExtractor={item => item.id}
        inverted
        removeClippedSubviews={isIOS}
        contentContainerStyle={{paddingTop: 4}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={themes[theme].actionColor}
          />
        }
        ListHeaderComponent={renderTyping}
        {...scrollPersistTaps}
      />

      <Animated.View>
        <RNSafeAreaView
          style={{
            backgroundColor: themes[theme].focusedBackground,
            paddingVertical: 13,
          }}>
          <View
            style={[
              styles.inputContainer,
              {
                marginBottom: Platform.OS === 'android' ? 20 : 0,
              },
            ]}>
            {leftButtons()}
            <TextInput
              ref={inputRef}
              returnKeyType={'default'}
              keyboardType="default"
              multiline
              blurOnSubmit={true}
              placeholder={'Type Something'}
              placeholderTextColor={themes[theme].subTextColor}
              onChangeText={onChangeText}
              onSubmitEditing={sendMessage}
              style={[
                styles.input,
                {
                  color: themes[theme].activeTintColor,
                  borderLeftWidth: 1,
                  borderColor: themes[theme].borderColor,
                  paddingHorizontal: 12,
                },
              ]}
            />
            <TouchableOpacity
              style={[
                styles.btnRecord,
                {backgroundColor: themes[theme].borderColor},
              ]}
              onPress={onVoiceRecord}>
              <Image
                source={
                  theme === 'light' ? images.ic_record : images.ic_record_dark
                }
                style={[
                  styles.recordBtn,
                  {
                    tintColor: themes[theme].activeTintColor,
                  },
                ]}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnContainer} onPress={sendMessage}>
              <Image
                source={
                  theme === 'light' ? images.ic_send : images.ic_send_dark
                }
                style={[
                  styles.sendBtn,
                  {
                    tintColor: themes[theme].activeTintColor,
                  },
                ]}
              />
            </TouchableOpacity>
          </View>
        </RNSafeAreaView>
      </Animated.View>

      {showActiveImage && (
        <TouchableOpacity
          style={styles.activeImageContainer}
          onPress={() => setState({...state, showActiveImage: null})}>
          <Image source={{uri: showActiveImage}} style={styles.activeImage} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};
const mapStateToProps = state => ({
  user: state.login.user,
});

const mapDispatchToProps = dispatch => ({
  fetchUnread: params => dispatch(fetchUnreadAction(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withSafeAreaInsets(withTheme(ChatView)));
