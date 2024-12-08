import AttendanceStatusEnum from "@/enums/AttendanceStatusEnum";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { UserDto } from "../users/user";

export interface StudentAttendance {
  student: UserDto;
  attendanceStatus: string;
}

interface CardUserAttendanceProps {
  user: UserDto;
  attendanceStatus?: string;
  incrementUserAttendance: number;
  disabled: boolean;
  backgroundColor?: string;
  handleSelectedStudentAttendance?: (
    studentAttendance: StudentAttendance
  ) => void;
}

export default function CardUserAttendance({
  user,
  attendanceStatus,
  incrementUserAttendance,
  disabled,
  backgroundColor,
  handleSelectedStudentAttendance,
}: CardUserAttendanceProps) {
  const listAttendanceStatus: string[] = Object.values(AttendanceStatusEnum);

  return (
    <>
      <Card
        key={user.id}
        className={`p-2 ${backgroundColor} shadow-sm shadow-neutral-300`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 ml-2">{incrementUserAttendance}.</div>
            <Avatar className="h-10 w-10">
              <AvatarImage alt={user.name} src={user.avatar} />
              <AvatarFallback className="bg-secondary">
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-muted-foreground">{user.id}</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Select
              defaultValue={attendanceStatus}
              disabled={disabled}
              required
              onValueChange={(val) => {
                if (!handleSelectedStudentAttendance) return;

                const studentAttendance: StudentAttendance = {
                  student: user,
                  attendanceStatus: val,
                };
                handleSelectedStudentAttendance(studentAttendance);
              }}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>
              <SelectContent>
                {listAttendanceStatus.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
    </>
  );
}
