import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

import images from '../../assets/images';
import { themes } from '../../constants/colors';
import I18n from '../../i18n';
import { withTheme } from '../../theme';
const styles = StyleSheet.create({
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  container: {
    alignItems: 'center',
  },
  titleText: {
    marginHorizontal: 75,
    fontSize: 20,
    marginBottom: 40,
    marginTop: 14,
    textAlign: 'center',
    lineHeight: 35,
  },
  noActivity: {
    fontSize: 25,
    marginTop: 20,
    textAlign: 'center',
    lineHeight: 35,
    fontWeight: '500',
  },
  iconStyle: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

const NoFriends = ({ onPress, theme }) => (
  <View style={styles.btnContainer}>
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={
          theme === 'light'
            ? images.btn_activity_blank
            : images.btn_activity_blank_dark
        }
        style={styles.iconStyle}
      />
    </TouchableOpacity>
    <Text style={[styles.noActivity, { color: themes[theme].activeTintColor }]}>
      {I18n.t('no_activity')}
    </Text>
    <Text style={[styles.titleText, { color: themes[theme].activeTintColor }]}>
      {I18n.t('No_activity')}
    </Text>
  </View>
);

export default withTheme(NoFriends);
