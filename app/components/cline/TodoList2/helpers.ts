import { TodoItem } from './interface';

/**
 * Filter todo items based on search text
 */
export const filterTodoItems = (items: TodoItem[], searchText: string): TodoItem[] => {
  if (!searchText.trim()) {
    return items;
  }

  const lowerSearchText = searchText.toLowerCase();
  return items.filter((item) =>
    item.title.toLowerCase().includes(lowerSearchText)
  );
};

/**
 * Sort todo items with incomplete items first
 */
export const sortTodoItems = (items: TodoItem[]): TodoItem[] => {
  return [...items].sort((a, b) => {
    if (a.completed === b.completed) {
      return 0;
    }
    return a.completed ? 1 : -1;
  });
};