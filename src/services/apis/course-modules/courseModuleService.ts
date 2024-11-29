import axiosClient from "@/services/axiosClient";
import { BaseResponseAPIDto } from "../baseResponseAPI";
import { handleAxiosError } from "../handleError";
import { CourseModuleResponseDto } from "./courseModuleResponse";
import { ListCourseModulesResponseDto } from "./listCourseModulesResponse";

const courseModuleService = {
  addNewCourseModule: async (
    payload: FormData
  ): Promise<BaseResponseAPIDto<CourseModuleResponseDto>> => {
    try {
      const reqPayload = {
        course_id: payload.get("courseID"),
        name: payload.get("name"),
        description: payload.get("description"),
        file: payload.get("file"),
      };
      const response = await axiosClient.post("/course-modules", reqPayload);
      return response.data;
    } catch (error) {
      return handleAxiosError<CourseModuleResponseDto>(error);
    }
  },
  getCourseModules: async (
    courseID: number
  ): Promise<BaseResponseAPIDto<ListCourseModulesResponseDto>> => {
    try {
      const response = await axiosClient.get(
        `/course-modules?course_id=${courseID}`
      );
      return response.data;
    } catch (error) {
      return handleAxiosError<ListCourseModulesResponseDto>(error);
    }
  },
};

export default courseModuleService;
