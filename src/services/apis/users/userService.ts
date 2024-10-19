import axiosClient from "@/services/axiosClient";
import { BaseResponseAPIDto } from "../baseResponseAPI";
import { UsersResponseDto } from "./usersResponse";
import { handleAxiosError } from "../handleError";
import { AddNewResponseDto } from "./addNewUserResponse";
import { addNewUserPayload } from "@/pages/user/users/AddNewUserPage";

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
  addNewUser: async (
    payload: addNewUserPayload
  ): Promise<BaseResponseAPIDto<AddNewResponseDto>> => {
    try {
      const response = await axiosClient.post("/users", payload);
      return response.data;
    } catch (error) {
      return handleAxiosError<AddNewResponseDto>(error);
    }
  },
};

export default userService;
