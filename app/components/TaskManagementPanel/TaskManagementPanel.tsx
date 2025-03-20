import React, { useState, useCallback } from 'react';
import { Input, Button, Checkbox, Card, List } from 'antd';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import type { TaskManagementPanelProps, TaskItem } from './interface';

const TaskManagementPanel: React.FC<TaskManagementPanelProps> = ({
  initialTasks,
  onTasksChange,
  onSearch,
  onAddTask,
  onDeleteTask,
  onToggleTaskStatus
}) => {
  // 本地状态
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks || []);
  const [searchValue, setSearchValue] = useState('');
  const [newTaskContent, setNewTaskContent] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);

  // 处理搜索
  const handleSearch = useCallback(() => {
    onSearch?.(searchValue);
  }, [onSearch, searchValue]);

  // 处理添加任务
  const handleAddTask = useCallback(() => {
    if (!newTaskContent.trim()) return;

    const newTask: TaskItem = {
      id: Date.now().toString(),
      content: newTaskContent,
      completed: false
    };

    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    setNewTaskContent('');
    setIsAddingTask(false);
    onAddTask?.(newTaskContent);
    onTasksChange?.(newTasks);
  }, [newTaskContent, onAddTask, onTasksChange, tasks]);

  // 处理删除任务
  const handleDeleteTask = useCallback(
    (taskId: string) => {
      const newTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(newTasks);
      onDeleteTask?.(taskId);
      onTasksChange?.(newTasks);
    },
    [onDeleteTask, onTasksChange, tasks]
  );

  // 处理切换任务状态
  const handleToggleTaskStatus = useCallback(
    (taskId: string, checked: boolean) => {
      const newTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, completed: checked } : task
      );
      setTasks(newTasks);
      onToggleTaskStatus?.(taskId, checked);
      onTasksChange?.(newTasks);
    },
    [onTasksChange, onToggleTaskStatus, tasks]
  );

  // 取消添加任务
  const handleCancelAddTask = useCallback(() => {
    setIsAddingTask(false);
    setNewTaskContent('');
  }, []);

  return (
    <Card
      className="w-full max-w-4xl shadow-sm border-slate-200"
      title={<div className="text-lg font-medium">任务管理面板</div>}
      bodyStyle={{ padding: '16px' }}
    >
      <div className="flex items-center mb-4 gap-2">
        <Input
          placeholder="请输入任务进行搜索"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          prefix={<SearchOutlined />}
          className="flex-1"
        />
        <Button
          type="primary"
          onClick={() => setIsAddingTask(true)}
          className="ml-2 whitespace-nowrap"
        >
          新增任务
        </Button>
      </div>

      {isAddingTask && (
        <div className="mb-4 flex items-center">
          <Input
            placeholder="请输入新增的任务信息"
            value={newTaskContent}
            onChange={(e) => setNewTaskContent(e.target.value)}
            className="flex-1"
          />
          <div className="ml-2 flex gap-2">
            <Button onClick={handleAddTask} type="primary">
              确认
            </Button>
            <Button onClick={handleCancelAddTask}>取消</Button>
          </div>
        </div>
      )}

      <List
        dataSource={tasks}
        renderItem={(task) => (
          <List.Item
            key={task.id}
            className="flex items-center justify-between border border-gray-200 rounded-md p-3 mb-2"
          >
            <div className="flex items-center">
              <Checkbox
                checked={task.completed}
                onChange={(e) => handleToggleTaskStatus(task.id, e.target.checked)}
                className="mr-2"
              />
              <span className={task.completed ? 'line-through text-gray-400' : ''}>
                {task.content}
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
          </List.Item>
        )}
      />
    </Card>
  );
};

export default TaskManagementPanel;
