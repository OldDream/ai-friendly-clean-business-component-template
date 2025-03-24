import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TodoList2 from './TodoList2';
import { TodoItem } from './interface';
import { filterTodoItems } from './helpers';

const meta: Meta<typeof TodoList2> = {
  title: 'Components/cline/TodoList2',
  component: TodoList2,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof TodoList2>;

const TodoListTemplate: React.FC = () => {
  const [items, setItems] = useState<TodoItem[]>([
    { id: '1', title: 'Complete project documentation', completed: false },
    { id: '2', title: 'Review pull requests', completed: true },
    { id: '3', title: 'Fix UI bugs', completed: false },
    { id: '4', title: 'Prepare demo for client', completed: false },
    { id: '5', title: 'Update dependencies', completed: true }
  ]);

  const [filteredItems, setFilteredItems] = useState<TodoItem[]>(items);

  const handleToggle = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
    // Apply existing filter to updated items
    setFilteredItems((currentFiltered) => {
      const updatedItems = items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      );
      return filterTodoItems(
        updatedItems,
        currentFiltered.length < items.length
          ? items.filter((item) => !filteredItems.some((f) => f.id === item.id))[0]?.title || ''
          : ''
      );
    });
  };

  const handleDelete = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setFilteredItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleSearch = (searchText: string) => {
    setFilteredItems(filterTodoItems(items, searchText));
  };

  return (
    <TodoList2
      items={filteredItems}
      onToggle={handleToggle}
      onDelete={handleDelete}
      onSearch={handleSearch}
    />
  );
};

export const Default: Story = {
  render: () => <TodoListTemplate />
};
