import { BaseResponseAPIDto } from "../baseResponseAPI";
import { handleAxiosError } from "../handleError";
import axiosClient from "@/services/axiosClient";
import { ListCoursesResponseDto } from "./ListCoursesResponse";
import { addNewCoursePayload } from "@/pages/user/courses/AddNewCoursePage";
import { CourseResponseDto } from "./courseResponse";

const courseService = {
  getCourses: async (): Promise<BaseResponseAPIDto<ListCoursesResponseDto>> => {
    try {
      const response = await axiosClient.get(`/courses`);
      return response.data;
    } catch (error) {
      return handleAxiosError<ListCoursesResponseDto>(error);
    }
  },
  getCourseDetailByID: async (
    courseID: string
  ): Promise<BaseResponseAPIDto<CourseResponseDto>> => {
    try {
      const response = await axiosClient.get(`/courses/${courseID}`);
      return response.data;
    } catch (error) {
      return handleAxiosError<CourseResponseDto>(error);
    }
  },
  addNewCourse: async (
    payload: addNewCoursePayload
  ): Promise<BaseResponseAPIDto<CourseResponseDto>> => {
    try {
      const response = await axiosClient.post("/courses", payload);
      return response.data;
    } catch (error) {
      return handleAxiosError<CourseResponseDto>(error);
    }
  },
};

export default courseService;
