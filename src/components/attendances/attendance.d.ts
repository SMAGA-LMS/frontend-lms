import Model from "@/services/model";
import { UserDto } from "../users/user";
import { SessionRecordDto } from "../session-records/sessionRecord";

interface AttendanceDto extends Model {
  student?: UserDto;
  sessionRecord: SessionRecordDto;
  status: string;
}
