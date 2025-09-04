import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from './types';

const TASKS_KEY = '@tasks';

export async function loadTasks(): Promise<Task[]> {
  try {
    const json = await AsyncStorage.getItem(TASKS_KEY);
    return json ? JSON.parse(json) : [];
  } catch (err) {
    console.error('Failed to load tasks', err);
    return [];
  }
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  try {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (err) {
    console.error('Failed to save tasks', err);
  }
}
