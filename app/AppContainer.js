import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import Navigation from './lib/Navigation';
import {getActiveRouteName, navigationTheme} from './utils/navigation';
import {
  ROOT_INSIDE,
  ROOT_INTRO,
  ROOT_LOADING,
  ROOT_OUTSIDE,
  ROOT_SPLASH,
  ROOT_THANK_YOU,
  ROOT_SIGNUP_PROFILE,
  ROOT_VERIFY_EMAIL,
  setRoute,
} from './actions/app';

// Stacks
import AuthLoadingView from './views/AuthLoadingView';
import IntroView from './views/IntroView';
import OutsideStack from './stacks/OutsideStack';
import {ThemeContext} from './theme';
import InsideStack from './stacks/InsideStack';
import ThankYouView from './views/ThankYouView';
import store from './lib/createStore';
import VerifyEmailView from './views/VerifyEmailView';
import SplashView from './views/SplashView';
import UpdateProfileAndBasicInfo from './views/UpdateProfileAndBasicInfo';

// App
const Stack = createStackNavigator();
const App = React.memo(({root, isMasterDetail}) => {
  if (!root) {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {theme} = useContext(ThemeContext);
  const navTheme = navigationTheme(theme);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const state = Navigation.navigationRef.current?.getRootState();
    Navigation.routeNameRef.current = getActiveRouteName(state);
  }, []);

  return (
    <NavigationContainer
      theme={navTheme}
      ref={Navigation.navigationRef}
      onStateChange={state => {
        const routeName = getActiveRouteName(state);
        store.dispatch(setRoute(routeName));
        Navigation.routeNameRef.current = routeName;
      }}>
      <Stack.Navigator
        screenOptions={{headerShown: false, animationEnabled: false}}
        initialRouteName="OutsideStack">
        <>
          {root === ROOT_SPLASH ? (
            <Stack.Screen name="Splash" component={SplashView} />
          ) : null}
          {root === ROOT_INTRO ? (
            <Stack.Screen name="Splash" component={IntroView} />
          ) : null}
          {root === ROOT_LOADING ? (
            <Stack.Screen name="AuthLoading" component={AuthLoadingView} />
          ) : null}
          {root === ROOT_OUTSIDE ? (
            <Stack.Screen name="OutsideStack" component={OutsideStack} />
          ) : null}
          {root === ROOT_INSIDE ? (
            <Stack.Screen name="InsideStack" component={InsideStack} />
          ) : null}
          {root === ROOT_VERIFY_EMAIL ? (
            <Stack.Screen name="VerifyEmail" component={VerifyEmailView} />
          ) : null}
          {root === ROOT_THANK_YOU ? (
            <Stack.Screen name="ThankYou" component={ThankYouView} />
          ) : null}
          {root === ROOT_SIGNUP_PROFILE ? (
            <Stack.Screen
              name="SignUpProfile"
              component={UpdateProfileAndBasicInfo}
            />
          ) : null}
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
});
const mapStateToProps = state => ({
  root: state.app.root,
  isMasterDetail: state.app.isMasterDetail,
});

const AppContainer = connect(mapStateToProps)(App);
export default AppContainer;
