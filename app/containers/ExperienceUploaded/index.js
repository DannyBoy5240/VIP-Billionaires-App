import { View, Text } from 'react-native'
import React from 'react'

import styles from './stlye'
import { VectorIcon } from '../VectorIcon'
import { themes } from '../../constants/colors'
import { useTheme } from '../../theme'


const ExperienceUploaded = ({ salary, jobTitle, companyName, numberOfYears, showCloseIcon }) => {

  const { theme } = useTheme()

  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.jobTitle, { color: themes[theme].titleColor }]}>{jobTitle}</Text>
        <Text style={[styles.companyNameAndNumberOfYears, { color: themes[theme].titleColor }]}>
          {companyName} | {numberOfYears} years
        </Text>
        <Text style={{color: '#858585'}}>
          {' '}
          <Text style={[styles.salaryText]}>{salary},000</Text> USD / per month{' '}
        </Text>
      </View>
      {showCloseIcon && (
        <VectorIcon
          type="Ionicons"
          name="close-outline"
          size={20}
          color="#858585"
          style={styles.closeIcon}
        />
      )}
    </View>
  );
}

export default ExperienceUploaded