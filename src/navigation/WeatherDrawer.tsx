import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import type { WeatherDrawerParamList } from './types';
import CurrentWeatherScreen from '../screens/weather/CurrentWeatherScreen';
import ForecastTabsNavigator from './ForecastTabsNavigator';

const Drawer = createDrawerNavigator<WeatherDrawerParamList>();

const WeatherDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Current"
      screenOptions={{
        headerTitleAlign: 'center',
        drawerPosition: 'left',
      }}
    >
      <Drawer.Screen
        name="Current"
        component={CurrentWeatherScreen}
        options={{ title: 'Current Weather' }}
      />
      <Drawer.Screen
        name="ForecastTabs"
        component={ForecastTabsNavigator}
        options={{ title: 'Forecast' }}
      />
    </Drawer.Navigator>
  );
};

export default WeatherDrawer;