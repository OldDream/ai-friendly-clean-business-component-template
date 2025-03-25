export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
}

export interface TodoList3Props {
  /**
   * List of todo items
   */
  items: TodoItem[];
  /**
   * Callback when a todo item is toggled
   */
  onToggle: (id: string) => void;
  /**
   * Callback when a todo item is deleted
   */
  onDelete: (id: string) => void;
  /**
   * Callback when search text changes
   */
  onSearch: (searchText: string) => void;
  /**
   * Callback when priority is changed
   */
  onPriorityChange: (id: string, priority: TodoItem['priority']) => void;
  /**
   * Callback when due date is changed
   */
  onDateChange: (id: string, date: string) => void;
}