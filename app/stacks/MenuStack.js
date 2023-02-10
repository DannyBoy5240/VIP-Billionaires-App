import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { outsideHeader, themedHeader, StackAnimation } from '../utils/navigation'
import PrivacyAndSettingsView from '../views/PrivacyAndSettingsView'
import BlockView from '../views/BlockView'

// Outside
const Menu = createStackNavigator()
const MenuStack = () => {
  const theme = 'light'

  return (
    <Menu.Navigator
      screenOptions={{
        ...outsideHeader,
        ...themedHeader(theme),
        ...StackAnimation,
      }}>
      <Menu.Screen name="PrivacyAndSettings" component={PrivacyAndSettingsView} />
      <Menu.Screen name="Block" component={BlockView} />
    </Menu.Navigator>
  )
}

export default MenuStack
