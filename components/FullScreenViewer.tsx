import React, { useState } from 'react';
import { View, StyleSheet, Image, Pressable, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';

interface Props {
  imageId: number | null;
  onRequestClose: () => void;
}

const fullSizeUrl = (id: number, size: number = 1200) =>
  `https://picsum.photos/id/${id}/${size}`;

const FullScreenViewer: React.FC<Props> = ({ imageId, onRequestClose }) => {
  const [loading, setLoading] = useState(true);
  const url = imageId ? fullSizeUrl(imageId) : undefined;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Pressable style={styles.pressArea} onPress={onRequestClose} accessibilityLabel="Close full-screen photo">
        {url && (
          <>
            {loading && (
              <View style={styles.loader}>
                <ActivityIndicator size="large" />
              </View>
            )}
            <Image
              source={{ uri: url }}
              style={styles.image}
              resizeMode="contain"
              onLoadEnd={() => setLoading(false)}
            />
          </>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  pressArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: '100%' },
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FullScreenViewer;