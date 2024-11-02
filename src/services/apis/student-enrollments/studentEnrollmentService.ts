import axiosClient from "@/services/axiosClient";
import { BaseResponseAPIDto } from "../baseResponseAPI";
import { StudentEnrollmentResponseDto } from "./studentEnrollmentResponse";
import { handleAxiosError } from "../handleError";

const studentEnrollmentService = {
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

export default studentEnrollmentService;
