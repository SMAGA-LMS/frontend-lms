import Model from "@/services/model";
import { CourseDto } from "../courses/courses";
import { ModuleDto } from "../modules/module";

export interface CourseModuleDto extends Model {
  module: ModuleDto;
  course: CourseDto;
}
