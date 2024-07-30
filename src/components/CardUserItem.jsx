import { MoreHorizontalIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import ButtonWithIcon from "./ui/ButtonWithIcon";

export default function CardUserItem({
  user,
  additionalClassName,
  textFullnameColor,
  defaultBadgeStyle,
  children,
}) {
  return (
    <>
      <div
        className={`flex w-full rounded-xl p-2 justify-between items-center ${additionalClassName}`}
      >
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src={user.profilePicture} />
            <AvatarFallback>
              {user.fullname.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <h2 className={`text-sm font-sans font-bold ${textFullnameColor}`}>
              {user.fullname}
            </h2>
            <Badge variant={defaultBadgeStyle}>{user.userCode}</Badge>
          </div>
        </div>
        <div className="text-right">{children}</div>
      </div>
    </>
  );
}
