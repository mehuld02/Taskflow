import { create } from "zustand";

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskStore {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTask: (id: number) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [
    { id: 1, title: "Finish dashboard UI", completed: true },
    { id: 2, title: "Add Zustand store", completed: false },
  ],
  addTask: (title) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        { id: Date.now(), title, completed: false },
      ],
    })),
  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),
}));
