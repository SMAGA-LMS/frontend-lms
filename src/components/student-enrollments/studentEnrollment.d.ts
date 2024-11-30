import Model from "@/services/model";
import { UserDto } from "../users/user";
import { ClassroomDto } from "../classrooms/classroom";

export interface StudentEnrollmentDto extends Model {
  user: UserDto;
  classroom: ClassroomDto;
}
