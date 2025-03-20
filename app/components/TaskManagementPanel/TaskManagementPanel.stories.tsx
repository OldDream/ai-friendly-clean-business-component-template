/*
 * @Author: huangyuning huangyuning@vv.cn
 * @Date: 2025-03-19 19:18:43
 * @LastEditors: huangyuning huangyuning@vv.cn
 * @LastEditTime: 2025-03-19 19:41:18
 * @FilePath: /ai-friendly-clean-business-component-template/app/components/TaskManagementPanel/TaskManagementPanel.stories.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TaskManagementPanel } from './index';
import type { TaskItem } from './interface';

const meta: Meta<typeof TaskManagementPanel> = {
  title: 'Business/TaskManagementPanel',
  component: TaskManagementPanel,
  parameters: {
    // layout: 'centered'
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof TaskManagementPanel>;

const mockTasks: TaskItem[] = [
  { id: '1', content: '任务一任务一任务一任务一任务一', completed: true },
  { id: '2', content: '任务二任务二任务二任务二任务二任务二任务二', completed: true },
  { id: '3', content: '任务三任务三任务三任务三任务三任务三任务三任务三', completed: false },
  { id: '4', content: '任务四任务四任务四任务四任务四任务四任务四任务四任务四', completed: false }
];

export const Default: Story = {
  args: {
    initialTasks: mockTasks
  }
};

export const EmptyTasks: Story = {
  args: {
    initialTasks: []
  }
};

export const WithCallbacks: Story = {
  args: {
    initialTasks: mockTasks,
    onTasksChange: (tasks) => console.log('Tasks changed:', tasks),
    onSearch: (searchKey) => console.log('Search:', searchKey),
    onAddTask: (taskContent) => console.log('Add task:', taskContent),
    onDeleteTask: (taskId) => console.log('Delete task:', taskId),
    onToggleTaskStatus: (taskId, completed) => console.log('Toggle task status:', taskId, completed)
  }
};
