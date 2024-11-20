import Model from "@/services/model";
import { CourseDto } from "../courses/courses";

export interface ModuleDto extends Model {
  name: string;
  description: string;
  file: string | null;
  course: CourseDto | null;
}
