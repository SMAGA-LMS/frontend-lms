import { UserDto } from "@/components/users/user";

export interface LoginResponseDto {
  user: UserDto;
  token: string;
}
