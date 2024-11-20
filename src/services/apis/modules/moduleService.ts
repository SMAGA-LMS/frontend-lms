import axiosClient from "@/services/axiosClient";
import { BaseResponseAPIDto } from "../baseResponseAPI";
import { ModuleResponseDto } from "./moduleResponse";
import { handleAxiosError } from "../handleError";

const moduleService = {
  addNewModule: async (
    payload: FormData
  ): Promise<BaseResponseAPIDto<ModuleResponseDto>> => {
    try {
      const response = await axiosClient.post("/modules", payload);
      return response.data;
    } catch (error) {
      return handleAxiosError<ModuleResponseDto>(error);
    }
  },
  getCourseModules: async (
    courseID: number
  ): Promise<BaseResponseAPIDto<ModuleResponseDto[]>> => {
    try {
      const response = await axiosClient.get(`/modules?courseID=${courseID}`);
      return response.data;
    } catch (error) {
      return handleAxiosError<ModuleResponseDto[]>(error);
    }
  },
  getModuleDetailByID: async (
    moduleID: number
  ): Promise<BaseResponseAPIDto<ModuleResponseDto>> => {
    try {
      const response = await axiosClient.get(`/modules/${moduleID}`);
      return response.data;
    } catch (error) {
      return handleAxiosError<ModuleResponseDto>(error);
    }
  },
};

export default moduleService;
