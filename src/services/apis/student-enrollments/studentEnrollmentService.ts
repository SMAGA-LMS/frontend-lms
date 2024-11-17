import axiosClient from "@/services/axiosClient";
import { BaseResponseAPIDto } from "../baseResponseAPI";
import { StudentEnrollmentResponseDto } from "./studentEnrollmentResponse";
import { handleAxiosError } from "../handleError";
import { assignNewStudentPayload } from "@/pages/user/classrooms/AssignNewStudentToClassroomPage";
import { ListUsersResponseDto } from "../users/listUsersResponse";
import { ListStudentEnrollmentResponseDto } from "./listStudentEnrollmentResponse";

const studentEnrollmentService = {
  getPeopleEnrolledClassroom: async (
    classroomID: string
  ): Promise<BaseResponseAPIDto<ListStudentEnrollmentResponseDto>> => {
    try {
      const response = await axiosClient.get(
        `/classrooms/${classroomID}/students`
      );
      return response.data;
    } catch (error) {
      return handleAxiosError<ListStudentEnrollmentResponseDto>(error);
    }
  },
  getAvailableStudents: async (
    classroomID: string
  ): Promise<BaseResponseAPIDto<ListUsersResponseDto>> => {
    try {
      const response = await axiosClient.get(
        `/classrooms/${classroomID}/students?isAvailable=true`
      );
      return response.data;
    } catch (error) {
      return handleAxiosError<ListUsersResponseDto>(error);
    }
  },
  assignNewStudent: async (
    payload: assignNewStudentPayload
  ): Promise<BaseResponseAPIDto<StudentEnrollmentResponseDto>> => {
    try {
      const response = await axiosClient.post(`/student-enrollments`, payload);
      return response.data;
    } catch (error) {
      return handleAxiosError<StudentEnrollmentResponseDto>(error);
    }
  },
};

export default studentEnrollmentService;
