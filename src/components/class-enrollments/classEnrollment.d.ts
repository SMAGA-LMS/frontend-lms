import Model from "@/services/model";
import { ClassroomDto } from "../classrooms/classroom";
import { CourseDto } from "../courses/courses";
import { UserDto } from "../users/users";

export interface ClassEnrollmentDto extends Model {
  classroom: ClassroomDto;
  course: CourseDto;
  user: UserDto;
}
