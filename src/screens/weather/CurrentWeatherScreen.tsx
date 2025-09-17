import React, { useMemo } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { WeatherDrawerParamList, CurrentWeatherData } from '../../navigation/types';
import { DEFAULT_Q } from '../../config/weather';
import { fetchCurrent, mapCurrent } from '../../api/weather';
import { useFetch } from '../../hooks/useFetch';

type Nav = NativeStackScreenProps<WeatherDrawerParamList, 'Current'>;

const CurrentWeatherScreen: React.FC<Nav> = ({ route }) => {
  const q = route.params?.q ?? DEFAULT_Q;

  const req = useMemo(() => () => fetchCurrent(q), [q]);
  const { data, loading, error, refetch } = useFetch<any>(req, [q]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const view = data ? mapCurrent({ data } as any) : null;

  if (loading && !view) {
    return <View style={styles.center}><ActivityIndicator /></View>;
  }
  if (error) {
    return <View style={styles.center}><Text>Error: {error}</Text></View>;
  }
  if (!view) return null;

  return (
    <View style={styles.wrap}>
      <Text style={styles.header}>
        {view.location.name}, {view.location.region}
      </Text>

      <View style={styles.card}>
        <Image source={{ uri: view.current.condition.icon }} style={styles.icon} />
        <View style={{ flex: 1 }}>
          <Text style={styles.temp}>{view.current.tempF}°F</Text>
          <Text style={styles.desc}>{view.current.condition.text}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  card: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  icon: { width: 64, height: 64 },
  temp: { fontSize: 28, fontWeight: '800' },
  desc: { fontSize: 16, color: '#4b5563' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default CurrentWeatherScreen;