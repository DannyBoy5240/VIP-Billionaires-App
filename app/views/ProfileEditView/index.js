import React, {useRef, useState, useEffect} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';

import {withTheme} from '../../theme';
import KeyboardView from '../../containers/KeyboardView';
import sharedStyles from '../Styles';
import StatusBar from '../../containers/StatusBar';
import styles from './styles';
import images from '../../assets/images';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import SafeAreaView from '../../containers/SafeAreaView';
import {showErrorAlert, showToast} from '../../lib/info';
import firebaseSdk, {DB_ACTION_UPDATE} from '../../lib/firebaseSdk';
import {setUser as setUserAction} from '../../actions/login';
import {
  checkCameraPermission,
  checkPhotosPermission,
  imagePickerConfig,
} from '../../utils/permissions';
import * as HeaderButton from '../../containers/HeaderButton';
import ActivityIndicator from '../../containers/ActivityIndicator';
import {isValidURL} from '../../utils/validators';
import I18n from '../../i18n';
import {VectorIcon} from '../../containers/VectorIcon';
import ExDatePicker from '../../containers/ExDatePicker';
import FloatingTextInput from '../../containers/FloatingTextInput';
import ExGender from '../../containers/ExGender/';
import {COLOR_BTN_BACKGROUND, themes} from '../../constants/colors';
import {dateToString, DATE_STRING_FORMAT} from '../../utils/datetime';

import {useNavigation} from '@react-navigation/native';

