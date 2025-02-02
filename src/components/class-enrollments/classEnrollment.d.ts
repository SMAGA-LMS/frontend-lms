import Model from "@/services/model";
import { ClassroomDto } from "../classrooms/classroom";
import { CourseDto } from "../courses/course";
import { UserDto } from "../users/user";

export interface ClassEnrollmentDto extends Model {
  classroom: ClassroomDto;
  course: CourseDto;
  user: UserDto;
}
