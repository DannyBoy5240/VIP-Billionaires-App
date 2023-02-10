import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';
import Modal from 'react-native-modal';
import CsSelectGender from '../../../containers/CsSelectGender';
import CsAutocompleteSelect from '../../../containers/CsAutocompleteSelect';
import FloatingTextInput from '../../../containers/FloatingTextInput';
import I18n from '../../../i18n';

import styles from './style';
import CsDatePicker from '../../../containers/CsDatePicker';
import Button from '../../../containers/Button';
import ExDatePicker from '../../../containers/ExDatePicker';

import ExGender from '../../../containers/ExGender/';

import {showErrorAlert, showToast} from '../../../lib/info';
import firebaseSdk, {DB_ACTION_UPDATE} from '../../../lib/firebaseSdk';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {CURRENT_USER} from '../../../constants/keys';

const theme = 'light';

const BasicInfoModal = ({isVisible, onBackdropPress}) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phone, setPhone] = useState('');

  const [user, setUser] = useState({});

  const nameInput = useRef(null);

  const isValid = () => {
    if (!name.length) {
      showToast(I18n.t('please_enter_name'));
      nameInput.current.focus();
      return false;
    }
    if (!gender.length) {
      showToast(I18n.t('please_select_gender'));
      return false;
    }
    if (!city.length) {
      showToast(I18n.t('please_select_city'));
      return false;
    }
    if (!birthday.length) {
      showToast(I18n.t('please_select_birthday'));
      return false;
    }
    if (!phone.length) {
      showToast(I18n.t('please_input_phonenumber'));
      return false;
    }
    return true;
  };

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    await AsyncStorage.getItem(CURRENT_USER, (err, result) => {
      var obj = JSON.parse(result);
      setUser(obj);
      // Initilize
      setName(obj.displayName);
      setGender(obj.gender);
      setCity(obj.city);
      setBirthday(obj.birthday);
      setPhone(obj.phone);
    });
  };

  const onSubmit = () => {
    if (isValid()) {
      let userInfo = {
        id: user.id,
        displayName: name,
        city: city,
        gender: gender,
        birthday: birthday,
        phone: phone,
      };

      firebaseSdk
        .setData(firebaseSdk.TBL_USER, DB_ACTION_UPDATE, userInfo)
        .then(() => {
          showToast(I18n.t('Update_profile_complete'));
          onBackdropPress();
        })
        .catch(err => {
          showToast(I18n.t(err.message));
        });
    }
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <View style={styles.container}>
        <Text style={styles.title}>Update basic Information</Text>
        <Text style={styles.descriptionText}>
          Thank you for your registration, before we move forward please verify
          your email address
        </Text>
        <FloatingTextInput
          inputRef={nameInput}
          value={name}
          returnKeyType="next"
          keyboardType="default"
          textContentType="oneTimeCode"
          label={I18n.t('Name')}
          placeholder={I18n.t('enter_name')}
          onChangeText={name => setName(name)}
          theme={theme}
        />
        <CsSelectGender
          label="Select Your Gender"
          theme={theme}
          onChange={value => setGender(value)}
          value={gender}
        />
        <CsAutocompleteSelect
          theme={theme}
          placeholder={'Select city'}
          label="City"
          onChange={value => setCity(value)}
        />
        <FloatingTextInput
          inputRef={nameInput}
          value={phone}
          returnKeyType="next"
          keyboardType="default"
          textContentType="oneTimeCode"
          label={I18n.t('Phone_number')}
          placeholder={'Type phone number'}
          onChangeText={phone => setPhone(phone)}
          theme={theme}
        />
        <ExDatePicker
          theme={theme}
          placeholder={'Select Date of birth'}
          value={birthday}
          action={({value}) => {
            if (!value) {
              return;
            }
            setBirthday(value);
          }}
          label="Date of birth"
        />
        <Button
          style={styles.submitBtn}
          title={I18n.t('update')}
          size="W"
          onPress={onSubmit}
          testID="login-submit"
          // loading={isLoading}
          theme={theme}
          pressingHighlight
        />
      </View>
    </Modal>
  );
};

export default BasicInfoModal;
