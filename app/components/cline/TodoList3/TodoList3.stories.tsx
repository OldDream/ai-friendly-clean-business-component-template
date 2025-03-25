import type { Meta, StoryObj } from '@storybook/react';
import TodoList3 from './TodoList3';
import { TodoItem } from './interface';

const meta: Meta<typeof TodoList3> = {
  title: 'Cline/TodoList3',
  component: TodoList3,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof TodoList3>;

const sampleTodos: TodoItem[] = [
  {
    id: '1',
    title: 'Complete project documentation',
    completed: false,
    priority: 'high',
    dueDate: '2025-04-01'
  },
  {
    id: '2',
    title: 'Review pull requests',
    completed: true,
    priority: 'medium',
    dueDate: '2025-03-28'
  },
  {
    id: '3',
    title: 'Prepare for team meeting',
    completed: false,
    priority: 'high',
    dueDate: '2025-03-26'
  },
  {
    id: '4',
    title: 'Update dependencies',
    completed: false,
    priority: 'low',
    dueDate: '2025-04-05'
  },
  { id: '5', title: 'Fix UI bugs', completed: false, priority: 'medium', dueDate: '2025-03-30' }
];

export const Default: Story = {
  args: {
    items: sampleTodos,
    onToggle: (id) => console.log(`Toggle: ${id}`),
    onDelete: (id) => console.log(`Delete: ${id}`),
    onSearch: (text) => console.log(`Search: ${text}`),
    onPriorityChange: (id, priority) => console.log(`Priority changed for ${id} to ${priority}`),
    onDateChange: (id, date) => console.log(`Date changed for ${id} to ${date}`)
  }
};

export const Empty: Story = {
  args: {
    items: [],
    onToggle: (id) => console.log(`Toggle: ${id}`),
    onDelete: (id) => console.log(`Delete: ${id}`),
    onSearch: (text) => console.log(`Search: ${text}`),
    onPriorityChange: (id, priority) => console.log(`Priority changed for ${id} to ${priority}`),
    onDateChange: (id, date) => console.log(`Date changed for ${id} to ${date}`)
  }
};

export const AllCompleted: Story = {
  args: {
    items: sampleTodos.map((todo) => ({ ...todo, completed: true })),
    onToggle: (id) => console.log(`Toggle: ${id}`),
    onDelete: (id) => console.log(`Delete: ${id}`),
    onSearch: (text) => console.log(`Search: ${text}`),
    onPriorityChange: (id, priority) => console.log(`Priority changed for ${id} to ${priority}`),
    onDateChange: (id, date) => console.log(`Date changed for ${id} to ${date}`)
  }
};
