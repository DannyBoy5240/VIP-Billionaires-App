import React from 'react';
import {View, StyleSheet, Text, Pressable, Dimensions} from 'react-native';

import sharedStyles from '../views/Styles';
import {COLOR_DANGER, themes} from '../constants/colors';
import {Genders} from '../constants/app';
import {VectorIcon} from './VectorIcon';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
    width: width * 0.92,
    alignSelf: 'center',
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    fontFamily: 'Raleway',
  },
  required: {
    marginBottom: 10,
    color: COLOR_DANGER,
    fontSize: 14,
    fontWeight: '700',
  },
  selectText: {
    ...sharedStyles.textRegular,
    fontSize: 14,
  },
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',
  },
  optionContainer: {
    borderWidth: 1,
    borderColor: '#C4C4C4',
    flexDirection: 'row',
    height: 48,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 11,
    borderRadius: 8,
    // marginHorizontal: 3
    width: '49%',
  },
  optionText: {
    fontFamily: 'Raleway',
  },
});

const CsSelectGender = props => {
  const {label, value, required, containerStyle, theme} = props;

  const setCheck = value => {
    props.onChange(value);
  };

  return (
    <View style={[styles.inputContainer, containerStyle]}>
      {label ? (
        <Text
          contentDescription={null}
          accessibilityLabel={null}
          style={[styles.label, {color: themes[theme].normalTextColor}]}>
          {label}
          {required ? (
            <Text
              contentDescription={null}
              accessibilityLabel={null}
              style={[styles.required]}>{` ${required}`}</Text>
          ) : null}
        </Text>
      ) : null}
      <View style={styles.wrap}>
        {Genders.map((val, index) => (
          <Pressable
            onPress={() => setCheck(val.value)}
            key={index}
            style={styles.optionContainer}>
            <Text
              style={[
                styles.selectText,
                {color: value === val.value ? '#2F3131' : '#C4C4C4'},
              ]}>
              {val.text}
            </Text>
            {value === val.value && (
              <VectorIcon
                type="AntDesign"
                name="checkcircle"
                color="#858585"
                size={18}
              />
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default CsSelectGender;
