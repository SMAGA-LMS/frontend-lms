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

interface CardUserAttendanceProps {
  user: UserDto;
  attendanceStatus: string;
  incrementUserAttendance: number;
  disabled: boolean;
  backgroundColor?: string;
}

export default function CardUserAttendance({
  user,
  attendanceStatus,
  incrementUserAttendance,
  disabled,
  backgroundColor,
}: CardUserAttendanceProps) {
  const listAttendanceStatus: string[] = Object.values(AttendanceStatusEnum);

  return (
    <>
      <Card
        key={user.id}
        className={`p-4 ${backgroundColor} shadow-sm shadow-neutral-300`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">{incrementUserAttendance}.</div>
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
            <Select defaultValue={attendanceStatus} disabled={disabled}>
              <SelectTrigger className="w-[100px]">
                <SelectValue />
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
