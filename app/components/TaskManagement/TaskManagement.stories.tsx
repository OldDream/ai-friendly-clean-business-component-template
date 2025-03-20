import React, { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import TaskManagement from './TaskManagement';
import { TaskManagementProps, Task } from './interface';

export default {
  title: 'Components/TaskManagement',
  component: TaskManagement,
  parameters: {
    docs: {
      description: {
        component: '任务管理组件，用于显示、添加、搜索和删除任务。'
      }
    }
  }
} as Meta;

// Template for the component
const Template: StoryFn<TaskManagementProps> = (args: TaskManagementProps) => (
  <TaskManagement {...args} />
);

// Initial mock data
const initialTasks: Task[] = [
  { id: '1', name: '任务一', completed: true },
  { id: '2', name: '任务二', completed: true },
  { id: '3', name: '任务三', completed: false },
  { id: '4', name: '任务四', completed: false }
];

// Interactive example with state
export const Interactive: StoryFn<TaskManagementProps> = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(initialTasks);

  const handleAddTask = (taskName: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      name: taskName,
      completed: false
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredTasks(tasks);
      return;
    }

    const filtered = tasks.filter((task) =>
      task.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  const handleToggleTask = (taskId: string, completed: boolean) => {
    const updatedTasks = tasks.map((task) => (task.id === taskId ? { ...task, completed } : task));
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };

  return (
    <TaskManagement
      tasks={filteredTasks}
      onAddTask={handleAddTask}
      onSearch={handleSearch}
      onToggleTask={handleToggleTask}
      onDeleteTask={handleDeleteTask}
    />
  );
};
Interactive.parameters = {
  docs: {
    description: {
      story: '交互式示例，展示组件的完整功能。'
    }
  }
};

// Empty state
export const Empty = Template.bind({});
Empty.args = {
  tasks: [],
  onAddTask: () => {},
  onSearch: () => {},
  onToggleTask: () => {},
  onDeleteTask: () => {}
};
Empty.parameters = {
  docs: {
    description: {
      story: '无任务时的显示状态。'
    }
  }
};

// Loading state
export const Loading = Template.bind({});
Loading.args = {
  tasks: [],
  isLoading: true,
  onAddTask: () => {},
  onSearch: () => {},
  onToggleTask: () => {},
  onDeleteTask: () => {}
};
Loading.parameters = {
  docs: {
    description: {
      story: '数据加载中的显示状态。'
    }
  }
};
