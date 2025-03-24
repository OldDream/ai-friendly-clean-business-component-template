import React, { useState } from 'react';
import { Input, Button, List, Checkbox } from 'antd';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { TaskManagementPanelProps } from './interface';
import { isValidTaskContent } from './helpers';

const { Search } = Input;

export const TaskManagementPanel: React.FC<TaskManagementPanelProps> = ({
  tasks,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onSearch
}) => {
  const [newTaskContent, setNewTaskContent] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddTask = () => {
    if (isValidTaskContent(newTaskContent)) {
      onAddTask(newTaskContent);
      setNewTaskContent('');
      setIsAdding(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-6">任务管理面板</h1>

      <div className="flex gap-4 mb-4">
        <Search
          placeholder="请输入任务进行搜索"
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          className="flex-1"
          onChange={(e) => onSearch(e.target.value)}
        />
        <Button
          type="primary"
          size="large"
          onClick={() => setIsAdding(true)}
          className="whitespace-nowrap"
        >
          新增任务
        </Button>
      </div>

      {isAdding && (
        <div className="flex gap-2 items-center p-4 bg-gray-50 rounded-lg">
          <Input
            placeholder="请输入新增的任务信息"
            value={newTaskContent}
            onChange={(e) => setNewTaskContent(e.target.value)}
            onPressEnter={handleAddTask}
            size="large"
            className="flex-1"
          />
          <Button type="primary" onClick={handleAddTask}>
            确认
          </Button>
          <Button
            onClick={() => {
              setIsAdding(false);
              setNewTaskContent('');
            }}
          >
            取消
          </Button>
        </div>
      )}

      <List
        className="bg-white rounded-lg"
        dataSource={tasks}
        renderItem={(task) => (
          <List.Item className="flex items-center px-4 hover:bg-gray-50">
            <Checkbox
              checked={task.completed}
              onChange={() => onToggleTask(task.id)}
              className="mr-3"
            />
            <span className={`flex-1 ${task.completed ? 'line-through text-gray-400' : ''}`}>
              {task.content}
            </span>
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDeleteTask(task.id)}
              className="text-gray-400 hover:text-red-500"
            >
              删除
            </Button>
          </List.Item>
        )}
      />
    </div>
  );
};
