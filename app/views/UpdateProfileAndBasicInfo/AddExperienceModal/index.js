import React, {useRef, useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';
import CsSelectGender from '../../../containers/CsSelectGender';
import CsAutocompleteSelect from '../../../containers/CsAutocompleteSelect';
import FloatingTextInput from '../../../containers/FloatingTextInput';
import I18n from '../../../i18n';

import styles from './style';
import Button from '../../../containers/Button';
import {CsSelect} from '../../../containers/CsSelect';

import {showErrorAlert, showToast} from '../../../lib/info';

import {useNavigation} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {CURRENT_USER} from '../../../constants/keys';

const theme = 'light';

const AddExperienceModal = ({isVisible, onBackdropPress}) => {
  const [job, setJob] = useState('');
  const [company, setCompany] = useState('');
  const [role, sedtRole] = useState('');
  const [yearsOfService, setYearsOfService] = useState('');
  const [salary, setSalary] = useState('');

  const [user, setUser] = useState({});

  const isValid = () => {
    if (!job.length) {
      showToast(I18n.t('please_enter_job'));
      return false;
    }
    if (!company.length) {
      showToast(I18n.t('please_enter_company'));
      return false;
    }
    if (!role.length) {
      showToast(I18n.t('please_enter_role'));
      return false;
    }
    if (!yearsOfService.length) {
      showToast(I18n.t('please_select_yearsofservice'));
      return false;
    }
    if (!salary.length) {
      showToast(I18n.t('please_enter_salary'));
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
      console.log(obj);
      setUser(obj);
      // Initilize
      setJob(obj.job);
      setCompany(obj.company);
      sedtRole(obj.role);
      setYearsOfService(obj.yearsOfService);
      setSalary(obj.salary);
    });
  };

  const onSubmit = () => {
    if (isValid()) {
      let userInfo = {
        id: user.id,
        job: job,
        company: company,
        role: role,
        yearsOfService: yearsOfService,
        salary: salary,
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

  const jobInput = useRef(null);
  const companyInput = useRef(null);
  const roleInput = useRef(null);

  return (
    <Modal isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <View style={styles.container}>
        <Text style={styles.title}>Add Experience</Text>
        <Text style={styles.descriptionText}>
          Thank you for your registration, before we move forward please verify
          your email address
        </Text>
        <CsAutocompleteSelect
          theme={theme}
          placeholder={'Type Your Job Name'}
          label="Job"
        />
        <FloatingTextInput
          inputRef={companyInput}
          value={job}
          returnKeyType="next"
          keyboardType="default"
          textContentType="oneTimeCode"
          label={I18n.t('Company')}
          placeholder={'Type Your Company Name'}
          onChangeText={job => setJob(job)}
          theme={theme}
          key={'company_input'}
        />
        <FloatingTextInput
          inputRef={roleInput}
          value={role}
          returnKeyType="next"
          keyboardType="default"
          textContentType="oneTimeCode"
          label={I18n.t('Role')}
          placeholder={'Type Your Role Name'}
          onChangeText={job => setJob(job)}
          theme={theme}
          key={'role_input'}
        />
        <CsSelect
          placeholder="Select"
          label="Years of Service"
          options={[
            '0 - 2 years',
            '2 - 5 years',
            '5 - 7 years',
            '7 - 10 years',
            '10 - 12 years',
          ]}
          onSelect={value => setYearsOfService(value)}
          theme={theme}
          value={yearsOfService}
          key="csselect_yearsofservice"
        />
        <CsSelect
          placeholder="Select"
          label="Salary"
          options={[
            '$0-$50,000',
            '$50,000-$60,000',
            '$70,000-$80,000',
            '$80,000-$100,000',
          ]}
          theme={theme}
          value={salary}
          onSelect={value => setSalary(value)}
          key="csselect_salary"
        />
        <Button
          style={styles.submitBtn}
          title={I18n.t('update')}
          size="W"
          onPress={onSubmit}
          testID="login-submit"
          //   loading={isLoading}
          theme={theme}
          pressingHighlight
        />
      </View>
    </Modal>
  );
};

export default AddExperienceModal;
