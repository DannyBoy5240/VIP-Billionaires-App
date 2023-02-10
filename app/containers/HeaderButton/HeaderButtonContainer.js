import React from 'react';
import {View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  left: {
    marginLeft: 5,
  },
  right: {
    marginRight: 5,
  },
});

const Container = ({children, left}) => (
  <View style={[styles.container, left ? styles.left : styles.right]}>
    {children}
  </View>
);

Container.defaultProps = {
  left: false,
};

Container.displayName = 'HeaderButton.Container';

export default Container;
