import axiosClient from "@/services/axiosClient";
import { BaseResponseAPIDto } from "../baseResponseAPI";
import { ListAttendancesResponseDto } from "./listAttendancesResponse";
import { handleAxiosError } from "../handleError";

const attendanceService = {
  getAttendancesForStudent: async (
    userID: number,
    classEnrollmentID: number
  ): Promise<BaseResponseAPIDto<ListAttendancesResponseDto>> => {
    try {
      let url = `/attendances/student/${userID}`;
      if (classEnrollmentID) {
        url += `?class_enrollment_id=${classEnrollmentID}`;
      }

      const response = await axiosClient.get(url);
      return response.data;
    } catch (error) {
      return handleAxiosError<ListAttendancesResponseDto>(error);
    }
  },
  getListAttendancesBySessionRecordID: async (
    sessionRecordID: number
  ): Promise<BaseResponseAPIDto<ListAttendancesResponseDto>> => {
    try {
      const response = await axiosClient.get(
        `/attendances?session_record_id=${sessionRecordID}`
      );
      return response.data;
    } catch (error) {
      return handleAxiosError<ListAttendancesResponseDto>(error);
    }
  },
};

export default attendanceService;