const ProfileEditView = props => {
  const [state, setState] = useState({
    image_path: null,
    displayName: props.user.displayName,
    email: props.user.email,
    phone: props.user.phone ?? '',
    gender: props.user.gender ?? '',
    birthday: props.user.birthday
      ? typeof props.user.birthday === 'string'
        ? props.user.birthday
        : typeof props.user.birthday === 'object' && props.user.birthday.seconds
        ? dateToString(props.user.birthday, DATE_STRING_FORMAT)
        : null
      : null,
    purpose: props.user.purpose ?? '',
    bio: props.user.bio ?? '',
    city: props.user.city ?? '',
    website: props.user.website ?? '',
    isLoading: false,
    topScrollEnable: true,
  });
  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const cityInput = useRef(null);
  const bioInput = useRef(null);
  const websiteInput = useRef(null);
  const phoneInput = useRef(null);

  const navigation = useNavigation();

  const {user, theme} = props;
  const {
    image_path,
    displayName,
    phone,
    gender,
    birthday,
    city,
    bio,
    website,
    isLoading,
    topScrollEnable,
  } = state;

  useEffect(() => {
    init();
  }, [state]);

  const init = () => {
    const {navigation} = props;
    navigation.setOptions({
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: '600',
        fontFamily: 'Hind Vadodara',
        color: themes[theme].activeTintColor,
        marginTop: 10,
      },
      title: I18n.t('update_basic_information'),
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginTop: 12,
            marginLeft: 15,
          }}
          onPress={() => navigation.goBack()}>
          <VectorIcon
            type={'AntDesign'}
            name={'arrowleft'}
            size={20}
            color={'white'}
          />
        </TouchableOpacity>
      ),
      // headerRight: () => (
      //   <HeaderButton.Save
      //     navigation={navigation}
      //     onPress={onSubmit}
      //     testID="rooms-list-view-create-channel"
      //   />
      // ),
    });
  };

  const takePhoto = async () => {
    if (await checkCameraPermission()) {
      ImagePicker.openCamera(imagePickerConfig).then(image => {
        setState({...state, image_path: image.path});
      });
    }
  };

  const chooseFromLibrary = async () => {
    if (await checkPhotosPermission()) {
      ImagePicker.openPicker(imagePickerConfig).then(image => {
        setState({...state, image_path: image.path});
      });
    }
  };

  const toggleAction = () => {
    Alert.alert('', I18n.t('Upload_profile_photo'), [
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
          chooseFromLibrary();
        },
      },
    ]);
  };

  const isValid = () => {
    const {displayName, email, website} = state;
    if (!displayName.length) {
      showToast(I18n.t('please_enter_name'));
      nameInput.current.focus();
      return false;
    }
    if (!email.length) {
      showToast(I18n.t('please_enter_email'));
      emailInput.current.focus();
      return false;
    }
    if (website.length && !isValidURL(website)) {
      showToast(I18n.t('please_enter_valid_website'));
      websiteInput.current.focus();
      return false;
    }
    return true;
  };

  // const onSubmit = () => {
  //   if (isValid()) {
  //     const {image_path} = state;
  //     setState({...state, isLoading: true});
  //     if (image_path) {
  //       firebaseSdk
  //         .uploadMedia(firebaseSdk.STORAGE_TYPE_AVATAR, image_path)
  //         .then(image_url => {
  //           saveUser(image_url);
  //         })
  //         .catch(err => {
  //           showErrorAlert(err, I18n.t('Oops'));
  //           setState({...state, isLoading: false});
  //         });
  //     } else {
  //       saveUser();
  //     }
  //   }
  // };

  // const saveUser = (image_url = null) => {
  //   const {user, navigation, setUser} = props;
  //   const {
  //     displayName,
  //     phone,
  //     email,
  //     gender,
  //     birthday,
  //     purpose,
  //     city,
  //     website,
  //   } = state;

  //   let userInfo = {
  //     id: user.id,
  //     displayName: displayName,
  //     phone: phone,
  //     email: email,
  //     gender: gender,
  //     birthday: birthday,
  //     purpose: purpose,
  //     city: city,
  //     website: website,
  //   };

  //   if (image_url) {
  //     userInfo = {...userInfo, avatar: image_url};
  //   }

  //   firebaseSdk
  //     .setData(firebaseSdk.TBL_USER, DB_ACTION_UPDATE, userInfo)
  //     .then(() => {
  //       showToast(I18n.t('Update_profile_complete'));
  //       setState({...state, isLoading: false});
  //       const updateUser = {...user, ...userInfo};
  //       setUser(updateUser);
  //       navigation.pop();
  //     })
  //     .catch(err => {
  //       showToast(I18n.t(err.message));
  //       setState({...state, isLoading: false});
  //     });
  // };

  const updateInformation = () => {
    console.log('update informaiton');
    console.log(state);

    const {user, navigation, setUser} = props;
    const {displayName, bio, gender, city, phone, birthday, website} = state;

    let userInfo = {
      id: user.id,
      displayName: displayName,
      bio: bio,
      gender: gender,
      city: city,
      phone: phone,
      birthday: birthday,
      website: website,
    };

    firebaseSdk
      .setData(firebaseSdk.TBL_USER, DB_ACTION_UPDATE, userInfo)
      .then(() => {
        showToast(I18n.t('Update_profile_complete'));
        setState({...state, isLoading: false});
        const updateUser = {...user, ...userInfo};
        setUser(updateUser);
        navigation.pop();
      })
      .catch(err => {
        showToast(I18n.t(err.message));
        setState({...state, isLoading: false});
      });
  };

  return (
    <KeyboardView
      contentContainerStyle={[
        sharedStyles.container,
        {
          paddingTop: 10,
          backgroundColor: themes[theme].headerBackground,
        },
      ]}
      keyboardVerticalOffset={128}>
      <StatusBar />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          backgroundColor: themes[theme].backgroundColor,
        }}
        {...scrollPersistTaps}>
        <SafeAreaView>
          {isLoading && (
            <ActivityIndicator absolute theme={theme} size={'large'} />
          )}
          {/* <View style={styles.headerContainer}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.avatar}
                source={
                  image_path
                    ? { uri: image_path }
                    : user.avatar
                      ? { uri: user.avatar }
                      : images.default_avatar
                }
              />
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={toggleAction}>
                <VectorIcon
                  type={'MaterialIcons'}
                  name={'edit'}
                  size={16}
                  color={'white'}
                />
              </TouchableOpacity>
            </View>
          </View> */}
          <View style={styles.inputContainer}>
            <FloatingTextInput
              inputRef={nameInput}
              value={displayName}
              returnKeyType="next"
              keyboardType="default"
              textContentType="oneTimeCode"
              label={I18n.t('Name')}
              placeholder={I18n.t('enter_name')}
              onChangeText={name => setState({...state, displayName: name})}
              theme={theme}
              onSubmitEditing={() => {
                websiteInput.current.focus();
              }}
            />
            <FloatingTextInput
              inputRef={bioInput}
              value={bio}
              returnKeyType="next"
              keyboardType="default"
              textContentType="oneTimeCode"
              label={I18n.t('Bio')}
              placeholder={I18n.t('enter_headline_experience')}
              onChangeText={_bio => setState({...state, bio: _bio})}
              theme={theme}
              multiline={true}
              numberOfLines={5}
            />
            <ExGender
              containerStyle={styles.selectStyle}
              label={I18n.t('Select_Your_Gender')}
              value={gender}
              topScrollEnable={topScrollEnable}
              toggleShow={show => {
                setState({...state, topScrollEnable: !show});
              }}
              action={({value}) => {
                if (!value) {
                  return;
                }
                setState({...state, gender: value});
              }}
              theme={theme}
            />
            <FloatingTextInput
              inputRef={cityInput}
              value={city}
              returnKeyType="next"
              keyboardType="default"
              textContentType="oneTimeCode"
              label={I18n.t('City')}
              placeholder={I18n.t('select_city')}
              onChangeText={value => setState({...state, city: value})}
              theme={theme}
              onSubmitEditing={() => {
                bioInput.current.focus();
              }}
            />
            <FloatingTextInput
              inputRef={phoneInput}
              value={phone}
              returnKeyType="next"
              keyboardType="phone-pad"
              textContentType="oneTimeCode"
              label={I18n.t('Phone')}
              placeholder={I18n.t('type_phone_number')}
              onChangeText={phone => setState({...state, phone})}
              theme={theme}
              onSubmitEditing={() => {
                emailInput.current.focus();
              }}
            />
            <ExDatePicker
              label={I18n.t('Birthday')}
              containerStyle={styles.selectStyle}
              topScrollEnable={topScrollEnable}
              toggleShow={show => {
                setState({...state, topScrollEnable: !show});
              }}
              value={birthday}
              placeholder={I18n.t('select_birthday')}
              action={({value}) => {
                if (!value) {
                  return;
                }
                setState({...state, birthday: value});
              }}
              theme={theme}
            />
            <FloatingTextInput
              inputRef={websiteInput}
              value={website}
              returnKeyType="next"
              keyboardType="default"
              textContentType="oneTimeCode"
              label={I18n.t('url')}
              placeholder={I18n.t('enter_url')}
              onChangeText={website => setState({...state, website})}
              theme={theme}
              onSubmitEditing={() => {
                phoneInput.current.focus();
              }}
            />
            <TouchableOpacity
              onPress={updateInformation}
              style={[
                styles.updateButton,
                {backgroundColor: COLOR_BTN_BACKGROUND},
              ]}>
              <Text
                style={[
                  styles.updateText,
                  {color: themes[theme].normalTextColor},
                ]}>
                {I18n.t('update')}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardView>
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
)(withTheme(ProfileEditView));
