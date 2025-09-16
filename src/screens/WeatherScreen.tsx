import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WeatherScreen: React.FC = () => {
  return (
    <View style={styles.wrap}>
      <Text style={styles.h1}>Weather App (Homework)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  h1: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  p: { fontSize: 16, color: '#666' },
});

export default WeatherScreen;