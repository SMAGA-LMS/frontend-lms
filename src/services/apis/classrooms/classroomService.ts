import axiosClient from "@/services/axiosClient";
import { BaseResponseAPIDto } from "../baseResponseAPI";
import { ListClassroomsResponseDto } from "./listClassroomsResponse";
import { handleAxiosError } from "../handleError";
import { ClassroomResponseDto } from "./classroomResponse";
import { addNewClassroomPayload } from "@/pages/user/classrooms/AddNewClassroomPage";

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
  addNewClassroom: async (
    payload: addNewClassroomPayload
  ): Promise<BaseResponseAPIDto<ClassroomResponseDto>> => {
    try {
      const response = await axiosClient.post("/classrooms", payload);
      return response.data;
    } catch (error) {
      return handleAxiosError<ClassroomResponseDto>(error);
    }
  },
};

export default classroomService;
