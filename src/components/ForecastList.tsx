import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import type { ForecastWeatherData } from '../navigation/types';

type Props = { data: ForecastWeatherData | null };

const ForecastList: React.FC<Props> = ({ data }) => {
  if (!data) return null;
  return (
    <FlatList
      data={data.forecast.forecastDay}
      keyExtractor={(_, i) => String(i)}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Text style={styles.day}>{item.date}</Text>
          <View style={styles.mid}>
            <Image source={{ uri: item.day.condition.icon }} style={styles.icon} />
            <Text style={styles.desc}>{item.day.condition.text}</Text>
          </View>
          <Text style={styles.temp}>{item.day.maxTempF}°/{item.day.minTempF}°F</Text>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
  },
  day: { width: 56, fontWeight: '700' },
  mid: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  icon: { width: 32, height: 32 },
  desc: { flexShrink: 1 },
  temp: { width: 90, textAlign: 'right', fontWeight: '600' },
});

export default ForecastList;