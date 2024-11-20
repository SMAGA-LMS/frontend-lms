import { Badge } from "@/components/ui/badge";
import { ClassroomDto } from "./classroom";

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
      </div>
    </>
  );
}
