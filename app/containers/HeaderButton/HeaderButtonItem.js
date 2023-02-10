import React from 'react';
import {Text, StyleSheet, Platform, TouchableOpacity, View} from 'react-native';
import {withTheme} from '../../theme';
import {
  COLOR_BLUE,
  COLOR_WHITE,
  COLOR_YELLOW,
  themes,
} from '../../constants/colors';
import sharedStyles from '../../views/Styles';
import {VectorIcon} from '../VectorIcon';

export const BUTTON_HIT_SLOP = {
  top: 5,
  right: 5,
  bottom: 5,
  left: 5,
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
  },
  headerTitleContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  title: {
    ...Platform.select({
      android: {
        fontSize: 14,
      },
      default: {
        fontSize: 17,
      },
    }),
    ...sharedStyles.textRegular,
  },
  icon: {
    padding: 4,
  },
});

const Item = ({
  title,
  titleStyle,
  iconName,
  onPress,
  testID,
  theme,
  badge,
  vector,
  size,
}) => (
  <TouchableOpacity
    onPress={onPress}
    testID={testID}
    hitSlop={BUTTON_HIT_SLOP}
    style={styles.container}>
    <>
      {iconName ? (
        <VectorIcon
          type={vector}
          name={iconName}
          size={size ?? 24}
          color={
            titleStyle
              ? themes[theme].headerTitleColor
              : themes[theme].headerTintColor
          }
        />
      ) : (
        <View style={[styles.headerTitleContainer]}>
          <Text style={[styles.title, {color: COLOR_BLUE}]}>{title}</Text>
        </View>
      )}
      {badge ? badge() : null}
    </>
  </TouchableOpacity>
);
Item.displayName = 'HeaderButton.Item';

export default withTheme(Item);
