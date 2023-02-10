import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
// Geo
// import ScrollView from 'react-native-nested-scroll-view';
import { TextInput } from 'react-native-paper'

import I18n from '../i18n'
import { themes } from '../constants/colors'
import sharedStyles from '../views/Styles'
import { VectorIcon } from './VectorIcon'
import scrollPersistTaps from '../utils/scrollPersistTaps'

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
  },
  selectContainer: {
    flex: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingBottom: 8,
    height: 150,
    width: '100%',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { x: 2, y: 2 },
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: 'white',
    marginTop: 8,
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
    color: 'black',
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
})

const SELECT_SALARIES = [
  I18n.t('Salary_select_1'),
  I18n.t('Salary_select_2'),
  I18n.t('Salary_select_3'),
  I18n.t('Salary_select_4'),
  I18n.t('Salary_select_5'),
  I18n.t('Salary_select_6'),
  I18n.t('Salary_select_7'),
]

const ExSalary = (props) => {
  const [state, setState] = useState({
    show: false,
    value: props.value,
  })
  const { show, value } = state
  const {
    label,
    containerStyle,
    theme,
    error,
  } = props

  const inputBox = useRef(null)

  useEffect(() => {
    if (show)
      setState({ ...state, show: !props.topScrollEnable })
  }, [props.topScrollEnable])

  const onChange = value => {
    setState({ ...state, value })
    props.action({ value: value })
    inputBox.current.blur()
  }

  const setShow = show => {
    const { value } = props

    if (show && value) {
      setState({ ...state, show, value: value })
    } else {
      setState({ ...state, show })
    }
    props.toggleShow(show)
  }

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
    )
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.content}>
        <TextInput
          ref={ref => {inputBox.current = ref}}
          label={label}
          onFocus={() => setShow(true)}
          onBlur={() => setShow(false)}
          value={SELECT_SALARIES[value]}
          mode="outlined"
          style={[styles.textInput, {
            fontSize: Platform.OS === 'ios' ? 14 : 13,
            lineHeight: Platform.OS === 'ios' ? 14 : 14,
          }]}
          outlineColor={error ? '#DD2E2E' : '#888888'}
          activeOutlineColor={error ? '#DD2E2E' : '#222222'}
          theme={{ roundness: 15, borderWidth: 1 }}
          right={
            <TextInput.Icon
              name={rightIcon}
              style={{ marginTop: 15 }}
              onPress={() => setShow(!show)}
            />
          }
          showSoftInputOnFocus={false}
        />
        {show ? (
          <View style={styles.selectContainer}>
            <View style={styles.selectContent}>
              <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingVertical: 10 }}
                showsVerticalScrollIndicator={false}
                {...scrollPersistTaps}
              >
                {SELECT_SALARIES.map((d, index) => (
                  <TouchableOpacity
                    onPress={() => onChange(index)}
                    style={
                      index === value
                        ? styles.selectedStyle
                        : styles.selectStyle
                    }>
                    <Text style={styles.selectValue}>{d}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        ) : null}
      </View>
    </View>
  )
}

export default ExSalary
