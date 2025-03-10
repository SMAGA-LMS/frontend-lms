import { CourseDto } from "../courses/course";
import { Badge } from "../ui/badge";

interface CardStarterKitCourseModuleProps {
  data: CourseDto;
}

export default function CardStarterKitCourseModule({
  data,
}: CardStarterKitCourseModuleProps) {
  return (
    <div className="flex w-full bg-secondary rounded-md p-4 mb-2 justify-between">
      <div className="mr-4 text-left">
        <div className="font-bold">
          {data.name} | {data.grade}
        </div>
        <Badge variant="default" className="rounded-lg">
          {data.id}
        </Badge>
      </div>
    </div>
  );
}
