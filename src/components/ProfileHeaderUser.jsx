import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "./ui/badge";

export default function ProfileHeaderUser({ user }) {
  return (
    <>
      <div className="flex w-full">
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src={user.profilePicture} />
            <AvatarFallback>
              {user.fullname.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <h2 className="text-sm font-sans font-bold text-black">
              {user.fullname}
            </h2>
            <Badge variant="outline">{user.role}</Badge>
          </div>
        </div>
      </div>
    </>
  );
}
