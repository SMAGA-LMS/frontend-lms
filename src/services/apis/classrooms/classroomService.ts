import axiosClient from "@/services/axiosClient";
import { BaseResponseAPIDto } from "../baseResponseAPI";
import { ListClassroomsResponseDto } from "./listClassroomsResponse";
import { handleAxiosError } from "../handleError";
import { ClassroomResponseDto } from "./classroomResponse";
import { addNewClassroomPayload } from "@/pages/user/classrooms/AddNewClassroomPage";
import { StudentEnrollmentResponseDto } from "../student-enrollments/studentEnrollmentResponse";

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
  getClassroomDetailByID: async (
    classroomID: string
  ): Promise<BaseResponseAPIDto<ClassroomResponseDto>> => {
    try {
      const response = await axiosClient.get(`/classrooms/${classroomID}`);
      return response.data;
    } catch (error) {
      return handleAxiosError<ClassroomResponseDto>(error);
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
  getPeopleEnrolledClassroom: async (
    classroomID: string
  ): Promise<BaseResponseAPIDto<StudentEnrollmentResponseDto>> => {
    try {
      const response = await axiosClient.get(
        `/student-enrollments?classroom_id=${classroomID}`
      );
      return response.data;
    } catch (error) {
      return handleAxiosError<StudentEnrollmentResponseDto>(error);
    }
  },
};

export default classroomService;
