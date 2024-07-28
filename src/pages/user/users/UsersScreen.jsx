import HeaderPageWithBackButton from "@/components/HeaderPageWithBackButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import TableScrollable from "@/components/ui/TableScrollable";

import TableWithSearchFeature from "@/components/TableWithSearchFeature";
import ButtonWithIcon from "@/components/ui/ButtonWithIcon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import SearchInputButton from "@/components/SearchInputButton";
import { useNavigate } from "react-router-dom";

export default function UserListScreen() {
  const pageTitle = "User List";

  const users = [
    {
      fullname: "M. Syauqi Frizman",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/300",
    },
    {
      fullname: "John Doe",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/300",
    },
    {
      fullname: "Jane Doe",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/300",
    },
    {
      fullname: "John Doe",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/300",
    },
    {
      fullname: "Jane Doe",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/300",
    },
    {
      fullname: "John Doe",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/300",
    },
    {
      fullname: "Jane Doe",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/300",
    },
    {
      fullname: "John Doe",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/300",
    },
    {
      fullname: "Jane Doe",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/300",
    },
    {
      fullname: "John Doe",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/300",
    },
    {
      fullname: "Jane Doe",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/300",
    },
    {
      fullname: "John Doe",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/300",
    },
    {
      fullname: "Jane Doe",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/300",
    },
    {
      fullname: "John Doe",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/300",
    },
    {
      fullname: "Jane Doe",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/300",
    },
  ];

  const heightTable = "h-[48vh]";

  const navigate = useNavigate();
  function handleClick() {
    return () => {
      navigate("/admin/users/new");
    };
  }

  return (
    <>
      <HeaderPageWithBackButton pageTitle={pageTitle} />

      <div className="m-4 mb-20">
        <div className="">
          <Tabs defaultValue="student" className="">
            <div className=" ">
              <TabsList className="w-full">
                <TabsTrigger value="student" className="w-full">
                  Student
                </TabsTrigger>
                <TabsTrigger value="teacher" className="w-full">
                  Teacher
                </TabsTrigger>
                <TabsTrigger value="admin" className="w-full">
                  Admin
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="student">
              <TableWithSearchFeature
                dataTable={users}
                heightTable={heightTable}
              >
                <div className="mb-4">
                  <SearchInputButton placeholderText="type student name ..." />
                </div>
              </TableWithSearchFeature>
            </TabsContent>
            <TabsContent value="teacher">
              <TableWithSearchFeature
                dataTable={users}
                heightTable={heightTable}
              >
                <div className="mb-4">
                  <SearchInputButton placeholderText="type teacher name ..." />
                </div>
              </TableWithSearchFeature>
            </TabsContent>
            <TabsContent value="admin">
              <TableWithSearchFeature
                dataTable={users}
                heightTable={heightTable}
              >
                <div className="mb-4">
                  <SearchInputButton placeholderText="type admin name ..." />
                </div>
              </TableWithSearchFeature>
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <Button
            variant="smagaLMSGreen"
            className="w-full mt-2"
            onClick={handleClick()}
          >
            Add New User
          </Button>
        </div>
        <div></div>
      </div>
    </>
  );
}
