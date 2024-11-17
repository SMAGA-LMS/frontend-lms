import axiosClient from "@/services/axiosClient";
import { BaseResponseAPIDto } from "../baseResponseAPI";
import { ListClassEnrollmentsResponseDto } from "./listClassEnrollmentsResponse";
import { handleAxiosError } from "../handleError";

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
};

export default classEnrollmentService;
