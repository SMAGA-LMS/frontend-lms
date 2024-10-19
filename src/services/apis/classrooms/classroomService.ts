import axiosClient from "@/services/axiosClient";
import { BaseResponseAPIDto } from "../baseResponseAPI";
import { ClassroomsResponseDto } from "./classroomsResponse";
import { handleAxiosError } from "../handleError";

const classroomService = {
  getClassrooms: async (): Promise<
    BaseResponseAPIDto<ClassroomsResponseDto>
  > => {
    try {
      const response = await axiosClient.get(`/classrooms`);
      return response.data;
    } catch (error) {
      return handleAxiosError<ClassroomsResponseDto>(error);
    }
  },
};

export default classroomService;
