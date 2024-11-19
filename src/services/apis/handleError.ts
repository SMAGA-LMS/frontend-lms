/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import { BaseResponseAPIDto } from "./baseResponseAPI";

const handleAxiosError = <T>(error: any): BaseResponseAPIDto<T> => {
  console.log("error: ", error);

  const axiosError: AxiosError<BaseResponseAPIDto<T>> = error;
  // error no response (network error/ server down)
  if (!axiosError.response) {
    return {
      success: false,
      message: axiosError.message,
      data: null,
      errors: { general: [error.message] },
    };
  }

  // error has response (response defined by Laravel, usually database error)
  if (axiosError.response && axiosError.response.status === 500) {
    return {
      success: false,
      message: "Internal server error.",
      data: null,
      errors: { general: ["Internal server error."] },
    };
  }

  if (axiosError.response && axiosError.response.status === 401) {
    return {
      success: false,
      message: axiosError.response.data.message,
      data: null,
      errors: { general: [axiosError.response.data.message] },
    };
  }

  // error has response (response defined by our backend controller api resource)
  return axiosError.response.data;
};

export { handleAxiosError };
