import React from 'react';
import { Text, Pressable, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { PhotoStackParamList } from './types';
import GalleryScreen from '../screens/GalleryScreen';
import PhotoDetailScreen from '../screens/PhotoDetailScreen';
import PhotoModalScreen from '../screens/PhotoModalScreen';

const Stack = createNativeStackNavigator<PhotoStackParamList>();

const PhotoStack = () => {
  return (
    <Stack.Navigator initialRouteName="Gallery" screenOptions={{ headerTitleAlign: 'center' }}>
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
          headerShadowVisible: Platform.OS === 'ios' ? false : true,
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
  );
};

export default PhotoStack;