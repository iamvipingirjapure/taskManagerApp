import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useLayoutEffect } from 'react';
import { View, FlatList, Pressable, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { selectAllTasks, toggleCompleted } from '../../redux/slices/tasksSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { toggleTheme } from '../../redux/slices/themeSlice';
import { logout } from '../../redux/slices/authSlice';
import EmptyState from '../../components/EmptyState';
import TaskItem from '../../components/TaskItem';

export default function TaskListScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'TaskList'>) {
  const tasks = useSelector((s: RootState) => selectAllTasks(s));
  const dark = useSelector((s: RootState) => s.theme.dark);
  const dispatch = useDispatch<AppDispatch>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Pressable onPress={() => dispatch(toggleTheme())}>
            <Text style={{ color: 'green', fontSize: 18 }}>{dark ? '☀️' : '🌙'}</Text>
          </Pressable>
          <Pressable onPress={() => dispatch(logout())}>
            <Text style={{ color: 'red', fontSize: 16 }}>Logout</Text>
          </Pressable>
        </View>
      ),
    });
  }, [navigation, dispatch, dark]);

  return (
    <View style={{ flex: 1, backgroundColor: dark ? '#121212' : '#f9f9f9' }}>
      {tasks.length === 0 ? <EmptyState /> : (
        <FlatList
          data={tasks}
          keyExtractor={t => t.id}
          renderItem={({ item }) => (
            <TaskItem
              item={item}
              onPress={() => navigation.navigate('TaskDetail', { id: item.id })}
              onToggle={() => dispatch(toggleCompleted(item.id))}
              darkMode={dark}
            />
          )}
        />
      )}
      <Pressable
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          backgroundColor: 'green',
          width: 56,
          height: 56,
          borderRadius: 28,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => navigation.navigate('TaskForm')}
      >
        <Text style={{ color: 'white', fontSize: 28 }}>＋</Text>
      </Pressable>
    </View>
  );
}
