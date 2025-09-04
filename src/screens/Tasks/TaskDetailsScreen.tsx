import React from 'react';
import { View, Text, Pressable, Alert, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { fmt } from '../../utils/dates';
import {
  deleteTask,
  selectTaskById,
  toggleCompleted,
} from '../../redux/slices/tasksSlice';
import { RootState } from '../../redux/store';

export default function TaskDetailScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'TaskDetail'>) {
  const task = useSelector(selectTaskById(route.params.id));
  const dark = useSelector((s: RootState) => s.theme.dark);
  const dispatch = useDispatch();

  if (!task) return <Text style={{ padding: 20 }}>Task not found</Text>;

  const onDelete = () => {
    Alert.alert('Delete Task', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          dispatch(deleteTask(task.id));
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={{ flex: 1, padding: 20, gap: 12 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: '700',
          color: dark ? 'white' : 'black',
        }}
      >
        {task.title}
      </Text>
      {task.description ? <Text>{task.description}</Text> : null}
      <Text style={{ color: dark ? 'white' : 'black' }}>
        Priority: {task.priority}
      </Text>
      <Text style={{ color: dark ? 'white' : 'black' }}>
        Due: {fmt(task.dueDate)}
      </Text>
      <Text style={{ color: dark ? 'white' : 'black' }}>
        Reminder: {fmt(task.reminderAt ?? undefined)}
      </Text>
      <Text style={{ color: dark ? 'white' : 'black' }}>
        Status: {task.completed ? 'Completed' : 'Not Completed'}
      </Text>

      <Pressable
        onPress={() => dispatch(toggleCompleted(task.id))}
        style={styles.btn}
      >
        <Text style={{ ...styles.btnText, color: dark ? 'white' : 'black' }}>
          {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
        </Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('TaskForm', { id: task.id })}
        style={styles.btn}
      >
        <Text style={{ ...styles.btnText, color: dark ? 'white' : 'black' }}>
          Edit Task
        </Text>
      </Pressable>

      <Pressable
        onPress={onDelete}
        style={[styles.btn, { borderColor: 'red' }]}
      >
        <Text
          style={[
            { ...styles.btnText, color: dark ? 'white' : 'black' },
            { color: 'red' },
          ]}
        >
          Delete Task
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnText: { fontWeight: '600' },
});
