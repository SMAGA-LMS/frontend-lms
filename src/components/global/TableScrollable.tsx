import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ReactNode, useEffect, useState } from "react";
import { UserDto } from "@/components/users/users";

interface TableScrollableProps {
  data: UserDto[];
  heightTable?: string;
  handleSelectedItem?: (item: any) => void;
  resetSelected?: boolean;
  children?: ReactNode;
}

export default function TableScrollable({
  data,
  heightTable,
  handleSelectedItem,
  resetSelected,
  children,
}: TableScrollableProps) {
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    if (resetSelected === true) {
      setSelected("");
    }
  }, [resetSelected]);

  // useEffect(() => {
  //   console.log("selected id test: ", selected);
  // }, [selected]);

  function handleSelectedRow(id: string) {
    if (handleSelectedItem) {
      handleSelectedItem(id);
    }
    console.log("selected id: ", id, "selected ", selected);
  }

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
              {data.map((user, index) => (
                <TableRow
                  key={user.id}
                  className={selected === user.id ? "bg-blue-300" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelected(user.id);
                    handleSelectedRow(user.id);
                    console.log("selected id: ", selected);
                  }}
                >
                  <TableCell className="px-4 font-medium">
                    {index + 1}
                  </TableCell>
                  <TableCell className="pr-4">
                    <Avatar>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>
                        {user.fullName.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="">
                    <div className="flex w-full">
                      <div className="flex items-center">
                        <div className="">
                          <h2 className="text-sm font-sans font-bold text-black break-all">
                            {user.fullName}
                          </h2>
                          <Badge variant="default">{user.userCode}</Badge>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="pr-4 text-right">
                    <div>
                      {/* <ButtonWithIcon
                        size="icon"
                        variant="ghost"
                        type="button"
                        onClickAction={(e) => handleSelectItem(e, user.id)}
                      >
                        {children}
                      </ButtonWithIcon> */}
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
