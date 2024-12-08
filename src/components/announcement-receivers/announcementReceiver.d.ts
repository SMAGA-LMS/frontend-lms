import Model from "@/services/model";

export interface AnnouncementReceiverDto extends Model {
  announcementID: number;
  receiverRole: string;
}
