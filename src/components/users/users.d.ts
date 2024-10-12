import UserRolesEnum from "@/enums/UserRoleEnum";
import Model from "@/services/model";

export interface UserDto extends Model {
  name: string;
  // TODO: add username column to backend (database)
  // reason: to make login process easier, instead of using id (integer)
  username: string;
  role: UserRolesEnum;
  avatar?: string;
  // userCode?: string;
}
