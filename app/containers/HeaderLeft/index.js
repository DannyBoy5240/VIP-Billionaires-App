import * as React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Icon} from '../List';
import {ThemeContext} from '../../theme';
import {themes} from '../../constants/colors';

export default function HeaderLeft({props, to}) {
  const {theme} = React.useContext(ThemeContext);
  const goto = () => {
    if (to) {
      props.navigation.navigate(to);
    } else {
      props.navigation.goBack();
    }
  };

  return (
    <View style={styles.headerLeft}>
      <TouchableOpacity style={styles.headerLeft} onPress={() => goto()}>
        <Icon size={32} name="arrow-left" style={{color: 'blue'}} />
        <Text style={{marginHorizontal: 8, color: themes[theme].headerColor}}>
          Back
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerLeft: {
    marginHorizontal: 4,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
