import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Platform, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { DATE_STRING_FORMAT, TIME_STRING_FORMAT } from '../utils/datetime';
import { themes } from '../constants/colors';
import sharedStyles from '../views/Styles';
import { isIOS } from '../utils/deviceInfo';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'grey',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    width: 80,
    paddingLeft: 8,
    paddingVertical: 4,
    ...sharedStyles.textSemibold,
  },
  input: {
    ...sharedStyles.textRegular,
    fontSize: 16,
    paddingHorizontal: isIOS ? 8 : 14,
    paddingVertical: 4,
    flexGrow: 1,
  },
});

export default function CsDatePicker({
  label,
  containerStyle,
  placeholder,
  style,
  type,
  value,
  action,
  minimumDate,
  theme,
}) {
  const [show, onShow] = useState(false);
  const [currentDate, onChangeDate] = useState(value);

  const onChange = ({ nativeEvent: { timestamp } }, date) => {
    if (Platform.OS === 'android') {
      onShow(false);
    }
    if (type === 'date') {
      console.log('date', date);
      if (!date) {
        return;
      }
      const newDate = date;
      onChangeDate(newDate);
      action({ value: moment(newDate).format(DATE_STRING_FORMAT) });
    } else {
      console.log('time', timestamp);
      if (!timestamp) {
        return;
      }
      const newDate = new Date(timestamp);
      onChangeDate(newDate);
      action({ value: moment(newDate).format(TIME_STRING_FORMAT) });
    }
  };

  // const getTimeString = date => {
  //   let hours = date.getHours();
  //   let minutes = date.getMinutes();
  //   let ampm = hours >= 12 ? 'PM' : 'AM';
  //   hours = hours % 12;
  //   hours = hours ? hours : 12; // the hour '0' should be '12'
  //   minutes = minutes < 10 ? '0' + minutes : minutes;
  //   let strTime = hours + ':' + minutes + ' ' + ampm;
  //   return strTime;
  // };

  if (Platform.OS === 'ios') {
    return (
      <View style={[styles.container, containerStyle]}>
        {label ? (
          <Text
            contentDescription={null}
            accessibilityLabel={null}
            style={[styles.label, { color: themes[theme].infoText }]}>
            {label}
          </Text>
        ) : null}
        <DateTimePicker
          testID='date-time-picker'
          style={{ width: 116 }}
          mode={type}
          is24Hour={true}
          display="default"
          minimumDate={minimumDate}
          value={currentDate ?? new Date()}
          onChange={onChange}
          textColor={'black'}
          themeVariant={'light'}
        />
      </View>
    );
  }

  let button = (
    <TouchableOpacity style={styles.input} onPress={() => onShow(!show)}>
      <Text>
        {currentDate
          ? moment(currentDate).format(
            type === 'date' ? DATE_STRING_FORMAT : TIME_STRING_FORMAT,
          )
          : placeholder}
      </Text>
    </TouchableOpacity>
  );

  const content = show ? (
    <DateTimePicker
      style={style}
      mode={type}
      display="default"
      minimumDate={minimumDate}
      value={currentDate ?? new Date()}
      onChange={onChange}
      textColor={'black'}
    />
  ) : null;

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? (
        <Text
          contentDescription={null}
          accessibilityLabel={null}
          style={[styles.label, { color: themes[theme].infoText }]}>
          {label}
        </Text>
      ) : null}
      {button}
      {content}
    </View>
  );
}
