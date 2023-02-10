import React, { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import { Provider } from 'react-redux'
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context'
import { MenuProvider } from 'react-native-popup-menu'
import { defaultTheme, subscribeTheme } from './utils/theme'
import store from './lib/createStore'
import { ThemeContext } from './theme'
import { DimensionsContext } from './dimensions'
import { ActionSheetProvider } from './containers/ActionSheet'
import AppContainer from './AppContainer'
import InAppNotification from './containers/InAppNotification'
import Toast from './containers/Toast'
import debounce from './utils/debounce'

const Root = () => {
  const [state, setState] = useState({
    theme: defaultTheme(),
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    scale: Dimensions.get('window').scale,
    fontScale: Dimensions.get('window').fontScale,
  })

  const { theme, width, height, scale, fontScale } = state

  useEffect(() => {
    Dimensions.addEventListener('change', onDimensionsChange)
  }, [])

  useEffect(() => {
    setTheme('dark')
    // setTheme('light')
    // let timer = setInterval(() => {
    //   const hour = new Date().getHours()
    //   if (!theme) {
    //     setTheme('light')
    //   } else if (theme === 'dark' && hour >= 6 && hour <= 17) {
    //     setTheme('light')
    //   } else if (theme === 'light' && (hour < 6 || hour >= 18)) {
    //     setTheme('dark')
    //   }
    // }, 1000)
    // return () => {
    //   if (timer) {
    //     clearInterval(timer)
    //   }
    // }
  }, [theme])

  const onDimensionsChange = debounce(
    ({ window: { width, height, scale, fontScale } }) => {
      setDimensions({
        width,
        height,
        scale,
        fontScale,
      })
    },
  )

  const setTheme = (newTheme = {}) => {
    // change theme state
    setState({ ...state, theme: newTheme })
    // subscribe to Appearance changes
    subscribeTheme(theme)
  }

  const setDimensions = ({ width, height, scale, fontScale }) => {
    setState({
      ...state,
      width,
      height,
      scale,
      fontScale,
    })
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Provider store={store}>
        <ThemeContext.Provider
          value={{
            theme,
            setTheme: setTheme,
          }}>
          <DimensionsContext.Provider
            value={{
              width,
              height,
              scale,
              fontScale,
              setDimensions: setDimensions,
            }}>
            <MenuProvider>
              <ActionSheetProvider>
                <AppContainer />
                <InAppNotification />
                <Toast />
              </ActionSheetProvider>
            </MenuProvider>
          </DimensionsContext.Provider>
        </ThemeContext.Provider>
      </Provider>
    </SafeAreaProvider>
  )
}

export default Root
