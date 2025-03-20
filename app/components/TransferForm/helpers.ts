export const formatCurrency = (value?: number): string => {
  if (value === undefined || value === null) return '';
  return `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const parseCurrency = (value?: string): string => {
  if (!value) return '';
  return value.replace(/\¥\s?|(,*)/g, '');
}; 