/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/services/axiosClient";
import { BaseResponseAPIDto } from "@/services/apis/baseResponseAPI";
import { FormData } from "@/pages/login/LoginPage";
import { LoginResponseDto } from "./loginResponse";
import { authResponseDto } from "./authResponse";

type Response<T> = BaseResponseAPIDto<T>;

const authService = {
  login: async (
    payload: FormData
  ): Promise<BaseResponseAPIDto<LoginResponseDto>> => {
    try {
      const response = await axiosClient.post("/auth/login", payload);
      console.log("response: ", response);
      return response.data;
    } catch (error: any) {
      console.log("error: ", error);
      if (error.response) {
        return error.response.data;
      } else {
        const errorMessage =
          "Server backend lagi ga aktif nih. Mohon kontak author atau coba lagi nanti ya!";
        const responseData: Response<LoginResponseDto> = {
          success: false,
          message: errorMessage,
          errors: {
            general: [error.message],
          },
        };
        return responseData;
      }
    }
  },

  logout: async (): Promise<BaseResponseAPIDto<null>> => {
    try {
      const response = await axiosClient.post("/auth/logout");
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      let responseData: Response<null> = {
        success: false,
        message: "",
        errors: {},
      };

      if (error.response && error.response.status === 401) {
        const errorMessage = `${error.response.data.message}. Please refresh the page.`;
        responseData.message = errorMessage;
      }

      if (!error.response) {
        const errorMessage = "Something went wrong, please try again later";
        responseData.message = errorMessage;
        responseData.errors = error.response.data.data.errors;
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
      let responseData: Response<authResponseDto> = {
        success: false,
        message: "",
        errors: {},
      };

      if (error.response && error.response.status === 401) {
        const errorMessage = `${error.response.data.message}. Please refresh the page.`;
        responseData.message = errorMessage;
      }

      if (!error.response) {
        const errorMessage = "Something went wrong, please try again later";
        responseData.message = errorMessage;
        responseData.errors = error.response.data.data.errors;
      }

      return responseData;
    }
  },
};

export default authService;
