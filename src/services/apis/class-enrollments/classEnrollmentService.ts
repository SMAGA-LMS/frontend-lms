import axiosClient from "@/services/axiosClient";
import { BaseResponseAPIDto } from "../baseResponseAPI";
import { ListClassEnrollmentsResponseDto } from "./listClassEnrollmentsResponse";
import { handleAxiosError } from "../handleError";
import { ClassEnrollmentResponseDto } from "./classEnrollmentResponse";
import { addNewClassEnrollmentPayload } from "@/pages/user/class-enrollments/AddNewClassEnrollmentPage";

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
};

export default classEnrollmentService;
