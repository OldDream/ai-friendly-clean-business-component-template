/**
 * 过滤任务列表
 * @param tasks 任务列表
 * @param searchKey 搜索关键词
 * @returns 过滤后的任务列表
 */
export const filterTasks = (tasks: Array<{ id: string; content: string; completed: boolean }>, searchKey: string) => {
  if (!searchKey.trim()) return tasks;
  return tasks.filter(task => task.content.toLowerCase().includes(searchKey.toLowerCase()));
};

/**
 * 生成唯一ID
 * @returns 唯一ID字符串
 */
export const generateUniqueId = () => {
  return Date.now().toString() + Math.random().toString(36).substring(2, 9);
}; 