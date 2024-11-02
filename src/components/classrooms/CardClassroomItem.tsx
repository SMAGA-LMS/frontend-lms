import { Badge } from "@/components/ui/badge";
import { ClassroomDto } from "./classrooms";

interface CardClassItemProps {
  data: ClassroomDto;
}

export default function CardClassroomItem({ data }: CardClassItemProps) {
  return (
    <>
      <div className="flex w-full bg-secondary rounded-md p-4 mb-2 justify-between">
        <div className="mr-4 text-left">
          <div className="font-bold">{data.name}</div>
          <Badge variant="default" className="rounded-lg">
            {data.grade}
          </Badge>
        </div>
        <div className="text-center">
          <div className="text-2xl font-extrabold text-smaga">
            {/* {data.totalStudentsEnrolled} */}
            100
          </div>
          <div className="text-sm">anak</div>
        </div>
      </div>
    </>
  );
}
