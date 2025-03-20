export interface TaskItem {
  id: string;
  content: string;
  completed: boolean;
}

export interface TaskManagementPanelProps {
  /**
   * 任务列表初始数据
   */
  initialTasks: TaskItem[];

  /**
   * 任务列表数据变更回调
   */
  onTasksChange?: (tasks: TaskItem[]) => void;

  /**
   * 搜索任务回调
   */
  onSearch?: (searchKey: string) => void;

  /**
   * 新增任务回调
   */
  onAddTask?: (taskContent: string) => void;

  /**
   * 删除任务回调
   */
  onDeleteTask?: (taskId: string) => void;

  /**
   * 切换任务完成状态回调
   */
  onToggleTaskStatus?: (taskId: string, completed: boolean) => void;
} 