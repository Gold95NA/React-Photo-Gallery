import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { PhotoStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<PhotoStackParamList, 'PhotoModal'>;

const PhotoModalScreen: React.FC<Props> = ({ route }) => {
  const { url } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image source={{ uri: url }} style={styles.image} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: '100%' },
});

export default PhotoModalScreen;