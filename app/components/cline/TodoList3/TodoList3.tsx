import React, { useState } from 'react';
import { Input, List, Checkbox, Button, Select, DatePicker, Tag, Tabs } from 'antd';
import { DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import { TodoList3Props, TodoItem } from './interface';
import type { TabsProps } from 'antd';
import dayjs from 'dayjs';

const { Search } = Input;
const { Option } = Select;

/**
 * TodoList3 Component
 * An enhanced todo list component with priority filtering, due dates, and categorization
 */
const TodoList3: React.FC<TodoList3Props> = ({
  items,
  onToggle,
  onDelete,
  onSearch,
  onPriorityChange,
  onDateChange
}) => {
  const [filter, setFilter] = useState<string>('all');

  const getPriorityColor = (priority: TodoItem['priority']) => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'green';
      default:
        return 'blue';
    }
  };

  const filteredItems =
    filter === 'all'
      ? items
      : filter === 'completed'
      ? items.filter((item) => item.completed)
      : items.filter((item) => !item.completed);

  const tabItems: TabsProps['items'] = [
    {
      key: 'all',
      label: 'All'
    },
    {
      key: 'active',
      label: 'Active'
    },
    {
      key: 'completed',
      label: 'Completed'
    }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Task Manager</h2>
        <div className="text-sm text-gray-500">
          {items.filter((item) => !item.completed).length} tasks remaining
        </div>
      </div>

      <Search
        placeholder="Search todos..."
        allowClear
        className="mb-4"
        onChange={(e) => onSearch(e.target.value)}
      />

      <Tabs defaultActiveKey="all" items={tabItems} onChange={setFilter} className="mb-4" />

      <List
        className="bg-white rounded-lg"
        dataSource={filteredItems}
        locale={{ emptyText: 'No tasks found' }}
        renderItem={(item) => (
          <List.Item
            className="flex items-center px-4 py-3 border-b hover:bg-gray-50 transition-colors"
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
            <div className="flex items-center w-full">
              <Checkbox
                checked={item.completed}
                onChange={() => onToggle(item.id)}
                className="mr-3"
              />
              <div className="flex flex-col flex-1">
                <span
                  className={`${item.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
                >
                  {item.title}
                </span>
                <div className="flex items-center mt-1 text-xs">
                  <Select
                    value={item.priority}
                    size="small"
                    className="w-24 mr-2"
                    onChange={(value) => onPriorityChange(item.id, value)}
                  >
                    <Option value="low">Low</Option>
                    <Option value="medium">Medium</Option>
                    <Option value="high">High</Option>
                  </Select>

                  <DatePicker
                    size="small"
                    placeholder="Due date"
                    value={item.dueDate ? dayjs(item.dueDate) : null}
                    onChange={(date) =>
                      onDateChange(item.id, date ? date.format('YYYY-MM-DD') : '')
                    }
                    className="w-32"
                  />
                </div>
              </div>

              <Tag color={getPriorityColor(item.priority)} className="ml-2">
                {item.priority}
              </Tag>

              {item.dueDate && (
                <Tag color="blue" className="ml-2">
                  <CalendarOutlined className="mr-1" />
                  {item.dueDate}
                </Tag>
              )}
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default TodoList3;
