import React from "react"
import { Dimensions,Image } from "react-native"
import { themes } from "../../constants/colors"
import { useTheme } from "../../theme"

import images from '../../assets/images'
import styles from "./style"

const TabBarImage = (props) => {
  
    const { width, height } = Dimensions.get('window');
    // const aspectRatio = 700/500;

    const { theme } = useTheme()

    const originalWidth = 319;
    const originalHeight = 120;
    const windowWidth = Dimensions.get("window").width;
    const aspectRatio = windowWidth / originalHeight;

    return (
      <Image
        source={theme == 'light' ? images.tabBar_light : images.tabBar_dark}
        style={styles.tabBarImage}
      />
    );
}

export default TabBarImage
