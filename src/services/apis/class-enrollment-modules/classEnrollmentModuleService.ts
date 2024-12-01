import axiosClient from "@/services/axiosClient";
import { BaseResponseAPIDto } from "../baseResponseAPI";
import { handleAxiosError } from "../handleError";
import { ListClassEnrollmentModulesResponseDto } from "./listClassEnrollmentModulesResponse";
import { ClassEnrollmentResponseDto } from "../class-enrollments/classEnrollmentResponse";

const classEnrollmentModuleService = {
  addNewClassEnrollmentModule: async (
    payload: FormData
  ): Promise<BaseResponseAPIDto<ClassEnrollmentResponseDto>> => {
    try {
      const reqPayload = new FormData();
      reqPayload.append(
        "class_enrollment_id",
        payload.get("classEnrollmentID") as string
      );
      reqPayload.append("name", payload.get("name") as string);
      reqPayload.append("description", payload.get("description") as string);

      if (payload.get("file")) {
        reqPayload.append("file", payload.get("file") as File);
      }

      const response = await axiosClient.post(
        "/class-enrollment-modules",
        reqPayload
      );
      return response.data;
    } catch (error) {
      return handleAxiosError<ClassEnrollmentResponseDto>(error);
    }
  },
  getClassEnrollmentModules: async (
    classEnrollmentID: number
  ): Promise<BaseResponseAPIDto<ListClassEnrollmentModulesResponseDto>> => {
    try {
      const response = await axiosClient.get(
        `/class-enrollment-modules?class_enrollment_id=${classEnrollmentID}`
      );
      return response.data;
    } catch (error) {
      return handleAxiosError<ListClassEnrollmentModulesResponseDto>(error);
    }
  },
};

export default classEnrollmentModuleService;
