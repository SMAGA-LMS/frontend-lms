import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserDto } from "./user";

interface ProfileHeaderUserProps {
  user: UserDto;
}

export default function ProfileHeaderUser({ user }: ProfileHeaderUserProps) {
  return (
    <>
      <div className="flex w-full">
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src={user.avatar} />
            <AvatarFallback>
              {user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <h2 className="text-sm font-sans font-bold text-black">
              {user.name}
            </h2>
            <Badge variant="outline">{user.role}</Badge>
          </div>
        </div>
      </div>
    </>
  );
}
