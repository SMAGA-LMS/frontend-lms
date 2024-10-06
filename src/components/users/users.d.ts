import UserRolesEnum from "@/enums/UserRoleEnum";
import Model from "@/services/model";

export interface UserDto extends Model {
  fullName: string;
  role: UserRolesEnum;
  avatar?: string;
  userCode?: string;
  profilePicture?: string;
}
