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
      const reqPayload = new FormData();
      reqPayload.append("course_id", payload.get("courseID") as string);
      reqPayload.append("name", payload.get("name") as string);
      reqPayload.append("description", payload.get("description") as string);

      if (payload.get("file")) {
        reqPayload.append("file", payload.get("file") as File);
      }

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
  getCourseModuleDetailByID: async (
    courseModuleID: number
  ): Promise<BaseResponseAPIDto<CourseModuleResponseDto>> => {
    try {
      const response = await axiosClient.get(
        `/course-modules/${courseModuleID}`
      );
      return response.data;
    } catch (error) {
      return handleAxiosError<CourseModuleResponseDto>(error);
    }
  },
};

export default courseModuleService;
