import Model from "@/services/model";

export interface ModuleDto extends Model {
  name: string;
  description: string;
  file: string | null;
}
