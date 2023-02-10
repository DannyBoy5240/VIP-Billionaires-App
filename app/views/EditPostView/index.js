import React, {useEffect, useRef, useState} from 'react';

import {
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {createThumbnail} from 'react-native-create-thumbnail';
import firestore from '@react-native-firebase/firestore';
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/native';

// const RNImagePicker = require('react-native-image-picker');
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import RNImagePicker from 'react-native-image-picker';
// import * as RNImagePicker from 'react-native-image-picker';

import {withTheme} from '../../theme';
import KeyboardView from '../../containers/KeyboardView';
import sharedStyles from '../Styles';
import StatusBar from '../../containers/StatusBar';
import styles from './styles';
import images from '../../assets/images';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import SafeAreaView from '../../containers/SafeAreaView';
import {showErrorAlert, showToast} from '../../lib/info';
import {setUser as setUserAction} from '../../actions/login';
import * as HeaderButton from '../../containers/HeaderButton';
import CsTextInput from '../../containers/CsTextInput';
import ActivityIndicator from '../../containers/ActivityIndicator';
import {
  POST_TYPE_PHOTO,
  POST_TYPE_TEXT,
  POST_TYPE_VIDEO,
} from '../../constants/app';
import firebaseSdk, {
  DB_ACTION_ADD,
  DB_ACTION_UPDATE,
} from '../../lib/firebaseSdk';
import I18n from '../../i18n';
import {VectorIcon} from '../../containers/VectorIcon';
import {GradientHeader} from '../../containers/GradientHeader';
import {
  HEADER_BAR_END,
  HEADER_BAR_START,
  COLOR_BTN_BACKGROUND,
  COLOR_GRAY_DARK,
  themes,
} from '../../constants/colors';
import {
  checkCameraPermission,
  checkPhotosPermission,
  imagePickerConfig,
  libraryVideoPickerConfig,
  videoPickerConfig,
} from '../../utils/permissions';

const EditPostView = props => {
  const navigation = useNavigation();
  const [state, setState] = useState({
    postId: props.route.params?.postId,
    type: POST_TYPE_TEXT,
    file_path: null,
    thumbnail: null,
    photo: null,
    video: null,
    playing: false,
    text: '',
    isLoading: true,
  });
  const {
    type,
    text,
    file_path,
    photo,
    video,
    thumbnail,
    playing,
    postId,
    isLoading,
  } = state;
  const {theme, user} = props;

  const textInputRef = useRef(null);

  // State for ImagePicker upload
  const [filepath, setFilePath] = useState({data: '', uri: ''});
  const [fileData, setFileData] = useState('');
  const [fileUri, setFileUri] = useState('');

  // CommentHeader Data
  const [curUserName, setCurUserName] = useState('');

  useEffect(() => {
    init();
  }, [text, file_path]);

  useEffect(() => {
    firestore()
      .collection(firebaseSdk.TBL_POST)
      .doc(state.postId)
      .get()
      .then(docSnapshot => {
        const post = docSnapshot.data();
        setState({
          ...state,
          type: post.type,
          text: post.text,
          thumbnail: post.thumbnail,
          photo: post.photo,
          video: post.video,
          userId: post.userId,
          isLoading: false,
        });
        if (textInputRef.current) {
          textInputRef.current.setNativeProps({text: post.text});
        }
      })
      .catch(err => {
        setState({...state, isLoading: false});
        showErrorAlert(I18n.t('error_post_not_found'), '', () =>
          navigation.pop(),
        );
      });

    getCurUserName();
  }, []);

  const init = async () => {
    navigation.setOptions({
      headerTitleStyle: {
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'Hind Vadodara',
        color: themes[theme].activeTintColor,
        marginTop: 10,
      },
      title: I18n.t('back_to_page'),
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
  };

  const takePhoto = async () => {
    if (await checkCameraPermission()) {
      ImagePicker.openCamera(imagePickerConfig).then(image => {
        setState({...state, file_path: image.path});
      });
    }
  };

  const takeVideo = async () => {
    if (await checkCameraPermission()) {
      ImagePicker.openCamera(videoPickerConfig).then(video => {
        setState({...state, file_path: video.path});
        takeThumbnail();
      });
    }
  };

  const choosePhoto = async () => {
    if (await checkPhotosPermission()) {
      ImagePicker.openPicker(imagePickerConfig).then(image => {
        setState({...state, file_path: image.path});
      });
    }
  };

  const chooseVideo = async () => {
    if (await checkPhotosPermission()) {
      ImagePicker.openPicker(libraryVideoPickerConfig).then(video => {
        setState({...state, file_path: video.path});
        takeThumbnail();
      });
    }
  };

  const takeThumbnail = () => {
    setState({...state, isLoading: true});
    createThumbnail({url: state.file_path, timestamp: 100}).then(thumbnail => {
      setState({...state, isLoading: false, thumbnail: thumbnail.path});
      console.log('thumbnail', thumbnail);
    });
  };

  const onUpdatePhoto = () => {
    Alert.alert('', I18n.t('Upload_photo'), [
      {
        text: I18n.t('Cancel'),
        onPress: () => {},
      },
      {
        text: I18n.t('Take_a_photo'),
        onPress: () => {
          takePhoto();
        },
      },
      {
        text: I18n.t('Choose_a_photo'),
        onPress: () => {
          choosePhoto();
        },
      },
    ]);
  };

  const onUpdateVideo = () => {
    Alert.alert('', I18n.t('Upload_video'), [
      {
        text: I18n.t('Cancel'),
        onPress: () => {},
      },
      {
        text: I18n.t('Take_a_video'),
        onPress: () => {
          takeVideo();
        },
      },
      {
        text: I18n.t('Choose_a_video'),
        onPress: () => {
          chooseVideo();
        },
      },
    ]);
  };

  const isValid = () => {
    if (!text.length) {
      showToast(I18n.t('please_enter_post_text'));
      textInputRef.current.focus();
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (isValid()) {
      setState({...state, isLoading: true});

      let post = {
        id: postId,
        userId: user.userId,
        type: type,
        text: text,
        date: new Date(),
      };

      if (!file_path) {
        return savePost(post);
      }

      switch (type) {
        case POST_TYPE_PHOTO:
          return firebaseSdk
            .uploadMedia(firebaseSdk.STORAGE_TYPE_PHOTO, file_path)
            .then(image_url => {
              post.photo = image_url;
              savePost(post);
            })
            .catch(err => {
              showErrorAlert(I18n.t('Upload_Image_failed'));
              setState({...state, isLoading: false});
            });
        case POST_TYPE_VIDEO:
          return firebaseSdk
            .uploadMedia(firebaseSdk.STORAGE_TYPE_PHOTO, file_path)
            .then(video_url => {
              post.video = video_url;
              firebaseSdk
                .uploadMedia(firebaseSdk.STORAGE_TYPE_PHOTO, thumbnail)
                .then(image_url => {
                  post.thumbnail = image_url;
                  savePost(post);
                })
                .catch(err => {
                  showErrorAlert(I18n.t('Uploading_thumbnail_failed'));
                  setState({...state, isLoading: false});
                });
            })
            .catch(err => {
              showErrorAlert(I18n.t('Upload_Image_failed'));
              setState({...state, isLoading: false});
            });
      }
    }
  };

  const savePost = post => {
    firebaseSdk
      .setData(firebaseSdk.TBL_POST, DB_ACTION_UPDATE, post)
      .then(() => {
        showToast(I18n.t('Update_post_complete'));
        setState({...state, isLoading: false});
        navigation.pop();
      })
      .catch(() => {
        showErrorAlert(I18n.t('Update_post_failed'));
        setState({...state, isLoading: false});
      });
  };

  // Get User Data based on the Post ID
  const getCurUserName = () => {
    firestore()
      .collection(firebaseSdk.TBL_POST)
      .doc(state.postId)
      .get()
      .then(docSnapshot => {
        const post = docSnapshot.data();
        const userId = post.userId;

        firebaseSdk
          .getUser(userId)
          .then(user => {
            setCurUserName(user.displayName);
          })
          .catch(err => {
            setCurUserName('');
          });
      })
      .catch(err => {
        setState({...state, isLoading: false});
        showErrorAlert(I18n.t('error_post_not_found'), '');
      });
  };

  const renderForm = () => {
    switch (type) {
      case POST_TYPE_TEXT:
        return (
          <View style={styles.inputContainer}>
            <CsTextInput
              inputRef={textInputRef}
              containerStyle={styles.roundInput}
              inputStyle={styles.textStyle}
              wrapStyle={{alignItems: 'flex-start', paddingVertical: 12}}
              returnKeyType="send"
              keyboardType="default"
              onChangeText={text => setState({...state, text})}
              multiline={true}
              theme={theme}
            />
          </View>
        );
      case POST_TYPE_PHOTO:
        return (
          <View style={styles.inputContainer}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={[
                  styles.commentHeader,
                  {color: themes[theme].textColor},
                ]}>
                ✍️ Whats on your mind
              </Text>
              <Text
                style={[
                  styles.commentHeader,
                  {color: themes[theme].websiteLink},
                ]}>
                {' ' + curUserName}
              </Text>
            </View>

            <TextInput
              multiline={true}
              numberOfLines={8}
              onChangeText={txt => setState({...state, text: txt})}
              value={text}
              placeholder={I18n.t('write_something_here')}
              placeholderColor={COLOR_GRAY_DARK}
              style={[
                styles.commentBox,
                {
                  color: themes[theme].textColor,
                  backgroundColor: themes[theme].disableButtonBackground,
                },
              ]}
            />

            <View>
              <Image
                source={{uri: !file_path ? state.photo : file_path}}
                style={styles.previewImage}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.itemBoxContainer,
                {backgroundColor: themes[theme].disableButtonBackground},
              ]}
              onPress={onUpdatePhoto}>
              <View style={styles.itemBoxMark}>
                <VectorIcon
                  type="Entypo"
                  name="images"
                  size={20}
                  color={themes[theme].activeTintColor}
                />
                <Text
                  style={[
                    styles.itemBoxText,
                    {color: themes[theme].activeTintColor},
                  ]}>
                  {I18n.t('Upload_photo')}
                </Text>
              </View>
              <VectorIcon
                type="AntDesign"
                name="right"
                size={18}
                color={themes[theme].activeTintColor}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.itemBoxContainer,
                {backgroundColor: themes[theme].disableButtonBackground},
              ]}
              onPress={takePhoto}>
              <View style={styles.itemBoxMark}>
                <VectorIcon
                  type="FontAwesome"
                  name="camera"
                  size={20}
                  color={themes[theme].activeTintColor}
                />
                <Text
                  style={[
                    styles.itemBoxText,
                    {color: themes[theme].activeTintColor},
                  ]}>
                  {I18n.t('capture')}
                </Text>
              </View>
              <VectorIcon
                type="AntDesign"
                name="right"
                size={18}
                color={themes[theme].activeTintColor}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.itemBoxContainer,
                {backgroundColor: themes[theme].disableButtonBackground},
              ]}
              onPress={takeVideo}>
              <View style={styles.itemBoxMark}>
                <VectorIcon
                  type="FontAwesome"
                  name="video-camera"
                  size={20}
                  color={themes[theme].activeTintColor}
                />
                <Text
                  style={[
                    styles.itemBoxText,
                    {color: themes[theme].activeTintColor},
                  ]}>
                  {I18n.t('video')}
                </Text>
              </View>
              <VectorIcon
                type="AntDesign"
                name="right"
                size={18}
                color={themes[theme].activeTintColor}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.publishBtn,
                {backgroundColor: COLOR_BTN_BACKGROUND},
              ]}
              onPress={onSubmit}>
              <Text
                style={[
                  styles.publishBtnText,
                  {color: themes[theme].activeTintColor},
                ]}>
                {I18n.t('Publish')}
              </Text>
            </TouchableOpacity>
          </View>
        );
      case POST_TYPE_VIDEO:
        return (
          <View style={styles.inputContainer}>
            {playing && (
              <Video
                source={{uri: file_path ? file_path : video}}
                style={styles.video}
                controls
                onEnd={() => setState({...state, playing: false})}
                resizeMode={'contain'}
              />
            )}
            {thumbnail && !playing && (
              <View style={styles.thumbnailContainer}>
                <TouchableOpacity
                  onPress={onUpdateVideo}
                  style={[styles.editIcon, {position: 'absolute'}]}>
                  <VectorIcon
                    size={24}
                    name={'edit'}
                    type={'FontAwesome'}
                    color={'grey'}
                  />
                </TouchableOpacity>
                <Image
                  source={{uri: thumbnail}}
                  style={styles.thumbnail}
                  resizeMode={'contain'}
                />
                <TouchableOpacity
                  onPress={() => setState({...state, playing: true})}
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
            <CsTextInput
              inputRef={textInputRef}
              containerStyle={styles.underlineInput}
              placeholder={I18n.t('Video_post_placeholder')}
              returnKeyType="send"
              keyboardType="default"
              onChangeText={text => setState({...state, text})}
              multiline={true}
              theme={theme}
            />
          </View>
        );
    }
    return null;
  };

  return (
    <View
      style={[
        sharedStyles.container,
        {backgroundColor: themes[theme].navbarBackground},
      ]}>
      <KeyboardView
        contentContainerStyle={[
          sharedStyles.contentContainer,
          {
            flex: 1,
            overflow: 'hidden',
            paddingTop: 20,
            paddingHorizontal: 10,
            backgroundColor: themes[theme].backgroundColor,
          },
        ]}
        keyboardVerticalOffset={128}>
        <StatusBar />
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          {...scrollPersistTaps}>
          <SafeAreaView>
            {isLoading && (
              <ActivityIndicator absolute theme={theme} size={'large'} />
            )}
            {renderForm()}
          </SafeAreaView>
        </ScrollView>
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
)(withTheme(EditPostView));
