import { View, Text } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper';

import styles from './style'
import images from '../../assets/images';
import { VectorIcon } from '../VectorIcon';

const ImageUploaded = ({ imageUrl, imageName }) => {
  return (
    <View style={styles.container}>
        <Avatar.Image size={56} source={imageUrl.length > 0 ? imageUrl: images.default_avatar} />
        <View style={styles.imageNameContainer}>
            <Text style={styles.imageName}>{imageName}</Text>
            <View style={styles.uploadIconAndText}>
                <VectorIcon type='MaterialIcons' name='cloud-upload' size={14} color='#F5BF4D' />
                <Text style={styles.uploadNewImageText}>
                    Upload new image
                </Text>
            </View>
        </View>
        <VectorIcon type='Ionicons' name='close-outline' size={20} color='#858585' style={styles.closeIcon} />
    </View>
  )
}

export default ImageUploaded