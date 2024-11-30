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
        url += `?user_id=${userID}`;
      }

      const response = await axiosClient.get(url);
      return response.data;
    } catch (error) {
      return handleAxiosError<ListCoursesResponseDto>(error);
    }
  },
  getCourseDetailByID: async (
    courseID: number
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
      const reqPayload = {
        name: payload.name,
        grade: payload.grade,
        user_id: payload.userID,
      };
      const response = await axiosClient.post("/courses", reqPayload);
      return response.data;
    } catch (error) {
      return handleAxiosError<CourseResponseDto>(error);
    }
  },
  assignNewTeacher: async (
    payload: assignNewTeacherPayload,
    courseID: number
  ): Promise<BaseResponseAPIDto<CourseResponseDto>> => {
    try {
      const reqPayload = {
        user_id: payload.userID,
      };
      const response = await axiosClient.put(
        `/courses/${courseID}`,
        reqPayload
      );
      return response.data;
    } catch (error) {
      return handleAxiosError<CourseResponseDto>(error);
    }
  },
};

export default courseService;
