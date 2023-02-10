import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import I18n from '../../i18n';
import images from '../../assets/images';
import { withTheme } from '../../theme';
import { themes } from '../../constants/colors';

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
    marginHorizontal: 8,
    fontSize: 16,
    marginTop: 14,
  },
  iconStyle: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

const NoFriends = ({ onPress, theme }) => {
  const tabbarHeight = useBottomTabBarHeight();
  return (
    <View style={[styles.btnContainer, { marginBottom: tabbarHeight }]}>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Image
          source={
            theme === 'light'
              ? images.btn_activity_blank
              : images.btn_activity_blank_dark
          }
          style={styles.iconStyle}
        />
        <Text style={[styles.titleText, { color: themes[theme].activeTintColor }]}>{I18n.t('No_friends')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default withTheme(NoFriends);
