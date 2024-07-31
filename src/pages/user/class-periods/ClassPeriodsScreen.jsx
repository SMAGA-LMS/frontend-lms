import CardClassItem from "@/components/CardClassItem";
import HeaderPageWithBackButton from "@/components/HeaderPageWithBackButton";
import SearchInputButton from "@/components/SearchInputButton";
import BasicSkelenton from "@/components/ui/BasicSkelenton";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import axiosClient from "@/services/axiosClient";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ClassPeriodsScreen() {
  const pageTitle = "Class Period List";
  const heightTable = "h-[48vh]";

  const [loading, setLoading] = useState(false);
  const [classPeriods, setClassPeriods] = useState([]);

  const [academicTerms, setAcademicTerms] = useState([]);
  const [selectedAcademicTerm, setSelectedAcademicTerm] = useState(null);

  useEffect(() => {
    async function getAcademicTerms() {
      setLoading(true);
      try {
        const response = await axiosClient.get("/academic-terms");
        setAcademicTerms(response.data.data);
        setSelectedAcademicTerm(response.data.data[0].id);
      } catch (error) {
        toast.error("Failed to fetch academic terms");
      } finally {
        setLoading(false);
      }
    }
    getAcademicTerms();
  }, []);

  useEffect(() => {
    if (selectedAcademicTerm) {
      getClassPeriods(selectedAcademicTerm);
    }
    // getClassPeriods(selectedAcademicTerm);
  }, [selectedAcademicTerm]);

  async function getClassPeriods(academicTermId) {
    setLoading(true);
    try {
      const response = await axiosClient.get(
        `/class-periods?academic_term_id=${academicTermId}`
      );
      setClassPeriods(response.data.data);
      setVirtualClassPeriods(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch class periods");
    } finally {
      setLoading(false);
    }
  }

  const navigate = useNavigate();
  function handleClick() {
    return () => {
      navigate("/admin/class-periods/new");
    };
  }

  function generateSkeletonList() {
    return Array.from({ length: 3 }).map((_, index) => (
      <div className="border rounded-lg my-2" key={index}>
        <BasicSkelenton loading={loading} additionalClassName="m-2 p-3" />
      </div>
    ));
  }

  const [virtualClassPeriods, setVirtualClassPeriods] = useState([]);

  function handleSearchClassPeriod(value) {
    if (value === "") {
      setVirtualClassPeriods(classPeriods);
      return;
    }

    const filteredData = virtualClassPeriods.filter((virtualClassPeriod) =>
      virtualClassPeriod.class_period_name
        .toLowerCase()
        .includes(value.toLowerCase())
    );

    setVirtualClassPeriods(filteredData);
  }

  return (
    <>
      <HeaderPageWithBackButton pageTitle={pageTitle} />

      <div className="mx-4">
        <div className="">
          <Label>Tahun Ajaran</Label>
          {loading ? (
            <BasicSkelenton loading={loading} />
          ) : (
            <div>
              <Select
                value={selectedAcademicTerm}
                onValueChange={(value) => setSelectedAcademicTerm(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Tahun Ajaran" />
                </SelectTrigger>
                <SelectContent>
                  {academicTerms.map((term, index) => (
                    <SelectItem key={index} value={term.id}>
                      {term.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        <div>
          <div className="mb-2">
            <SearchInputButton
              placeholderText="Search Class Period"
              handleSearch={handleSearchClassPeriod}
            />
          </div>
          {loading ? (
            generateSkeletonList()
          ) : (
            <div>
              <Separator className="my-3" />
              <div className="my-3">
                <Label className="font-semibold">
                  Total Kelas: {virtualClassPeriods.length}
                </Label>
              </div>
              <ScrollArea className={`${heightTable} rounded-md`}>
                {virtualClassPeriods.map((classPeriod, index) => (
                  <Link
                    to={`/admin/class-periods/${classPeriod.class_period_code}`}
                    key={index}
                  >
                    <CardClassItem key={index} data={classPeriod} />
                  </Link>
                ))}
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </div>
          )}
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
