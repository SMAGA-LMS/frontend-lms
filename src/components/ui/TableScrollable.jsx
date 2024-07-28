import { MoreHorizontalIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { ScrollArea, ScrollBar } from "./scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import ButtonWithIcon from "./ButtonWithIcon";
import { Badge } from "./badge";

export default function TableScrollable({ data, heightTable }) {
  return (
    <>
      <div className="">
        <ScrollArea className={`${heightTable} rounded-md border`}>
          <Table className="">
            <TableHeader className="bg-secondary">
              <TableRow>
                <TableHead className="px-4 w-4">No</TableHead>
                <TableHead className="w-4">Profile</TableHead>
                <TableHead className="w-60">Name</TableHead>
                <TableHead className="pr-4 text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
              {data.map((item, index) => (
                <TableRow key={item}>
                  <TableCell className="px-4 font-medium">
                    {index + 1}
                  </TableCell>
                  <TableCell className="pr-4">
                    <Avatar>
                      <AvatarImage src={item.profilePicture} />
                      <AvatarFallback>
                        {item.fullname.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="">
                    <div className="flex w-full">
                      <div className="flex items-center">
                        <div className="">
                          <h2 className="text-sm font-sans font-bold text-black break-all">
                            {item.fullname}
                          </h2>
                          <Badge variant="default">{item.userCode}</Badge>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="pr-4 text-right">
                    <div>
                      <ButtonWithIcon size="icon" variant="ghost">
                        <MoreHorizontalIcon size={16} />
                      </ButtonWithIcon>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    </>
  );
}
