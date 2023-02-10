import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
// Geo
// import ScrollView from 'react-native-nested-scroll-view';
import {TextInput} from 'react-native-paper';
import {
  COLOR_BLACK,
  COLOR_YELLOW,
  DARK_WEAK,
  themes,
} from '../constants/colors';
import sharedStyles from '../views/Styles';
import {VectorIcon} from './VectorIcon';
import scrollPersistTaps from '../utils/scrollPersistTaps';

import I18n from '../i18n';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    ...sharedStyles.textSemibold,
  },
  content: {
    position: 'relative',
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  selectContainer: {
    flex: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingBottom: 8,
    height: 104,
    width: '100%',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {x: 2, y: 2},
    shadowRadius: 4,
    elevation: 2,
    marginTop: 8,
    borderWidth: 1,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    borderRadius: 24,
    borderWidth: 1,
  },
  selectContent: {
    flexDirection: 'row',
  },
  headerContainer: {
    height: 36,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneText: {
    color: 'white',
    position: 'absolute',
    right: 4,
    top: 8,
    fontWeight: 'bold',
  },
  selectHeader: {
    textAlign: 'center',
    fontSize: 16,
  },
  selectedStyle: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#5790DF80',
  },
  selectStyle: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  selectValue: {
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
  },
  value: {
    marginRight: 12,
  },
  iconStyle: {
    position: 'absolute',
    right: 12,
  },
  textInput: {
    flex: 1,
    height: 50,
    marginBottom: 3,
    backgroundColor: 'white',
  },
  iconWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  genderBoxContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 48,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  labelText: {
    marginBottom: 8,
    marginLeft: 0,
  },
});

const SELECT_YEARS = ['Male', 'Female', 'No answer'];

const ExGender = props => {
  const [state, setState] = useState({
    show: props.value === 'Male' ? false : true,
    value: props.value,
  });
  const {show, value} = state;
  const {label, containerStyle, theme, error, outlineColor, backgroundColor} =
    props;

  const inputBox = useRef(null);

  // useEffect(() => {
  //   if (show) setState({...state, show: !props.topScrollEnable});
  // }, [props.topScrollEnable]);

  // const onChange = value => {
  //   setState({...state, value});
  //   props.action({value: value});
  //   if (inputBox.current) {
  //     inputBox.current.blur();
  //   }
  // };

  const setShow = show => {
    const {value} = props;

    if (show && value) {
      setState({...state, show, value: value});
    } else {
      setState({...state, show});
    }
    props.toggleShow(show);
  };

  const rightIcon = () => {
    return (
      <View style={styles.iconWrap}>
        <VectorIcon
          type={'Entypo'}
          name={show ? 'chevron-thin-up' : 'chevron-thin-down'}
          color={themes[theme].activeTintColor}
          size={18}
        />
      </View>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.labelText, {color: themes[theme].normalTextColor}]}>
        {label}
      </Text>
      {/* <TextInput
        ref={ref => {
          inputBox.current = ref
        }}
        label={label}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        value={String(value)}
        mode="outlined"
        style={[
          styles.textInput,
          {
            backgroundColor: backgroundColor ?? themes[theme].backgroundColor,
            fontSize: Platform.OS === 'ios' ? 14 : 13,
            lineHeight: Platform.OS === 'ios' ? 14 : 14,
          },
        ]}
        outlineColor={error ? '#DD2E2E' : outlineColor || '#888888'}
        activeOutlineColor={error ? '#DD2E2E' : themes[theme].infoText}
        theme={{
          roundness: 15,
          borderWidth: 1,
          colors: {
            text: themes[theme].activeTintColor,
            placeholder: themes[theme].infoText,
          },
        }}
        right={
          <TextInput.Icon
            name={rightIcon}
            style={{ marginTop: 15 }}
            onPress={() => setShow(!show)}
          />
        }
        showSoftInputOnFocus={false}
      />
      <View style={styles.content}>
        {show ? (
          <View style={[styles.selectContainer, { borderColor: themes[theme].activeTintColor }]}>
            <View style={styles.selectContent}>
              <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ marginVertical: 10 }}
                showsVerticalScrollIndicator={false}
                {...scrollPersistTaps}>
                {SELECT_YEARS.map(d => (
                  <TouchableOpacity
                    onPress={() => onChange(d)}
                    style={
                      d === value ? styles.selectedStyle : styles.selectStyle
                    }>
                    <Text style={[styles.selectValue, { color: themes[theme].activeTintColor }]}>{d}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        ) : null}
      </View> */}
      <View style={styles.content}>
        <TouchableOpacity
          style={[
            styles.genderBoxContainer,
            {borderColor: themes[theme].disableButtonBackground},
          ]}
          onPress={() => {
            setShow(false);
            props.action({value: 'Male'});
          }}>
          <Text
            style={[
              {
                color: !show
                  ? themes[theme].activeTintColor
                  : themes[theme].subTextColor,
              },
            ]}>
            {I18n.t('Male')}
          </Text>
          {!show ? (
            <View
              style={[
                styles.checkbox,
                {
                  color: themes[theme].normalTextColor,
                  backgroundColor: themes[theme].activeTintColor,
                },
              ]}>
              <VectorIcon
                type="Feather"
                name="check"
                size={18}
                color={themes[theme].backgroundColor}
              />
            </View>
          ) : (
            <></>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderBoxContainer,
            {
              borderColor: themes[theme].disableButtonBackground,
              marginLeft: 13,
            },
          ]}
          onPress={() => {
            setShow(true);
            props.action({value: 'Female'});
          }}>
          <Text
            style={[
              {
                color: show
                  ? themes[theme].activeTintColor
                  : themes[theme].subTextColor,
              },
            ]}>
            {I18n.t('Female')}
          </Text>
          {show ? (
            <View
              style={[
                styles.checkbox,
                {
                  color: themes[theme].normalTextColor,
                  backgroundColor: themes[theme].activeTintColor,
                },
              ]}>
              <VectorIcon
                type="Feather"
                name="check"
                size={18}
                color={themes[theme].backgroundColor}
              />
            </View>
          ) : (
            <></>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExGender;
