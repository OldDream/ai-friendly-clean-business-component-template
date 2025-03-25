export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface TaskManagementProps {
  /**
   * List of tasks to be displayed
   */
  tasks: Task[];

  /**
   * Handler for adding a new task
   * @param taskTitle The title of the new task to be added
   */
  onAdd: (taskTitle: string) => void;

  /**
   * Handler for searching tasks
   * @param searchText The search text to filter tasks
   */
  onSearch: (searchText: string) => void;

  /**
   * Handler for toggling the completion status of a task
   * @param taskId The ID of the task to toggle
   */
  onToggleComplete: (taskId: string) => void;

  /**
   * Handler for deleting a task
   * @param taskId The ID of the task to delete
   */
  onDelete: (taskId: string) => void;

  /**
   * Flag indicating if tasks are currently loading
   */
  isLoading?: boolean;
} 