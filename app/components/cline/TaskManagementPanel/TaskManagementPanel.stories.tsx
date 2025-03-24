import type { Meta, StoryObj } from '@storybook/react';
import { TaskManagementPanel } from './TaskManagementPanel';
import { Task } from './interface';

const meta: Meta<typeof TaskManagementPanel> = {
  title: 'Components/TaskManagementPanel',
  component: TaskManagementPanel,
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof TaskManagementPanel>;

const defaultTasks: Task[] = [
  { id: '1', content: '完成产品需求文档', completed: true },
  { id: '2', content: '设计系统架构图', completed: false },
  { id: '3', content: '开发用户认证模块', completed: false },
  { id: '4', content: '编写单元测试', completed: false }
];

export const Default: Story = {
  args: {
    tasks: defaultTasks,
    onAddTask: (content) => {
      console.log('添加任务:', content);
    },
    onToggleTask: (id) => {
      console.log('切换任务状态:', id);
    },
    onDeleteTask: (id) => {
      console.log('删除任务:', id);
    },
    onSearch: (searchText) => {
      console.log('搜索任务:', searchText);
    }
  }
};

export const Empty: Story = {
  args: {
    tasks: [],
    onAddTask: (content) => {
      console.log('添加任务:', content);
    },
    onToggleTask: (id) => {
      console.log('切换任务状态:', id);
    },
    onDeleteTask: (id) => {
      console.log('删除任务:', id);
    },
    onSearch: (searchText) => {
      console.log('搜索任务:', searchText);
    }
  }
};
