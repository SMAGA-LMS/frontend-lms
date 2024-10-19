import { BaseResponseAPIDto } from "../baseResponseAPI";
import { handleAxiosError } from "../handleError";
import axiosClient from "@/services/axiosClient";
import { CoursesResponseDto } from "./coursesResponse";
import { CourseDetailResponseDto } from "./courseDetailResponse";

const courseService = {
  getCourses: async (): Promise<BaseResponseAPIDto<CoursesResponseDto>> => {
    try {
      const response = await axiosClient.get(`/courses`);
      return response.data;
    } catch (error) {
      return handleAxiosError<CoursesResponseDto>(error);
    }
  },
  getCourseDetailByID: async (
    courseID: string
  ): Promise<BaseResponseAPIDto<CourseDetailResponseDto>> => {
    try {
      const response = await axiosClient.get(`/courses/${courseID}`);
      return response.data;
    } catch (error) {
      return handleAxiosError<CourseDetailResponseDto>(error);
    }
  },
};

export default courseService;
