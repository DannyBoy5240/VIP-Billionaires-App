import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { outsideHeader, themedHeader, StackAnimation } from '../utils/navigation'
import SignInView from '../views/SignInView'
import ForgotPasswordView from '../views/ForgotPasswordView'
import UpdatePasswordView from '../views/UpdatePasswordView'
import SignUpView from '../views/SignUpView'
import OnBoardingView from '../views/OnBoardingView'
import AboutView from '../views/AboutView'
import { COLOR_WHITE, themes } from '../constants/colors'
import HeaderLeft from '../containers/HeaderLeft'

// Outside
const Outside = createStackNavigator()
const OutsideStack = () => {
  const theme = 'light'

  return (
    <Outside.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        ...outsideHeader,
        ...themedHeader(theme),
        ...StackAnimation,
      }}
    >
      <Outside.Screen
        name="OnBoard"
        component={OnBoardingView}
        options={{ headerShown: false }}
      />
      <Outside.Screen
        name="SignIn"
        component={SignInView}
        options={{ headerShown: false }}
      />
      <Outside.Screen
        name="ForgotPassword"
        component={ForgotPasswordView}
        options={{ headerShown: false }}
      />
      <Outside.Screen
        name="UpdatePassword"
        component={UpdatePasswordView}
        options={(navigation) => ({
          headerShown: true,
          headerLeft: () => <HeaderLeft props={navigation} />,
          headerTitle: () => <></>,
          gestureEnabled: false,
          headerStyle: { backgroundColor: COLOR_WHITE },
        })}
      />
      <Outside.Screen
        name="SignUp"
        component={SignUpView}
        options={{ headerShown: false }}
      />
      <Outside.Screen name="About" component={AboutView} />
    </Outside.Navigator>
  )
}

export default OutsideStack
