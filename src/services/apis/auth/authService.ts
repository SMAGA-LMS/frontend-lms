/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/services/axiosClient";
import { BaseResponseAPIDto } from "@/services/apis/baseResponseAPI";
import { FormData } from "@/pages/login/LoginPage";
import { LoginResponseDto } from "./loginResponse";
import { authResponseDto } from "./authResponse";
import { AxiosError } from "axios";

const authService = {
  login: async (
    payload: FormData
  ): Promise<BaseResponseAPIDto<LoginResponseDto>> => {
    try {
      const response = await axiosClient.post("/auth/login", payload);
      // success
      return response.data;
    } catch (error: any) {
      console.log("error: ", error);

      const axiosError: AxiosError<BaseResponseAPIDto<LoginResponseDto>> =
        error;
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

      // error has response (response defined by our backend controller api resource)
      return axiosError.response.data;
    }
  },

  logout: async (): Promise<BaseResponseAPIDto<null>> => {
    try {
      const response = await axiosClient.post("/auth/logout");
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      let responseData: BaseResponseAPIDto<null> = {
        success: false,
        message: "",
        errors: {},
      };

      if (error.response && error.response.status === 401) {
        const errorMessage = `${error.response.data.message}. Please refresh the page.`;
        responseData.message = errorMessage;
      }

      if (error.response && error.response.status === 500) {
        const errorMessage = error.response.statusText;
        responseData.message = errorMessage;
      }

      if (!error.response) {
        const errorMessage =
          "Backend server is not active. Please contact the author or try again later!";
        responseData.message = errorMessage;
        responseData.errors = { general: [error.message] };
      }

      return responseData;
    }
  },

  me: async (): Promise<BaseResponseAPIDto<authResponseDto>> => {
    try {
      const response = await axiosClient.get("/auth/me");
      console.log("response: ", response);
      return response.data;
    } catch (error: any) {
      console.log("error: ", error);
      let responseData: BaseResponseAPIDto<authResponseDto> = {
        success: false,
        message: "",
        errors: {},
      };

      if (error.response && error.response.status === 401) {
        const errorMessage = `${error.response.data.message}. Please refresh the page.`;
        responseData.message = errorMessage;
      }

      if (error.response && error.response.status === 500) {
        const errorMessage = error.response.statusText;
        responseData.message = errorMessage;
      }

      if (!error.response) {
        const errorMessage =
          "Backend server is not active. Please contact the author or try again later!";
        responseData.message = errorMessage;
        responseData.errors = { general: [error.message] };
      }

      return responseData;
    }
  },
};

export default authService;
