import Model from "@/services/model";
import { UserDto } from "../users/user";

export interface AnnouncementDto extends Model {
  title: string;
  description: string;
  file?: string;
  author: UserDto;
}
