import axiosClient from "@/services/axiosClient";
import { BaseResponseAPIDto } from "../baseResponseAPI";
import { ListUsersResponseDto } from "./listUsersResponse";
import { handleAxiosError } from "../handleError";
import { UserResponseDto } from "./userResponse";
import { addNewUserPayload } from "@/pages/user/users/AddNewUserPage";

const userService = {
  getUsers: async (
    userRoleName: string
  ): Promise<BaseResponseAPIDto<ListUsersResponseDto>> => {
    try {
      const response = await axiosClient.get(`/users?role=${userRoleName}`);
      return response.data;
    } catch (error) {
      return handleAxiosError<ListUsersResponseDto>(error);
    }
  },
  addNewUser: async (
    payload: addNewUserPayload
  ): Promise<BaseResponseAPIDto<UserResponseDto>> => {
    try {
      const response = await axiosClient.post("/users", payload);
      return response.data;
    } catch (error) {
      return handleAxiosError<UserResponseDto>(error);
    }
  },
};

export default userService;
