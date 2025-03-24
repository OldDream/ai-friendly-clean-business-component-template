export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
}

export interface TodoList2Props {
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
}