import React, {useState} from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import {themes} from '../constants/colors';
import {VectorIcon} from './VectorIcon';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width * 0.92,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingLeft: 10,
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    height: 56,
    borderColor: '#C4C4C4',
    marginBottom: 15,
  },
  label: {
    fontFamily: 'Raleway',
    fontWeight: '400',
    color: '#C4C4C4',
    marginBottom: 5,
    fontSize: 14,
  },
});

const CsAutocompleteSelect = ({
  leftIcon,
  data,
  onSelectItem,
  placeholder,
  theme,
  label,
}) => {
  const [show, setShow] = useState(false);

  const RightIcon = () => {
    return (
      <VectorIcon
        type={'Entypo'}
        name={show ? 'chevron-thin-up' : 'chevron-thin-right'}
        color={themes[theme].activeTintColor}
        size={18}
      />
    );
  };

  return (
    <>
      {label && (
        <Text style={[styles.label, themes[theme].normalTextColor]}>
          {label}
        </Text>
      )}
      <View style={styles.container}>
        <AutocompleteDropdown
          clearOnFocus={false}
          closeOnBlur={true}
          closeOnSubmit={false}
          dataSet={data}
          onSelectItem={onSelectItem}
          textInputProps={{
            placeholder: placeholder,
            autoCorrect: false,
            autoCapitalize: 'none',
            style: {
              fontFamily: 'Raleway',
              color: themes[theme].activeTintColor,
              fontSize: 14,
            },
          }}
          inputContainerStyle={{
            backgroundColor: 'transparent',
            alignSelf: 'flex-end',
          }}
          suggestionsListContainerStyle={{
            width: width * 0.76,
            marginLeft: -40,
            backgroundColor: themes[theme].backgroundColor,
          }}
          containerStyle={{width: '95%'}}
          showChevron={false}
        />
        <RightIcon />
      </View>
    </>
  );
};

export default CsAutocompleteSelect;
