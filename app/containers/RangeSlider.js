import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Slider from 'rn-range-slider'
import { themes } from '../constants/colors'

const THUMB_RADIUS = 12
const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
  },
  labelText: {
    marginBottom: 8,
  },
  thumb: {
    width: THUMB_RADIUS * 2,
    height: THUMB_RADIUS * 2,
    borderRadius: THUMB_RADIUS,
    borderWidth: 2,
    borderColor: '#7f7f7f',
    backgroundColor: '#ffffff',
  },
  rail: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#7f7f7f',
  },
  railSelected: {
    height: 4,
    backgroundColor: '#4499ff',
    borderRadius: 2,
  },
  notch: {
    width: 8,
    height: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#4499ff',
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 8,
  },
  labelContainer: {
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#4499ff',
    borderRadius: 4,
  },
  label: {
    fontSize: 16,
    color: '#fff',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueText: {
    fontSize: 12,
  },
})

export const RangeSlider = ({ style, min, max, step, initValue, onValueChanged, label, theme }) => {
  const [low, setLow] = useState(initValue.low)
  const [high, setHigh] = useState(initValue.high)

  return (
    <View
      style={[styles.container, { borderColor: themes[theme].separatorColor }]}>
      <Text style={styles.labelText}>{label}</Text>
      <View style={styles.content}>
        <Text style={[styles.valueText, { color: themes[theme].actionColor }]}>
          {low}
        </Text>
        <Slider
          style={[style, { flexGrow: 1 }]}
          min={min}
          max={max}
          step={step}
          low={low}
          high={high}
          floatingLabel
          renderThumb={() => <View style={styles.thumb} />}
          renderRail={() => <View style={styles.rail} />}
          renderRailSelected={() => <View style={styles.railSelected} />}
          renderLabel={v => (
            <View style={styles.labelContainer}>
              <Text style={styles.label}>{v}</Text>
            </View>
          )}
          renderNotch={() => <View style={styles.notch} />}
          onValueChanged={(low, high) => {
            setLow(low)
            setHigh(high)
            onValueChanged(low, high)
          }}
        />
        <Text style={[styles.valueText, { color: themes[theme].actionColor }]}>
          {high}
        </Text>
      </View>
    </View>
  )
}
