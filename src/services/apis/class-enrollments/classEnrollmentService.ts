import axiosClient from "@/services/axiosClient";
import { BaseResponseAPIDto } from "../baseResponseAPI";
import { ListClassEnrollmentsResponseDto } from "./listClassEnrollmentsResponse";
import { handleAxiosError } from "../handleError";
import { ClassEnrollmentResponseDto } from "./classEnrollmentResponse";
import { addNewClassEnrollmentPayload } from "@/pages/user/class-enrollments/AddNewClassEnrollmentPage";
import { assignNewTeacherToClassEnrollmentPayload } from "@/pages/user/class-enrollments/AssignNewTeacherToClassEnrollmentPage";

const classEnrollmentService = {
  getClassEnrollments: async (): Promise<
    BaseResponseAPIDto<ListClassEnrollmentsResponseDto>
  > => {
    try {
      const response = await axiosClient.get(`/class-enrollments`);
      return response.data;
    } catch (error) {
      return handleAxiosError<ListClassEnrollmentsResponseDto>(error);
    }
  },
  getClassEnrollmentByID: async (
    id: string
  ): Promise<BaseResponseAPIDto<ClassEnrollmentResponseDto>> => {
    try {
      const response = await axiosClient.get(`/class-enrollments/${id}`);
      return response.data;
    } catch (error) {
      return handleAxiosError<ClassEnrollmentResponseDto>(error);
    }
  },
  addNewClassEnrollment: async (
    payload: addNewClassEnrollmentPayload
  ): Promise<BaseResponseAPIDto<ClassEnrollmentResponseDto>> => {
    try {
      const response = await axiosClient.post(`/class-enrollments`, payload);
      return response.data;
    } catch (error) {
      return handleAxiosError<ClassEnrollmentResponseDto>(error);
    }
  },
  assignNewTeacher: async (
    payload: assignNewTeacherToClassEnrollmentPayload,
    classEnrollmentID: string
  ): Promise<BaseResponseAPIDto<ClassEnrollmentResponseDto>> => {
    try {
      const response = await axiosClient.put(
        `/class-enrollments/${classEnrollmentID}/teachers`,
        payload
      );
      return response.data;
    } catch (error) {
      return handleAxiosError<ClassEnrollmentResponseDto>(error);
    }
  },
};

export default classEnrollmentService;
