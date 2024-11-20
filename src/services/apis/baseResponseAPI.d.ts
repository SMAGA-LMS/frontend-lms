export interface BaseResponseAPIDto<T> {
  success: boolean;
  message: string;
  data: T | null;
  errors: any | null;
}
