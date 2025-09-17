import React, { useMemo } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import type { ForecastTabsParamList, ForecastWeatherData } from '../../navigation/types';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DEFAULT_Q } from '../../config/weather';
import { fetchForecast, mapForecast } from '../../api/weather';
import { useFetch } from '../../hooks/useFetch';
import ForecastList from '../../components/ForecastList';

type Props = BottomTabScreenProps<ForecastTabsParamList, 'Forecast3'> | BottomTabScreenProps<ForecastTabsParamList, 'Forecast7'>;

const ForecastScreen: React.FC<Props> = ({ route }) => {
  const q = route.params?.q ?? DEFAULT_Q;
  const days = route.params.days ?? 3;

  const req = useMemo(() => () => fetchForecast(q, days), [q, days]);
  const { data, loading, error, refetch } = useFetch<any>(req, [q, days]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const view = data ? mapForecast({ data } as any) : null;

  if (loading && !view) return <View style={styles.center}><ActivityIndicator /></View>;
  if (error) return <View style={styles.center}><Text>Error: {error}</Text></View>;

  return (
    <View style={styles.wrap}>
      <Text style={styles.header}>
        {view?.location.name}, {view?.location.region}
      </Text>
      <ForecastList data={view as ForecastWeatherData} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#fff' },
  header: { fontSize: 18, fontWeight: '700', marginTop: 12, marginHorizontal: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default ForecastScreen;