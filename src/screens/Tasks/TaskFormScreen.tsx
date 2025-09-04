import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Platform,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { AppDispatch, RootState } from '../../redux/store';
import {
  addTaskWithReminder,
  selectTaskById,
  updateTask,
} from '../../redux/slices/tasksSlice';

const TaskFormScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'TaskForm'>) =>{
  const dispatch = useDispatch<AppDispatch>();
  const existing = useSelector((s: RootState) =>
    route.params?.id ? selectTaskById(route.params.id)(s) : undefined,
  );
  const darkMode = useSelector((s: RootState) => s.theme.dark);

  const [title, setTitle] = useState(existing?.title ?? '');
  const [desc, setDesc] = useState(existing?.description ?? '');
  const [priority, setPriority] = useState(existing?.priority ?? 'Medium');
  const [dueDate, setDueDate] = useState(
    existing?.dueDate ? new Date(existing.dueDate) : null,
  );
  const [reminderAt, setReminderAt] = useState(
    existing?.reminderAt ? new Date(existing.reminderAt) : null,
  );
  const [showPicker, setShowPicker] = useState<'due' | 'reminder' | null>(null);

  const save = () => {
    if (!title.trim()) return Alert.alert('Title is required');

    if (reminderAt && Platform.OS === 'ios') {
      PushNotificationIOS.checkPermissions(perms => {
        if (!perms.alert) Alert.alert('Enable notifications to get reminders');
      });
    }

    if (existing) {
      dispatch(
        updateTask({
          ...existing,
          title,
          description: desc,
          priority,
          dueDate: dueDate?.toISOString(),
          reminderAt: reminderAt?.toISOString(),
        }),
      );
    } else {
      dispatch(
        addTaskWithReminder({
          title,
          description: desc,
          priority,
          dueDate: dueDate?.toISOString(),
          reminderAt: reminderAt?.toISOString(),
        }),
      );
    }
    navigation.goBack();
  };

  const inputStyle = {
    borderWidth: 1,
    borderColor: darkMode ? '#555' : '#d1d5db',
    borderRadius: 12,
    padding: 12,
    color: darkMode ? 'white' : 'black',
    backgroundColor: darkMode ? '#222' : 'white',
  };

  const btnStyle = {
    borderWidth: 1,
    borderColor: darkMode ? '#555' : '#d1d5db',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#2563eb',
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        gap: 12,
        backgroundColor: darkMode ? '#121212' : '#f9f9f9',
      }}
    >
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={inputStyle}
      />
      <TextInput
        placeholder="Description"
        value={desc}
        onChangeText={setDesc}
        style={[inputStyle, { height: 80 }]}
        multiline
      />

      <Text style={{ fontWeight: '600', color: darkMode ? 'white' : 'black' }}>
        Priority
      </Text>
      <View style={{ flexDirection: 'row', gap: 8,marginBottom:50 }}>
        {['Low', 'Medium', 'High'].map(p => (
          <Pressable
            key={p}
            onPress={() => setPriority(p as any)}
            style={{
              padding: 8,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: priority === p ? 'green' : '#d1d5db',
              backgroundColor: priority === p ? 'green22' : 'transparent',
            }}
          >
            <Text
              style={{
                color: priority === p ? 'green' : darkMode ? 'white' : 'black',
              }}
            >
              {p}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        onPress={() => setShowPicker('due')}
        style={{
          borderWidth: 1,
          borderColor: darkMode ? '#555' : '#d1d5db',
          padding: 12,
          borderRadius: 12,
          alignItems: 'center',
          backgroundColor: 'green',
        }}
      >
        <Text style={{ color: 'white' }}>
          {dueDate ? `Due: ${dueDate.toDateString()}` : 'Pick Due Date'}
        </Text>
      </Pressable>
      {/* <Pressable
        // onPress={() => setShowPicker('reminder')}
        style={{
          borderWidth: 1,
          borderColor: darkMode ? '#555' : '#d1d5db',
          padding: 12,
          borderRadius: 12,
          alignItems: 'center',
          backgroundColor: 'green',
        }}
      >
        <Text style={{ color: 'white' }}>
          {reminderAt
            ? `Reminder: ${reminderAt.toLocaleString()}`
            : 'Pick Reminder Time'}
        </Text>
      </Pressable> */}

      {showPicker && (
        <DateTimePicker
          value={new Date()}
          mode={showPicker === 'due' ? 'date' : 'datetime'}
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={(e, date) => {
            setShowPicker(null);
            if (date)
              showPicker === 'due' ? setDueDate(date) : setReminderAt(date);
          }}
        />
      )}

      <Pressable
        onPress={save}
        style={{
          borderWidth: 1,
          borderColor: darkMode ? '#555' : '#d1d5db',
          padding: 12,
          borderRadius: 12,
          alignItems: 'center',
          backgroundColor: 'green',
        }}
      >
        <Text style={{ color: 'white', fontWeight: '600' }}>
          {existing ? 'Update' : 'Save'} Task
        </Text>
      </Pressable>
    </View>
  );
}


export default TaskFormScreen;