import Model from "@/services/model";
import { AnnouncementDto } from "../announcements/announcement";

export interface AnnouncementReceiverDto extends Model {
  announcement: AnnouncementDto;
  receiverRole: string;
}
