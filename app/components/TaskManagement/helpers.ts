import { Task } from './interface';

/**
 * Format task name to ensure it's displayed correctly
 * This function can be expanded to handle more complex formatting requirements
 * @param taskName The name of the task to format
 * @returns Formatted task name
 */
export const formatTaskName = (taskName: string): string => {
  // Currently just returns the task name, but can be extended for more complex formatting
  return taskName.trim();
};

/**
 * Filter tasks based on a search term
 * @param tasks Array of tasks to filter
 * @param searchTerm Term to search for in task names
 * @returns Filtered tasks array
 */
export const filterTasksBySearchTerm = (tasks: Task[], searchTerm: string): Task[] => {
  if (!searchTerm.trim()) {
    return tasks;
  }

  return tasks.filter(task =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

/**
 * Generate a unique ID for a new task
 * @returns A unique string ID
 */
export const generateTaskId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}; 