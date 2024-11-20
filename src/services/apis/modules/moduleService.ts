import axiosClient from "@/services/axiosClient";
import { BaseResponseAPIDto } from "../baseResponseAPI";
import { ModuleResponseDto } from "./moduleResponse";
import { handleAxiosError } from "../handleError";

const moduleService = {
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
