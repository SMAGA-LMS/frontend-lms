import { Card } from "@/components/ui/card";
import { SessionRecordDto } from "./sessionRecord";
import AttendanceStatusIcon from "../attendances/AttendanceStatusIcon";

interface CardSessionItemProps {
  sessionRecord: SessionRecordDto;
  attendanceStatus?: string;
}

export default function CardSessionItem({
  sessionRecord,
  attendanceStatus,
}: CardSessionItemProps) {
  return (
    <Card className="bg-secondary p-4 rounded-2xl shadow-md w-full max-w-md">
      <div className="grid grid-cols-4 items-center gap-4">
        <div className="col-span-3 space-y-1">
          <h2 className="text-md font-extrabold text-black">
            {sessionRecord.title.length > 15
              ? `${sessionRecord.title.substring(0, 25)}...`
              : sessionRecord.title}
          </h2>
          <p className="text-black text-sm">
            {new Date(sessionRecord.dateTime).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        {attendanceStatus && (
          <div className="flex flex-col items-center">
            <AttendanceStatusIcon attendanceStatus={attendanceStatus} />
          </div>
        )}
      </div>
    </Card>
  );
}
