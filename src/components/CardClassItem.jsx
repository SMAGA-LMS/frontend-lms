import { Badge } from "./ui/badge";

export default function CardClassItem({ classPeriod }) {
  classPeriod.students = [
    {
      id: 1,
      name: "John Doe",
    },
  ];
  const totalStudents = classPeriod.students.length;
  return (
    <>
      <div className="flex w-full bg-secondary rounded-md p-4 mb-2 justify-between">
        <div className="mr-4 text-left">
          <div className="font-bold">{classPeriod.name}</div>
          <Badge variant="default" className="rounded-lg">
            {classPeriod.class_period_code}
          </Badge>
        </div>
        <div className="text-center">
          <div className="text-2xl font-extrabold text-smaga">
            {totalStudents}
          </div>
          <div className="text-sm">anak</div>
        </div>
      </div>
    </>
  );
}
