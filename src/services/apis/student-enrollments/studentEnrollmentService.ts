import axiosClient from "@/services/axiosClient";
import { BaseResponseAPIDto } from "../baseResponseAPI";
import { StudentEnrollmentResponseDto } from "./studentEnrollmentResponse";
import { handleAxiosError } from "../handleError";
import { assignNewStudentPayload } from "@/pages/user/classrooms/people/AssignNewStudentToClassroomPage";
import { ListUsersResponseDto } from "../users/listUsersResponse";

const studentEnrollmentService = {
  getPeopleEnrolledClassroom: async (
    classroomID: number
  ): Promise<BaseResponseAPIDto<ListUsersResponseDto>> => {
    try {
      const response = await axiosClient.get(
        `/student-enrollments?classroom_id=${classroomID}`
      );
      return response.data;
    } catch (error) {
      return handleAxiosError<ListUsersResponseDto>(error);
    }
  },
  getAvailableStudents: async (
    classroomID: number
  ): Promise<BaseResponseAPIDto<ListUsersResponseDto>> => {
    try {
      const response = await axiosClient.get(
        `/student-enrollments?classroom_id=${classroomID}&is_available=true`
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
      const reqPayload = {
        classroom_id: payload.classroomID,
        user_id: payload.userID,
      };
      const response = await axiosClient.post(
        `/student-enrollments`,
        reqPayload
      );
      return response.data;
    } catch (error) {
      return handleAxiosError<StudentEnrollmentResponseDto>(error);
    }
  },
  getStudentEnrollmentByStudentID: async (
    studentID: number
  ): Promise<BaseResponseAPIDto<StudentEnrollmentResponseDto>> => {
    try {
      const response = await axiosClient.get(
        `/student-enrollments/student/${studentID}/classroom`
      );
      return response.data;
    } catch (error) {
      return handleAxiosError<StudentEnrollmentResponseDto>(error);
    }
  },
};

export default studentEnrollmentService;
