import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './LhComp/RefNavigation';
import LhHome from './LhSrc/LhHome';
import LhSP from './LhSrc/LhSP';
import LhFav from './LhSrc/LhFav';
import LhCart from './LhSrc/LhCart';
import LhContact from './LhSrc/LhContact';
import LhConfirmOrder from './LhSrc/LhConfirmOrder';
// import LhSearch from './LhSrc/LhSearch';
const Stack = createStackNavigator();

function Routes(props) {
  return (
    <NavigationContainer
      ref={(ref) => {
        Navigator.InitializeRefNavigation(ref);
      }}>
      <Stack.Navigator
        initialRouteName="LhHome"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="LhHome" component={LhHome} />
        <Stack.Screen name="LhSP" component={LhSP} />
        <Stack.Screen name="LhFav" component={LhFav} />
        <Stack.Screen name="LhCart" component={LhCart} />
        <Stack.Screen name="LhContact" component={LhContact} />
        <Stack.Screen name="LhConfirmOrder" component={LhConfirmOrder} />
        {/* <Stack.Screen name="LhSearch" component={LhSearch} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
