import { Badge } from "@/components/ui/badge";
import { ClassPeriodDto } from "./classrooms";

interface CardClassItemProps {
  data: ClassPeriodDto;
}

export default function CardClassItem({ data }: CardClassItemProps) {
  return (
    <>
      <div className="flex w-full bg-secondary rounded-md p-4 mb-2 justify-between">
        <div className="mr-4 text-left">
          <div className="font-bold">{data.classPeriodName}</div>
          <Badge variant="default" className="rounded-lg">
            {data.classPeriodCode}
          </Badge>
        </div>
        <div className="text-center">
          <div className="text-2xl font-extrabold text-smaga">
            {data.totalStudentsEnrolled}
          </div>
          <div className="text-sm">anak</div>
        </div>
      </div>
    </>
  );
}
