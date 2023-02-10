import React from 'react';
import {Text, Image, View} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import {themes} from '../constants/colors';
import images from '../assets/images';

import I18n from '../i18n';

import {VectorIcon} from './VectorIcon';

const PopupMenu = React.memo(({theme, options, renderTrigger}) => (
  <Menu>
    <MenuTrigger
      customStyles={{
        triggerOuterWrapper: {
          paddingVertical: 0,
          width: 40,
          flex: 1,
        },
        triggerTouchable: {
          underlayColor: 'transparent',
          style: {
            flex: 1,
          },
        },
        triggerWrapper: {
          alignItems: 'flex-end',
          justifyContent: 'center',
          flex: 1,
        },
      }}>
      {renderTrigger()}
    </MenuTrigger>
    <MenuOptions
      customStyles={{
        optionsContainer: {
          backgroundColor: themes[theme].popupBackground,
          width: 200,
          padding: 10,
          marginTop: 40,
        },
        optionTouchable: {
          underlayColor: themes[theme].itemPressedColor,
          activeOpacity: 70,
        },
        optionText: {
          color: 'brown',
        },
      }}>
      <Text
        style={{
          fontSize: 16,
          fontFamily: 'Raleway',
          fontWeight: '600',
          color: themes[theme].titleColor,
          marginBottom: 10,
        }}>
        {I18n.t('take_action')}
      </Text>
      {options.map((item, key) => (
        <MenuOption key={key} onSelect={() => item.onPress()}>
          <View style={{flexDirection: 'row'}}>
            {item.title === I18n.t('edit_post') ? (
              <VectorIcon
                type="MaterialIcons"
                name="edit"
                size={18}
                color={themes[theme].activeTintColor}
              />
            ) : item.title === I18n.t('Remove') ? (
              <VectorIcon
                type="AntDesign"
                name="delete"
                size={18}
                color={themes[theme].activeTintColor}
              />
            ) : item.title === I18n.t('Report_post') ? (
              <VectorIcon
                type="MaterialIcons"
                name="report"
                size={18}
                color={themes[theme].activeTintColor}
              />
            ) : item.title === I18n.t('Block_user') ? (
              <VectorIcon
                type="MaterialIcons"
                name="block"
                size={18}
                color={themes[theme].activeTintColor}
              />
            ) : (
              <></>
            )}
            <Text
              style={{
                marginLeft: 5,
                color: item.danger ? 'red' : themes[theme].textColor,
              }}>
              {item.title}
            </Text>
          </View>
        </MenuOption>
      ))}
    </MenuOptions>
  </Menu>
));

export default PopupMenu;
