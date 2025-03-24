import React from 'react';
import { Input, List, Checkbox, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { TodoList2Props } from './interface';

const { Search } = Input;

/**
 * TodoList2 Component
 * A todo list component with search functionality
 */
const TodoList2: React.FC<TodoList2Props> = ({ items, onToggle, onDelete, onSearch }) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Search
        placeholder="Search todos..."
        allowClear
        className="mb-4"
        onChange={(e) => onSearch(e.target.value)}
      />

      <List
        className="bg-white rounded-lg shadow"
        dataSource={items}
        renderItem={(item) => (
          <List.Item
            className="flex items-center px-4 hover:bg-gray-50"
            actions={[
              <Button
                key="delete"
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => onDelete(item.id)}
              />
            ]}
          >
            <Checkbox
              checked={item.completed}
              onChange={() => onToggle(item.id)}
              className="mr-3"
            />
            <span className={`flex-1 ${item.completed ? 'line-through text-gray-400' : ''}`}>
              {item.title}
            </span>
          </List.Item>
        )}
      />
    </div>
  );
};

export default TodoList2;
