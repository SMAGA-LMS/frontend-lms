import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

export default function CardUserItem({
  user,
  additionalClassName,
  textFullnameColor,
  defaultBadgeStyle,
  children,
}) {
  const defaultUser = {
    full_name: "Dummy Teacher",
    user_code: "DT",
    avatar: null,
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
              {displayUser.full_name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <h2 className={`text-sm font-sans font-bold ${textFullnameColor}`}>
              {displayUser.full_name}
            </h2>
            <Badge variant={defaultBadgeStyle}>{displayUser.user_code}</Badge>
          </div>
        </div>

        <div className="text-right">{children}</div>
      </div>
    </>
  );
}
