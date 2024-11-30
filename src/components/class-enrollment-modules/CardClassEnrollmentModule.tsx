import { ClassEnrollmentDto } from "../class-enrollments/classEnrollment";
import { Badge } from "../ui/badge";

interface CardStarterKitCourseModuleProps {
  data: ClassEnrollmentDto;
}

export default function CardClassEnrollmentModule({
  data,
}: CardStarterKitCourseModuleProps) {
  return (
    <div className="flex w-full bg-secondary rounded-md p-4 mb-2 justify-between">
      <div className="mr-4 text-left">
        <div className="font-bold">
          {data.course.name} | {data.course.grade}
        </div>
        <Badge variant="default" className="rounded-lg">
          {data.classroom.name}
        </Badge>
      </div>
    </div>
  );
}
