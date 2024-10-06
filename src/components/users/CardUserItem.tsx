import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserDto } from "./users";
import { ReactNode } from "react";
import UserRolesEnum from "@/enums/UserRoleEnum";

interface CardUserItemProps {
  user?: UserDto;
  additionalClassName?: string;
  textFullnameColor?: string;
  defaultBadgeStyle?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | undefined;
  children?: ReactNode;
}

export default function CardUserItem({
  user,
  additionalClassName,
  textFullnameColor,
  defaultBadgeStyle,
  children,
}: CardUserItemProps) {
  const defaultUser: UserDto = {
    fullName: "Dummy Teacher",
    userCode: "DT",
    role: UserRolesEnum.TEACHER,
    id: "12345678",
    createdAt: new Date(),
  };

  const displayUser = user || defaultUser;
  return (
    <>
      <div
        className={`flex w-full rounded-xl p-2 justify-between items-center ${additionalClassName}`}
      >
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src={displayUser.avatar} />
            <AvatarFallback>
              {displayUser.fullName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <h2 className={`text-sm font-sans font-bold ${textFullnameColor}`}>
              {displayUser.fullName}
            </h2>
            <Badge variant={defaultBadgeStyle}>{displayUser.userCode}</Badge>
          </div>
        </div>

        <div className="text-right">{children}</div>
      </div>
    </>
  );
}
