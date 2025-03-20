import React, { useState, useRef } from 'react';
import { Input, Button, Checkbox, Modal, message } from 'antd';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { TaskManagementProps, Task } from './interface';
import { formatTaskName } from './helpers';

const TaskManagement: React.FC<TaskManagementProps> = ({
  tasks,
  onAddTask,
  onSearch,
  onToggleTask,
  onDeleteTask,
  isLoading = false
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [newTaskName, setNewTaskName] = useState<string>('');
  const [isAddingTask, setIsAddingTask] = useState<boolean>(false);

  const searchInputRef = useRef<InputRef>(null);
  const newTaskInputRef = useRef<InputRef>(null);

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleAddTaskClick = () => {
    setIsAddingTask(true);
    setTimeout(() => {
      newTaskInputRef.current?.focus();
    }, 100);
  };

  const handleAddTaskSubmit = () => {
    if (newTaskName.trim()) {
      onAddTask(newTaskName.trim());
      setNewTaskName('');
      setIsAddingTask(false);
      message.success('任务添加成功');
    } else {
      message.warning('任务名称不能为空');
    }
  };

  const handleCancelAdd = () => {
    setNewTaskName('');
    setIsAddingTask(false);
  };

  const handleToggleTask = (task: Task) => {
    onToggleTask(task.id, !task.completed);
  };

  const handleDeleteTask = (taskId: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '您确定要删除这个任务吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        onDeleteTask(taskId);
        message.success('任务已删除');
      }
    });
  };

  return (
    <div className="w-full border border-gray-200 rounded-md shadow-sm">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h1 className="text-xl font-medium">任务管理面板</h1>
      </div>

      <div className="p-4 flex items-center space-x-4">
        <div className="relative flex-grow">
          <Input
            ref={searchInputRef}
            placeholder="请输入任务进行搜索"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onPressEnter={handleSearch}
            suffix={<SearchOutlined onClick={handleSearch} className="cursor-pointer" />}
            className="w-full"
          />
        </div>
        <Button type="primary" onClick={handleAddTaskClick} className="whitespace-nowrap">
          新增任务
        </Button>
      </div>

      {isAddingTask && (
        <div className="px-4 pb-4 flex items-center space-x-2">
          <Input
            ref={newTaskInputRef}
            placeholder="请输入新增的任务信息"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            onPressEnter={handleAddTaskSubmit}
            className="flex-grow"
          />
          <Button type="primary" onClick={handleAddTaskSubmit}>
            确认
          </Button>
          <Button onClick={handleCancelAdd}>取消</Button>
        </div>
      )}

      <div className="p-4 space-y-2">
        {isLoading ? (
          <div className="text-center py-4">加载中...</div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-4 text-gray-500">暂无任务</div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="p-3 border border-gray-200 rounded flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center">
                <Checkbox
                  checked={task.completed}
                  onChange={() => handleToggleTask(task)}
                  className="mr-3"
                />
                <span className={task.completed ? 'line-through text-gray-400' : ''}>
                  {formatTaskName(task.name)}
                </span>
              </div>
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteTask(task.id)}
                className="text-blue-500 hover:text-blue-700"
              >
                删除
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskManagement;
