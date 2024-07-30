import CardClassItem from "@/components/CardClassItem";
import HeaderPageWithBackButton from "@/components/HeaderPageWithBackButton";
import SearchInputButton from "@/components/SearchInputButton";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ClassPeriodsScreen() {
  const pageTitle = "Class Period List";
  const numberOfClasses = new Array(10).fill(0);
  const classPeriod = {
    name: "Class 1",
    class_period_code: "CP-001",
    students: [],
  };

  const heightTable = "h-[48vh]";

  const academicTerms = [
    {
      value: "2023/2024",
      label: "2023/2024",
    },
    {
      value: "2024/2025",
      label: "2025/2026",
    },
    {
      value: "2025/2026",
      label: "2025/2026",
    },
  ];

  const navigate = useNavigate();
  function handleClick() {
    return () => {
      navigate("/admin/class-periods/new");
    };
  }
  return (
    <>
      <HeaderPageWithBackButton pageTitle={pageTitle} />

      <div className="mx-4">
        <div className="">
          <Label>Tahun Ajaran</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Tahun Ajaran" />
            </SelectTrigger>
            <SelectContent>
              {academicTerms.map((term, index) => (
                <SelectItem key={index} value={term.value}>
                  {term.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <div className="mb-2">
            <SearchInputButton placeholderText="Search class" />
          </div>
          <ScrollArea className={`${heightTable} rounded-md`}>
            {numberOfClasses.map((_, index) => (
              <Link to="/admin/class-periods/detail" key={index}>
                <CardClassItem key={index} classPeriod={classPeriod} />
              </Link>
            ))}
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>
        <div>
          <Button
            variant="smagaLMSGreen"
            className="w-full mt-2"
            onClick={handleClick()}
          >
            Add New Class
          </Button>
        </div>
      </div>
    </>
  );
}
