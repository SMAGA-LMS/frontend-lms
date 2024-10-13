/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/services/axiosClient";
import { BaseResponseAPIDto } from "@/services/apis/baseResponseAPI";
import { FormData } from "@/pages/login/LoginPage";
import { LoginResponseDto } from "./loginResponse";
import { authResponseDto } from "./authResponse";
import { AxiosError } from "axios";

type LogoutResponseDto = null;

const handleAxiosError = <T>(error: any): BaseResponseAPIDto<T> => {
  console.log("error: ", error);

  const axiosError: AxiosError<BaseResponseAPIDto<T>> = error;
  // error no response (network error/ server down)
  if (!axiosError.response) {
    return {
      success: false,
      message:
        "Backend server is not active. Please contact the author or try again later!",
      errors: { general: [error.message] },
    };
  }

  // error has response (response defined by Laravel, usually database error)
  if (axiosError.response && axiosError.response.status === 500) {
    return {
      success: false,
      message: axiosError.response.statusText,
      errors: { general: [axiosError.response.statusText] },
    };
  }

  if (axiosError.response && axiosError.response.status === 401) {
    return {
      success: false,
      message: `${axiosError.response.data.message}. Please refresh the page.`,
      errors: { general: [axiosError.response.data.message] },
    };
  }

  // error has response (response defined by our backend controller api resource)
  return axiosError.response.data;
};

const authService = {
  login: async (
    payload: FormData
  ): Promise<BaseResponseAPIDto<LoginResponseDto>> => {
    try {
      const response = await axiosClient.post("/auth/login", payload);
      // success
      return response.data;
    } catch (error: any) {
      return handleAxiosError<LoginResponseDto>(error);
    }
  },

  logout: async (): Promise<BaseResponseAPIDto<LogoutResponseDto>> => {
    try {
      const response = await axiosClient.post("/auth/logout");
      return response.data;
    } catch (error) {
      return handleAxiosError<LogoutResponseDto>(error);
    }
  },

  me: async (): Promise<BaseResponseAPIDto<authResponseDto>> => {
    try {
      const response = await axiosClient.get("/auth/me");
      console.log("response: ", response);
      return response.data;
    } catch (error: any) {
      return handleAxiosError<authResponseDto>(error);
    }
  },
};

export default authService;
