import { TodoItem } from './interface';

/**
 * Sort todo items by priority
 */
export const sortByPriority = (items: TodoItem[]): TodoItem[] => {
  const priorityOrder = {
    'high': 1,
    'medium': 2,
    'low': 3
  };
  return [...items].sort((a, b) =>
    priorityOrder[a.priority] - priorityOrder[b.priority]
  );
};

/**
 * Sort todo items by due date
 */
export const sortByDueDate = (items: TodoItem[]): TodoItem[] => {
  return [...items].sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });
};

/**
 * Filter todo items by search text
 */
export const filterBySearchText = (items: TodoItem[], searchText: string): TodoItem[] => {
  const text = searchText.toLowerCase();
  return items.filter(item =>
    item.title.toLowerCase().includes(text)
  );
};

/**
 * Filter todo items by status
 */
export const filterByStatus = (items: TodoItem[], status: 'all' | 'active' | 'completed'): TodoItem[] => {
  switch (status) {
    case 'active':
      return items.filter(item => !item.completed);
    case 'completed':
      return items.filter(item => item.completed);
    default:
      return items;
  }
};