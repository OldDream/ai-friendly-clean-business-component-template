import React, { useState } from 'react';
import { Input, Button, List, Checkbox } from 'antd';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { TaskManagementProps } from './interface';

const TaskManagement: React.FC<TaskManagementProps> = ({
  tasks,
  onSearch,
  onAdd,
  onDelete,
  onToggleComplete
}) => {
  const [newTask, setNewTask] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    if (newTask.trim()) {
      onAdd(newTask);
      setNewTask('');
      setIsAdding(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">任务管理面板</h1>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="请输入任务进行搜索"
          prefix={<SearchOutlined />}
          onChange={(e) => onSearch(e.target.value)}
          className="flex-1"
        />
        <Button type="primary" onClick={() => setIsAdding(true)}>
          新增任务
        </Button>
      </div>

      {isAdding && (
        <div className="flex gap-4 mb-6">
          <Input
            placeholder="请输入新增的任务信息"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1"
          />
          <Button type="primary" onClick={handleAdd}>
            确认
          </Button>
          <Button onClick={() => setIsAdding(false)}>取消</Button>
        </div>
      )}

      <List
        className="mt-4"
        dataSource={tasks}
        renderItem={(task) => (
          <List.Item className="flex items-center justify-between p-4 border rounded-lg mb-2">
            <div className="flex items-center gap-4">
              <Checkbox checked={task.completed} onChange={() => onToggleComplete(task.id)} />
              <span className={task.completed ? 'line-through text-gray-400' : ''}>
                {task.title}
              </span>
            </div>
            <Button type="link" danger onClick={() => onDelete(task.id)} icon={<DeleteOutlined />}>
              删除
            </Button>
          </List.Item>
        )}
      />
    </div>
  );
};

export default TaskManagement;
