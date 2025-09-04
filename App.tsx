import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { store, RootState } from './src/redux/store';
import { loadTasksAsync } from './src/redux/slices/tasksSlice';

function Setup() {
  const dispatch = useDispatch();
  const dark = useSelector((s: RootState) => s.theme.dark);

  useEffect(() => {
    dispatch(loadTasksAsync() as any);
  }, [dispatch]);

  return (
    <NavigationContainer theme={dark ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Setup />
    </Provider>
  );
}
