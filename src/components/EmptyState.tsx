import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default function EmptyState() {
  const dark = useSelector((s: RootState) => s.theme.dark);

  return (
    <View style={[styles.container, { backgroundColor: dark ? '#121212' : '#f9f9f9' }]}>
      <Text style={[styles.text, { color: dark ? '#fff' : '#333' }]}>
        🎉 No tasks yet!
      </Text>
      <Text style={[styles.subText, { color: dark ? '#bbb' : '#666' }]}>
        Tap the + button to add your first task.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
