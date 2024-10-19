import { BaseResponseAPIDto } from "../baseResponseAPI";
import { handleAxiosError } from "../handleError";
import axiosClient from "@/services/axiosClient";
import { CoursesResponseDto } from "./coursesResponse";

const courseService = {
  getCourses: async (): Promise<BaseResponseAPIDto<CoursesResponseDto>> => {
    try {
      const response = await axiosClient.get(`/courses`);
      return response.data;
    } catch (error) {
      return handleAxiosError<CoursesResponseDto>(error);
    }
  },
};

export default courseService;
