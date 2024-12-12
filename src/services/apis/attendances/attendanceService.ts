import axiosClient from "@/services/axiosClient";
import { BaseResponseAPIDto } from "../baseResponseAPI";
import { ListAttendancesResponseDto } from "./listAttendancesResponse";
import { handleAxiosError } from "../handleError";
import { AddNewSessionRecordAttendancesPayload } from "@/pages/user/class-enrollments/attendances/AddNewSessionRecordAttendancesPage";

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
  AddNewSessionRecordAttendances: async (
    payload: AddNewSessionRecordAttendancesPayload
  ): Promise<BaseResponseAPIDto<ListAttendancesResponseDto>> => {
    try {
      const reqPayload = {
        class_enrollment_id: payload.classEnrollmentID,
        title: payload.title,
        date_time: payload.dateTime,
        description: payload.description,
        students: payload.students.map((student) => ({
          student_id: student.studentID,
          status: student.status,
        })),
      };
      const response = await axiosClient.post("/attendances", reqPayload);
      return response.data;
    } catch (error) {
      return handleAxiosError<ListAttendancesResponseDto>(error);
    }
  },
};

export default attendanceService;
