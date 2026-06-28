export interface ApiResponse<T> {
  success: true;
  timestamp: string;
  data: T;
}
