import React from 'react';
import { Text, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './src/navigation/types';
import GalleryScreen from './src/screens/GalleryScreen';
import PhotoDetailScreen from './src/screens/PhotoDetailScreen';
import PhotoModalScreen from './src/screens/PhotoModalScreen';
import { Platform } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Gallery"
        screenOptions={{
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen
          name="Gallery"
          component={GalleryScreen}
          options={{ title: 'Photo Gallery' }}
        />

        <Stack.Screen
          name="PhotoDetail"
          component={PhotoDetailScreen}
          options={{ title: 'Photo' }}
        />

        <Stack.Screen
          name="PhotoModal"
          component={PhotoModalScreen}
          options={({ navigation }) => ({
            presentation: 'fullScreenModal',
            headerTitle: '',
            headerStyle: { backgroundColor: '#000' },
            headerTintColor: '#fff',
            headerShadowVisible: false,
            contentStyle: { backgroundColor: '#000' },
            headerRight: () => (
              <Pressable
                onPress={() => navigation.goBack()}
                style={{ paddingHorizontal: 12, paddingVertical: 6 }}
                accessibilityLabel="Close modal"
              >
                <Text style={{ color: '#fff', fontSize: 16 }}>Close</Text>
              </Pressable>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
