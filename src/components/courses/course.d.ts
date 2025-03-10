import Model from "@/services/model";
import { UserDto } from "../users/user";

export interface CourseDto extends Model {
  name: string;
  user?: UserDto;
  grade: string;
}
