import { Badge } from "@/components/ui/badge";
import { CourseDto } from "./courses";

interface CardCourseItemProps {
  data: CourseDto;
}

export default function CardCourseItem({ data }: CardCourseItemProps) {
  return (
    <>
      <div className="flex flex-col w-full bg-secondary rounded-md p-4 py-6">
        <div className="flex justify-between items-center w-full">
          <span className="font-bold">{data.name}</span>
          <Badge variant="default" className="rounded-md">
            {data.grade}
          </Badge>
        </div>
      </div>
    </>
  );
}
