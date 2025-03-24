import { Task } from "./interface";

/**
 * Filter tasks based on search text
 */
export const filterTasks = (tasks: Task[], searchText: string): Task[] => {
  if (!searchText) return tasks;
  const lowerSearchText = searchText.toLowerCase();
  return tasks.filter((task) =>
    task.content.toLowerCase().includes(lowerSearchText)
  );
};

/**
 * Validate task content
 */
export const isValidTaskContent = (content: string): boolean => {
  return content.trim().length > 0;
};
