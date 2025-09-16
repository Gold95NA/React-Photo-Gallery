import React, { useLayoutEffect, useCallback } from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { PhotoStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<PhotoStackParamList, 'PhotoDetail'>;

const PhotoDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { id, url } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({ title: url });
  }, [navigation, url]);

  const openModal = useCallback(() => {
    navigation.navigate('PhotoModal', { id, url });
  }, [navigation, id, url]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Pressable style={styles.press} onPress={openModal} accessibilityLabel="Open full-screen modal">
        <Image source={{ uri: url }} style={styles.image} resizeMode="contain" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  press: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: '100%' },
});

export default PhotoDetailScreen;