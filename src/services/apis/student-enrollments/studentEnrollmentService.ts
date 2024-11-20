import axiosClient from "@/services/axiosClient";
import { BaseResponseAPIDto } from "../baseResponseAPI";
import { StudentEnrollmentResponseDto } from "./studentEnrollmentResponse";
import { handleAxiosError } from "../handleError";
import { assignNewStudentPayload } from "@/pages/user/classrooms/people/AssignNewStudentToClassroomPage";
import { ListUsersResponseDto } from "../users/listUsersResponse";
import { ListClassEnrollmentsResponseDto } from "../class-enrollments/listClassEnrollmentsResponse";

const studentEnrollmentService = {
  getPeopleEnrolledClassroom: async (
    classroomID: number
  ): Promise<BaseResponseAPIDto<ListUsersResponseDto>> => {
    try {
      const response = await axiosClient.get(
        `/student-enrollments?classroomID=${classroomID}`
      );
      return response.data;
    } catch (error) {
      return handleAxiosError<ListUsersResponseDto>(error);
    }
  },
  getAvailableStudents: async (
    classroomID: string
  ): Promise<BaseResponseAPIDto<ListUsersResponseDto>> => {
    try {
      const response = await axiosClient.get(
        `/student-enrollments?classroomID=${classroomID}&isAvailable=true`
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
  getClassEnrollmentByStudentID: async (
    userID?: number
  ): Promise<BaseResponseAPIDto<ListClassEnrollmentsResponseDto>> => {
    try {
      let url = "/student-enrollments";
      if (userID) {
        url += `?userID=${userID}`;
      }

      const response = await axiosClient.get(url);
      return response.data;
    } catch (error) {
      return handleAxiosError<ListClassEnrollmentsResponseDto>(error);
    }
  },
};

export default studentEnrollmentService;
