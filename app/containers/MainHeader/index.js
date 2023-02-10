import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {Avatar} from 'react-native-paper';

import styles from './style';
import {useTheme} from '../../theme';
import images from '../../assets/images';
import {VectorIcon} from '../VectorIcon';
import {useNavigation} from '@react-navigation/native';
import {themes} from '../../constants/colors';

const MainHeader = ({avatarImage, onChangeText, ...otherInputProps}) => {
  const {theme} = useTheme();

  const [showSearchIcon, setShowSearchIcon] = useState(true);

  const inputRef = useRef();
  const navigation = useNavigation();

  const focusInput = () => {
    setShowSearchIcon(false);
    setTimeout(() => {
      inputRef.current.focus();
    }, 100);
  };

  const clearInputFocus = () => {
    inputRef.current.clear();
    setTimeout(() => {
      setShowSearchIcon(true);
    }, 100);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        {/* <VectorIcon type="MaterialCommunityIcons" name="menu" color={themes[theme].titleColor} size={24} /> */}
        <Image source={images.menu_item} style={{width: 21, height: 15}} />
      </TouchableOpacity>
      {showSearchIcon ? (
        <Pressable style={styles.searchAndInput} onPress={focusInput}>
          <VectorIcon
            type="MaterialCommunityIcons"
            name="magnify"
            color="#828282"
            size={24}
          />
          <Text style={styles.searchHereText}>Search Here</Text>
        </Pressable>
      ) : (
        <>
          <TextInput
            ref={inputRef}
            style={[styles.input, {color: themes[theme].textColor}]}
            onChangeText={onChangeText}
            {...otherInputProps}
            onFocus={() => setShowSearchIcon(false)}
          />
          <VectorIcon
            type="AntDesign"
            name="close"
            color="#828282"
            style={styles.closeIcon}
            onPress={clearInputFocus}
            size={18}
          />
        </>
      )}
      {/* <Avatar.Image
        source={avatarImage.length > 0 ? avatarImage : images.default_avatar}
        style={styles.avatarImage}
        size={32}
      /> */}
      <Image
        source={
          avatarImage && avatarImage.length > 0
            ? {uri: avatarImage}
            : images.default_avatar
        }
        style={[styles.avatarImage, {borderColor: themes[theme].avatarBorder}]}
      />
    </View>
  );
};

export default MainHeader;
