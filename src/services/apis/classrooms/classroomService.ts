import axiosClient from "@/services/axiosClient";
import { BaseResponseAPIDto } from "../baseResponseAPI";
import { ListClassroomsResponseDto } from "./listClassroomsResponse";
import { handleAxiosError } from "../handleError";

const classroomService = {
  getClassrooms: async (): Promise<
    BaseResponseAPIDto<ListClassroomsResponseDto>
  > => {
    try {
      const response = await axiosClient.get(`/classrooms`);
      return response.data;
    } catch (error) {
      return handleAxiosError<ListClassroomsResponseDto>(error);
    }
  },
};

export default classroomService;
