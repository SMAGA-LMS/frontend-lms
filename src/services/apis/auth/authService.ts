import axiosClient from "@/services/axiosClient";
import { BaseResponseAPIDto } from "@/services/apis/baseResponseAPI";
import { loginPayload } from "@/pages/login/LoginPage";
import { LoginResponseDto } from "./loginResponse";
import { AuthResponseDto } from "./authResponse";
import { handleAxiosError } from "../handleError";

type LogoutResponseDto = null;

const authService = {
  login: async (
    payload: loginPayload
  ): Promise<BaseResponseAPIDto<LoginResponseDto>> => {
    try {
      const reqPayload = {
        username: payload.username,
        password: payload.password,
        device_name: payload.deviceName,
      };
      const response = await axiosClient.post("/auth/login", reqPayload);
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

  me: async (): Promise<BaseResponseAPIDto<AuthResponseDto>> => {
    try {
      const response = await axiosClient.get("/auth/me");
      console.log("response: ", response);
      return response.data;
    } catch (error: any) {
      return handleAxiosError<AuthResponseDto>(error);
    }
  },
};

export default authService;
