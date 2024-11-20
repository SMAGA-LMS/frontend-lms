import Model from "@/services/model";
import { UserDto } from "../users/users";
import { ClassroomDto } from "../classrooms/classroom";

export interface StudentEnrollmentDto extends Model {
  user: UserDto;
  classroom: ClassroomDto;
}
