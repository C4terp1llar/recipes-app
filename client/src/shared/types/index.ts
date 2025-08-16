export interface INotification {
  id: number;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  timeout: number;
}

