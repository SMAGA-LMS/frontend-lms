import axiosClient from "@/services/axiosClient";
import { BaseResponseAPIDto } from "../baseResponseAPI";
import { UsersResponseDto } from "./usersResponse";
import { handleAxiosError } from "../handleError";

const userService = {
  getUsers: async (
    userRoleName: string
  ): Promise<BaseResponseAPIDto<UsersResponseDto>> => {
    try {
      const response = await axiosClient.get(`/users?role=${userRoleName}`);
      return response.data;
    } catch (error) {
      return handleAxiosError<UsersResponseDto>(error);
    }
  },
};

export default userService;
