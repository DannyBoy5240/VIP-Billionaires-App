import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import images from '../../assets/images';
import {COLOR_GRAY_DARK, themes} from '../../constants/colors';
import {withTheme} from '../../theme';
import moment from 'moment/moment';

const Content = React.memo(
  ({msg, createdAt, photo, isOwn, onPressMedia, theme}) => {
    if (photo) {
      return (
        <TouchableOpacity
          onPress={onPressMedia}
          style={[styles.photoInnerContent]}>
          <Image
            source={images.chat_background_regular}
            style={[
              isOwn ? styles.contentBackground : styles.contentOtherBackground,
              isOwn
                ? {tintColor: themes[theme].messageOwnBackground}
                : {tintColor: themes[theme].messageOtherBackground},
            ]}
          />
          <View
            style={[
              isOwn ? styles.imageMsg : styles.imageOtherMsg,
              isOwn
                ? {backgroundColor: themes[theme].messageOwnBackground}
                : {backgroundColor: themes[theme].messageOtherBackground},
            ]}>
            <Image
              source={{uri: photo}}
              resizeMode={'contain'}
              style={styles.photoMessage}
            />
          </View>
          <View style={{paddingHorizontal: 6}}>
            <Text style={[styles.messageTimeText, {color: COLOR_GRAY_DARK}]}>
              {moment(createdAt).format('DD MMM hh:mm').toUpperCase()}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <View>
        <View
          style={[
            styles.messageInnerContent,
            {
              backgroundColor: isOwn
                ? themes[theme].messageOwnBackground
                : themes[theme].messageOtherBackground,
              borderTopRightRadius: isOwn ? 0 : 30,
              borderBottomLeftRadius: isOwn ? 30 : 0,
            },
          ]}>
          <Text
            style={[
              styles.messageText,
              {
                color: isOwn
                  ? themes[theme].textColor
                  : themes[theme].activeTintColor,
              },
            ]}>
            {msg}
          </Text>
        </View>
        <View style={{paddingHorizontal: 6}}>
          <Text style={[styles.messageTimeText, {color: COLOR_GRAY_DARK}]}>
            {moment(createdAt).format('DD MMM hh:mm').toUpperCase()}
          </Text>
        </View>
      </View>
    );
  },
);

Content.displayName = 'MessageContent';

export default withTheme(Content);
