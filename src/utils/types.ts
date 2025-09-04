export type Task = {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: 'Low' | 'Medium' | 'High';
  completed: boolean;
  reminderAt?: string;
};
