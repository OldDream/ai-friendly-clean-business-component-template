export interface Task {
  id: string;
  name: string;
  completed: boolean;
}

export interface TaskManagementProps {
  /**
   * List of tasks to be displayed
   */
  tasks: Task[];

  /**
   * Handler for adding a new task
   * @param taskName The name of the new task to be added
   */
  onAddTask: (taskName: string) => void;

  /**
   * Handler for searching tasks
   * @param searchTerm The search term to filter tasks
   */
  onSearch: (searchTerm: string) => void;

  /**
   * Handler for toggling the completion status of a task
   * @param taskId The ID of the task to toggle
   * @param completed The new completion status
   */
  onToggleTask: (taskId: string, completed: boolean) => void;

  /**
   * Handler for deleting a task
   * @param taskId The ID of the task to delete
   */
  onDeleteTask: (taskId: string) => void;

  /**
   * Flag indicating if tasks are currently loading
   */
  isLoading?: boolean;
} 