import Model from "@/services/model";
import { ModuleDto } from "../modules/module";
import { ClassEnrollmentDto } from "../class-enrollments/classEnrollment";

export interface ClassEnrollmentModuleDto extends Model {
  module: ModuleDto;
  classEnrollment: ClassEnrollmentDto;
}
