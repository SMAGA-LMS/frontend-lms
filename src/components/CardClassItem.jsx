import { Badge } from "./ui/badge";

export default function CardClassItem({ data }) {
  return (
    <>
      <div className="flex w-full bg-secondary rounded-md p-4 mb-2 justify-between">
        <div className="mr-4 text-left">
          <div className="font-bold">{data.class_period_name}</div>
          <Badge variant="default" className="rounded-lg">
            {data.class_period_code}
          </Badge>
        </div>
        <div className="text-center">
          <div className="text-2xl font-extrabold text-smaga">
            {data.total_students_enrolled}
          </div>
          <div className="text-sm">anak</div>
        </div>
      </div>
    </>
  );
}
