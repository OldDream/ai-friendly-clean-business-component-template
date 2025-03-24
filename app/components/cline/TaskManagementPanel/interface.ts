export interface Task {
  id: string;
  content: string;
  completed: boolean;
}

export interface TaskManagementPanelProps {
  /**
   * List of tasks to display
   */
  tasks: Task[];

  /**
   * Callback when a new task is added
   */
  onAddTask: (content: string) => void;

  /**
   * Callback when a task's completion status is toggled
   */
  onToggleTask: (id: string) => void;

  /**
   * Callback when a task is deleted
   */
  onDeleteTask: (id: string) => void;

  /**
   * Callback when search input changes
   */
  onSearch: (searchText: string) => void;
}
