import { ClassroomResponseDto } from "../classrooms/classroomResponse";
import { ListUsersResponseDto } from "../users/listUsersResponse";

export interface ListAvailableStudentsResponseDto {
  classroom: ClassroomResponseDto;
  users: ListUsersResponseDto;
}
