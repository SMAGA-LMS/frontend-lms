import Model from "@/services/model";

export interface AnnouncementDto extends Model {
  title: string;
  description: string;
  file?: string;
  auhtorID: number;
}
