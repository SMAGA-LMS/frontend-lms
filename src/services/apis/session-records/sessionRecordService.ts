import axiosClient from "@/services/axiosClient";
import { BaseResponseAPIDto } from "../baseResponseAPI";
import { ListSessionRecordsResponseDto } from "./listSessionRecordsResponse";
import { handleAxiosError } from "../handleError";
import { SessionRecordResponseDto } from "./sessionRecordResponse";

const sessionRecordService = {
  getListSessionRecordsByClassEnrollmentID: async (
    classEnrollmentID: number
  ): Promise<BaseResponseAPIDto<ListSessionRecordsResponseDto>> => {
    try {
      let url = "/session-records";
      if (classEnrollmentID) {
        url += `?class_enrollment_id=${classEnrollmentID}`;
      }
      const response = await axiosClient.get(url);
      return response.data;
    } catch (error) {
      return handleAxiosError<ListSessionRecordsResponseDto>(error);
    }
  },
  getSessionRecordByID: async (
    sessionRecordID: number
  ): Promise<BaseResponseAPIDto<SessionRecordResponseDto>> => {
    try {
      const response = await axiosClient.get(
        `/session-records/${sessionRecordID}`
      );
      return response.data;
    } catch (error) {
      return handleAxiosError<SessionRecordResponseDto>(error);
    }
  },
};

export default sessionRecordService;
