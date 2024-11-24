import { BaseResponseAPIDto } from "../baseResponseAPI";
import { handleAxiosError } from "../handleError";
import axiosClient from "@/services/axiosClient";
import { ListCoursesResponseDto } from "./listCoursesResponse";
import { addNewCoursePayload } from "@/pages/user/courses/AddNewCoursePage";
import { CourseResponseDto } from "./courseResponse";
import { assignNewTeacherPayload } from "@/pages/user/courses/AssignNewTeacherToCoursePage";

const courseService = {
  getCourses: async (
    userID?: number
  ): Promise<BaseResponseAPIDto<ListCoursesResponseDto>> => {
    try {
      let url = "/courses";
      if (userID) {
        url += `?userID=${userID}`;
      }

      const response = await axiosClient.get(url);
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
  assignNewTeacher: async (
    payload: assignNewTeacherPayload,
    courseID: string
  ): Promise<BaseResponseAPIDto<CourseResponseDto>> => {
    try {
      const response = await axiosClient.put(`/courses/${courseID}`, payload);
      return response.data;
    } catch (error) {
      return handleAxiosError<CourseResponseDto>(error);
    }
  },
};

export default courseService;
