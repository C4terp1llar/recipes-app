export interface INotification {
  id: number;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  timeout: number;
}

export interface IPagination {
  total: number,
  page: number,
  limit: number,
  hasMore: boolean
}