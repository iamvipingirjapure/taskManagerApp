import React from 'react';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskListScreen from '../screens/Tasks/TaskListScreen';
import TaskFormScreen from '../screens/Tasks/TaskFormScreen';
import TaskDetailScreen from '../screens/Tasks/TaskDetailsScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import { RootState } from '../redux/store';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  TaskList: undefined;
  TaskForm: { id?: string } | undefined;
  TaskDetail: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const token = useSelector((s: RootState) => s.auth.token);

  return (
    <Stack.Navigator>
      {token ? (
        <>
          <Stack.Screen name="TaskList" component={TaskListScreen} options={{ title: 'My Tasks' }} />
          <Stack.Screen name="TaskForm" component={TaskFormScreen} options={{ title: 'Task Form' }} />
          <Stack.Screen name="TaskDetail" component={TaskDetailScreen} options={{ title: 'Task Detail' }} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        </>
      )}
    </Stack.Navigator>
  );
}
