import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "./ui/badge";

export default function ProfileHeaderUser({ user }) {
  return (
    <>
      <div className="flex w-full">
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src={user.avatar} />
            <AvatarFallback>
              {user.full_name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <h2 className="text-sm font-sans font-bold text-black">
              {user.full_name}
            </h2>
            <Badge variant="outline">{user.role.name}</Badge>
          </div>
        </div>
      </div>
    </>
  );
}
