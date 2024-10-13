export interface BaseResponseAPIDto<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any;
}
