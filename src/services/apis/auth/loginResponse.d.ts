import { UserDto } from "@/components/users/users";

export interface LoginResponseDto {
  user: UserDto;
  token: string;
}
