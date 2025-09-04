import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Task } from '../utils/types';
import { fmt } from '../utils/dates';

type TaskItemProps = {
  item: Task;
  onPress: () => void;
  onToggle: () => void;
  darkMode?: boolean;
};

export default function TaskItem({ item, onPress, onToggle, darkMode = false }: TaskItemProps) {
  const containerStyle = {
    ...styles.container,
    backgroundColor: darkMode ? '#1e1e1e' : '#fff',
    borderColor: darkMode ? '#333' : '#ddd',
  };

  const titleStyle = {
    ...styles.title,
    color: darkMode ? '#fff' : '#111',
  };

  const subTextStyle = {
    ...styles.subText,
    color: darkMode ? '#bbb' : '#555',
  };

  const priorityColor =
    item.priority === 'High' ? 'tomato' : item.priority === 'Medium' ? '#f59e0b' : '#16a34a';

  return (
    <Pressable onPress={onPress} style={containerStyle}>
      <View style={{ flex: 1 }}>
        <Text style={titleStyle}>{item.title}</Text>
        {item.dueDate && <Text style={subTextStyle}>Due: {fmt(item.dueDate)}</Text>}
      </View>
      <View style={{ alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <Text style={{ color: priorityColor, fontWeight: '600' }}>{item.priority}</Text>
        <Pressable
          onPress={onToggle}
          style={{
            marginTop: 8,
            width: 24,
            height: 24,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: darkMode ? '#555' : '#888',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: item.completed ? 'green' : 'transparent',
          }}
        >
          {item.completed && <Text style={{ color: 'white', fontWeight: '600' }}>✓</Text>}
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  subText: {
    fontSize: 12,
    marginTop: 2,
  },
});
