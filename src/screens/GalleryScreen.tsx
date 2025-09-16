import React, { useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Pressable,
  Image,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import { makeImageData, urlForSize } from '../utils/images';
import type { RootStackParamList } from '../navigation/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Gallery'>;
type ImageData = { id: number; url: string };

const SPACING = 8;
const H_PADDING = 12;

const ALL_IMAGES: ImageData[] = makeImageData(120, 200);

const GalleryScreen: React.FC<Props> = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const { width } = Dimensions.get('window');
  const NUM_COLUMNS = 3;

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

  const openDetail = useCallback((id: number) => {
    const url = urlForSize(id, 800);
    navigation.navigate('PhotoDetail', { id, url });
  }, [navigation]);

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Photo Gallery</Text>
      <SearchBar value={query} onChangeText={setQuery} />

      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        numColumns={NUM_COLUMNS}
        contentContainerStyle={{ paddingHorizontal: H_PADDING, paddingBottom: 16, paddingTop: 6 }}
        columnWrapperStyle={{ gap: SPACING }}
        ItemSeparatorComponent={() => <View style={{ height: SPACING }} />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => openDetail(item.id)}
            style={[styles.tile, { width: tileSize, height: tileSize }]}
            accessibilityRole="image"
            accessibilityLabel={`Open photo ${item.id} details`}
          >
            <Image source={{ uri: item.url }} style={styles.image} resizeMode="cover" />
          </Pressable>
        )}
        initialNumToRender={18}
        windowSize={10}
        removeClippedSubviews
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#fff' },
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
});

export default GalleryScreen;