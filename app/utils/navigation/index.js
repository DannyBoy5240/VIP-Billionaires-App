import React from 'react'
import { DefaultTheme, DarkTheme } from '@react-navigation/native'

import { themes } from '../../constants/colors'
import I18n from '../../i18n'

export * from './animations'

export const defaultHeader = {
  headerBackTitleVisible: false,
  cardOverlayEnabled: true,
  cardStyle: { backgroundColor: 'transparent' },
}

export const outsideHeader = {
  headerBackTitle: I18n.t('Back'),
  headerLayoutPreset: 'center',
}

export const cardStyle = {
  backgroundColor: 'rgba(0,0,0,0)',
}

export const borderBottom = theme => ({
  borderBottomWidth: 0,
  elevation: 0,
  shadowOpacity: 0,
})

export const themedHeader = theme => ({
  headerStyle: {
    ...borderBottom(theme),
    backgroundColor: themes[theme].backgroundColor,
  },
  headerTintColor: themes[theme].backgroundColor,
  headerTitleStyle: {
    color: themes[theme].titleColor,
    alignSelf: 'center',
  },
})

export const navigationTheme = theme => {
  const defaultNavTheme = theme === 'light' ? DefaultTheme : DarkTheme

  return {
    ...defaultNavTheme,
    colors: {
      ...defaultNavTheme.colors,
      background: themes[theme].backgroundColor,
      border: themes[theme].focusedBackground,
    },
  }
}

// Gets the current screen from navigation state
export const getActiveRoute = state => {
  const route = state?.routes[state?.index]

  if (route?.state) {
    // Dive into nested navigators
    return getActiveRoute(route.state)
  }

  return route
}

export const getActiveRouteName = state => getActiveRoute(state)?.name
