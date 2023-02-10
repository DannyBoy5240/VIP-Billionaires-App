import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import images from '../assets/images'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  rateContainer: {
    marginHorizontal: 2,
  },
  rateImage: {
    width: 20,
    height: 20,
  },
})

export const Rating = ({ value, onChangeRating, size = 20, changeable = true }) => {
  const onChangeValue = rate => {
    onChangeRating(rate)
  }
  return (
    <View style={styles.container}>
      {[0, 1, 2, 3, 4].map(i => (
        <TouchableOpacity
          key={i}
          disabled={!changeable}
          onPress={() => onChangeValue(i + 1)}
          style={styles.rateContainer}>
          <Image
            source={i < value ? images.ic_rate_select : images.ic_rate_unselect}
            style={{ width: size, height: size }}
          />
        </TouchableOpacity>
      ))}
    </View>
  )
}
