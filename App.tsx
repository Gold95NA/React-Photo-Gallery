import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import type { DrawerParamList } from './src/navigation/types';
import PhotoStack from './src/navigation/PhotoStack';
import WeatherDrawer from './src/navigation/WeatherDrawer';

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="HW_PhotoGallery"
        screenOptions={{
          headerShown: false,
          drawerPosition: 'right',
          swipeEnabled: true,
        }}
      >
        <Drawer.Screen
          name="HW_PhotoGallery"
          component={PhotoStack}
          options={{ drawerLabel: 'Homework — Photo Gallery' }}
        />
        <Drawer.Screen
          name="HW_Weather"
          component={WeatherDrawer}
          options={{ drawerLabel: 'Homework — Weather App' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
