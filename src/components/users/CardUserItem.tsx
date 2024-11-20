import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserDto } from "./users";
import { ReactNode } from "react";
import UserRolesEnum from "@/enums/UserRoleEnum";
import TeacherTypeEnum from "@/enums/TeacherTypeEnum";

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
  teacherType?: TeacherTypeEnum;
  children?: ReactNode;
}

export default function CardUserItem({
  user,
  additionalClassName,
  textFullnameColor,
  defaultBadgeStyle,
  teacherType,
  children,
}: CardUserItemProps) {
  const defaultUser: UserDto = {
    id: 1234,
    name: "Dummy Teacher",
    username: "dummyteacher",
    role: UserRolesEnum.TEACHER,
  };

  const defaultTeacherType = TeacherTypeEnum.TEACHER;
  const displayTeacherType = teacherType || defaultTeacherType;

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
              {displayUser.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <h2
              className={`text-sm font-sans font-bold ${textFullnameColor} flex items-center`}
            >
              {displayUser.name}
            </h2>
            <Badge className="mr-2" variant={defaultBadgeStyle}>
              {displayUser.id}
            </Badge>{" "}
            |
            <Badge className="ml-2" variant="default">
              {displayTeacherType}
            </Badge>
          </div>
        </div>

        <div className="text-right">{children}</div>
      </div>
    </>
  );
}
