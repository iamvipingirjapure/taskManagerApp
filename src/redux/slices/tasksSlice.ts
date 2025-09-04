import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../utils/types';
import { RootState } from '../store';
import { loadTasks, saveTasks } from '../../utils/storage';

type TasksState = { tasks: Task[]; loaded: boolean };

const initialState: TasksState = { tasks: [], loaded: false };

export const loadTasksAsync = createAsyncThunk('tasks/load', async () =>
  loadTasks(),
);

export const addTaskWithReminder = createAsyncThunk(
  'tasks/add',
  async (task: Omit<Task, 'id' | 'completed'>, { getState }) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      completed: false,
    };
    const state = (getState() as RootState).tasks;
    await saveTasks([...state.tasks, newTask]);
    return newTask;
  },
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    updateTask: (s, a: PayloadAction<Task>) => {
      const idx = s.tasks.findIndex(t => t.id === a.payload.id);
      if (idx >= 0) {
        s.tasks[idx] = a.payload;
        saveTasks(s.tasks);
      }
    },
    deleteTask: (s, a: PayloadAction<string>) => {
      const id = a.payload;
      s.tasks = s.tasks.filter(t => t.id !== id);
      saveTasks(s.tasks);
    },
    toggleCompleted: (s, a: PayloadAction<string>) => {
      const t = s.tasks.find(t => t.id === a.payload);
      if (t) {
        t.completed = !t.completed;
        saveTasks(s.tasks);
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadTasksAsync.fulfilled, (s, a) => {
        s.tasks = a.payload;
        s.loaded = true;
      })
      .addCase(addTaskWithReminder.fulfilled, (s, a) => {
        s.tasks.push(a.payload);
      });
  },
});

export const { updateTask, deleteTask, toggleCompleted } = tasksSlice.actions;
export const selectAllTasks = (s: RootState) => s.tasks.tasks;
export const selectTaskById = (id: string) => (s: RootState) =>
  s.tasks.tasks.find(t => t.id === id);
export default tasksSlice.reducer;
