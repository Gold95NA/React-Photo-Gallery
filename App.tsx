import React, { useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Dimensions,
  Pressable,
  Image,
  Modal,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from './components/SearchBar';
import FullScreenViewer from './components/FullScreenViewer';

type ImageData = { id: number; url: string };

const makeImageData = (count: number = 120, size: number = 200): ImageData[] => {
  const items: ImageData[] = [];
  for (let i = 1; i <= count; i++) {
    items.push({ id: i, url: `https://picsum.photos/id/${i}/${size}` });
  }
  return items;
};

const SPACING = 8;
const H_PADDING = 12;
const NUM_COLUMNS = 3;

const ALL_IMAGES = makeImageData(120);

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { width } = Dimensions.get('window');
  const tileSize = useMemo(() => {
    const totalSpacing = SPACING * (NUM_COLUMNS - 1);
    const totalPadding = H_PADDING * 2;
    return Math.floor((width - totalSpacing - totalPadding) / NUM_COLUMNS);
  }, [width]);

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return ALL_IMAGES;
    return ALL_IMAGES.filter((img) => String(img.id).includes(q));
  }, [query]);

  const openViewer = useCallback((id: number) => setSelectedId(id), []);
  const closeViewer = useCallback(() => setSelectedId(null), []);

  const renderItem = useCallback(({ item }: { item: ImageData }) => {
    return (
      <Pressable
        onPress={() => openViewer(item.id)}
        style={[styles.tile, { width: tileSize, height: tileSize }]}
        accessibilityRole="image"
        accessibilityLabel={`Open photo ${item.id} full screen`}
      >
        <Image source={{ uri: item.url }} style={styles.image} resizeMode="cover" />
      </Pressable>
    );
  }, [tileSize, openViewer]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <StatusBar style={selectedId ? 'light' : 'auto'} />

        <Text style={styles.title}>Photo Gallery</Text>

        <SearchBar value={query} onChangeText={setQuery} />

        <FlatList
          data={filtered}
          keyExtractor={(item) => String(item.id)}
          numColumns={NUM_COLUMNS}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: H_PADDING, paddingBottom: 16, paddingTop: 6 }}
          columnWrapperStyle={{ gap: SPACING }}
          ItemSeparatorComponent={() => <View style={{ height: SPACING }} />}
          initialNumToRender={18}
          windowSize={10}
          removeClippedSubviews
          showsVerticalScrollIndicator={false}
        />

        {}
        <Modal
          visible={selectedId !== null}
          animationType="fade"
          presentationStyle="fullScreen"
          onRequestClose={closeViewer}
        >
          <FullScreenViewer imageId={selectedId} onRequestClose={closeViewer} />
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 8,
    marginHorizontal: 12,
  },
  tile: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
  },
  image: { width: '100%', height: '100%' },
})
