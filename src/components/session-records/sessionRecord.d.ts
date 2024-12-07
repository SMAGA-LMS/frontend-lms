import Model from "@/services/model";
import { ClassEnrollmentDto } from "../class-enrollments/classEnrollment";

interface SessionRecordDto extends Model {
  classEnrollment: ClassEnrollmentDto;
  title: string;
  description: string;
  dateTime: Date;
}
