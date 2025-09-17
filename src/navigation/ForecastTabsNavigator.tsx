import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { ForecastTabsParamList } from './types';
import ForecastScreen from '../screens/weather/ForecastScreen';

const Tab = createBottomTabNavigator<ForecastTabsParamList>();

const ForecastTabsNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Tab.Screen
        name="Forecast3"
        component={ForecastScreen}
        options={{ title: '3 Days' }}
        initialParams={{ days: 3 }}
      />
      <Tab.Screen
        name="Forecast7"
        component={ForecastScreen}
        options={{ title: '7 Days' }}
        initialParams={{ days: 7 }}
      />
    </Tab.Navigator>
  );
};

export default ForecastTabsNavigator;