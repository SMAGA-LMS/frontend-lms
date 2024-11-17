import { Badge } from "../ui/badge";
import { ClassEnrollmentDto } from "./classEnrollment";

interface CardClassEnrollmentItemProps {
  data: ClassEnrollmentDto;
}

export default function CardClassEnrollmentItem({
  data,
}: CardClassEnrollmentItemProps) {
  return (
    <>
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
    </>
  );
}
