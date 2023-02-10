import React from 'react';
import {isIOS} from '../../utils/deviceInfo';
import I18n from '../../i18n';
import Container from './HeaderButtonContainer';
import Item from './HeaderButtonItem';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import images from '../../assets/images';

const styles = StyleSheet.create({
  icon: {
    width: 44,
    height: 44,
    resizeMode: 'contain',
    marginHorizontal: 19,
  },
});

// Left
export const Drawer = React.memo(({navigation, theme, testID, ...props}) => (
  <Container left>
    <TouchableOpacity testID={testID} onPress={navigation.toggleDrawer}>
      <Image
        source={theme === 'light' ? images.side_menu : images.side_menu_dark}
        style={styles.icon}
      />
    </TouchableOpacity>
  </Container>
));

export const CloseButtonGoTop = React.memo(({navigation, testID}) => (
  <Container left>
    <Item
      title="close"
      iconName="close"
      onPress={() => navigation.pop()}
      testID={testID}
    />
  </Container>
));

export const CloseGoSignIn = React.memo(({navigation, testID}) => (
  <Container left>
    <Item
      title="close"
      iconName="close"
      onPress={() => navigation.replace('LoginView')}
      testID={testID}
    />
  </Container>
));

export const CloseModal = React.memo(
  ({navigation, testID, onPress = () => navigation.pop(), ...props}) => (
    <Container left>
      <Item iconName="close" onPress={onPress} testID={testID} {...props} />
    </Container>
  ),
);

export const CancelModal = React.memo(({onPress, testID}) => (
  <Container left>
    {isIOS ? (
      <Item title={I18n.t('Cancel')} onPress={onPress} testID={testID} />
    ) : (
      <Item iconName="close" onPress={onPress} testID={testID} />
    )}
  </Container>
));

// Right
export const More = React.memo(({onPress, testID}) => (
  <Container>
    <Item
      iconName="more-vert"
      vector="MaterialIcons"
      size={24}
      onPress={onPress}
      testID={testID}
    />
  </Container>
));

export const Contact = React.memo(({navigation, testID, ...props}) => (
  <Container>
    <Item
      iconName="edit"
      vector="Feather"
      size={20}
      onPress={() => navigation.push('Contact')}
      testID={testID}
      {...props}
    />
  </Container>
));

export const Save = React.memo(({onPress, testID, ...props}) => (
  <Container>
    <Item title={I18n.t('Save')} onPress={onPress} testID={testID} {...props} />
  </Container>
));

export const Complete = React.memo(({onPress, testID, ...props}) => (
  <Container>
    <Item
      title={I18n.t('Complete')}
      onPress={onPress}
      testID={testID}
      {...props}
    />
  </Container>
));

export const Publish = React.memo(({onPress, testID, ...props}) => (
  <Container>
    <Item
      title={I18n.t('Publish')}
      onPress={onPress}
      testID={testID}
      {...props}
    />
  </Container>
));

export const Next = React.memo(({onPress, testID, ...props}) => (
  <Container>
    <Item title={I18n.t('Next')} onPress={onPress} testID={testID} {...props} />
  </Container>
));

export const Report = React.memo(({onPress, testID, ...props}) => (
  <Container>
    <Item
      iconName="flag"
      vector="MaterialIcons"
      size={20}
      onPress={onPress}
      testID={testID}
      {...props}
    />
  </Container>
));

export const Search = React.memo(({navigation, theme, testID, ...props}) => (
  <Container>
    <TouchableOpacity testID={testID} onPress={() => navigation.push('Friend')}>
      <Image
        source={theme === 'light' ? images.search_light : images.search_dark}
        style={styles.icon}
      />
    </TouchableOpacity>
  </Container>
));

export const Cart = React.memo(({navigation, testID, ...props}) => (
  <Container>
    <Item
      iconName="cart"
      vector="Ionicons"
      size={24}
      onPress={() => navigation.replace('CheckOut')}
      testID={testID}
      {...props}
    />
  </Container>
));
