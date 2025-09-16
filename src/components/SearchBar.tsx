import React from 'react';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar: React.FC<Props> = ({ value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search by ID (1, 10, 15)"
        placeholderTextColor="#999"
        style={styles.input}
        keyboardType="number-pad"
        returnKeyType="done"
        autoCapitalize="none"
        autoCorrect={false}
        accessibilityLabel="Search photos by numeric ID"
      />
      {value.length > 0 && (
        <Pressable onPress={() => onChangeText('')} style={styles.clearBtn} accessibilityLabel="Clear search">
          <Text style={styles.clearTxt}>×</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginHorizontal: 12,
    marginBottom: 8,
    position: 'relative',
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingLeft: 14,
    paddingRight: 42,
    fontSize: 16,
  },
  clearBtn: {
    position: 'absolute',
    right: 18,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearTxt: { fontSize: 24, lineHeight: 24, color: '#9ca3af' },
});

export default SearchBar;