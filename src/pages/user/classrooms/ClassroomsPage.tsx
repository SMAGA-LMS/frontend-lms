import CardClassroomItem from "@/components/classrooms/CardClassroomItem";
import { ClassroomDto } from "@/components/classrooms/classroom";
import HeaderPageWithBackButton from "@/components/global/HeaderPageWithBackButton";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import classroomService from "@/services/apis/classrooms/classroomService";
import SkeletonGenerator from "@/components/global/SkeletonGenerator";

export default function ClassroomsPage() {
  const pageTitle = "Classroom List";
  const heightTable = "h-[68vh]";

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [classrooms, setClassrooms] = useState<ClassroomDto[]>([]);

  // const [classPeriods, setClassPeriods] = useState<ClassPeriodDto[]>([]);
  // const [academicTerms, setAcademicTerms] = useState<AcademicTermDto[]>([]);
  // const [selectedAcademicTermID, setSelectedAcademicTermID] =
  //   useState<string>("");

  useEffect(() => {
    getClassroomsData();
  }, []);

  const getClassroomsData = async () => {
    setLoading(true);
    const response = await classroomService.getClassrooms();
    setLoading(false);

    if (response.success && response.data) {
      setClassrooms(response.data);
      // setVirtualClassPeriods(response.data);
    } else {
      toast.error(response.message);
    }
  };

  const navigateToAddNewClassroom = () => {
    navigate("/classrooms/create");
    return;
  };

  const isClassroomEmpty = classrooms.length === 0;

  // useEffect(() => {
  //   async function getAcademicTerms() {
  //     setLoading(true);
  //     try {
  //       const response = await axiosClient.get("/academic-terms");
  //       setAcademicTerms(response.data.data);
  //       setSelectedAcademicTermID(response.data.data[0].id);
  //     } catch (error) {
  //       toast.error("Failed to fetch academic terms");
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   getAcademicTerms();
  // }, []);

  // useEffect(() => {
  //   if (selectedAcademicTermID) {
  //     getClassPeriods(selectedAcademicTermID);
  //   }
  //   // getClassPeriods(selectedAcademicTerm);
  // }, [setSelectedAcademicTermID]);

  // async function getClassPeriods(academicTermId: string) {
  //   setLoading(true);
  //   try {
  //     const response = await axiosClient.get(
  //       `/class-periods?academic_term_id=${academicTermId}`
  //     );
  //     setClassPeriods(response.data.data);
  //     setVirtualClassPeriods(response.data.data);
  //   } catch (error) {
  //     toast.error("Failed to fetch class periods");
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // const [virtualClassPeriods, setVirtualClassPeriods] = useState<
  //   ClassPeriodDto[]
  // >([]);

  // function handleSearchClassPeriod(value: string) {
  //   if (value === "") {
  //     setVirtualClassPeriods(classPeriods);
  //     return;
  //   }

  //   const filteredData = virtualClassPeriods.filter((virtualClassPeriod) =>
  //     virtualClassPeriod.classPeriodName
  //       .toLowerCase()
  //       .includes(value.toLowerCase())
  //   );

  //   setVirtualClassPeriods(filteredData);
  // }

  // return (
  //   <>
  //     <HeaderPageWithBackButton pageTitle={pageTitle} />

  //     <div className="mx-4">
  //       <div className="">
  //         <Label>Tahun Ajaran</Label>
  //         {loading ? (
  //           <BasicSkelenton
  //           // loading={loading}
  //           />
  //         ) : (
  //           <div>
  //             <Select
  //               value={selectedAcademicTermID}
  //               onValueChange={(value) => setSelectedAcademicTermID(value)}
  //             >
  //               <SelectTrigger className="w-full">
  //                 <SelectValue placeholder="Pilih Tahun Ajaran" />
  //               </SelectTrigger>
  //               <SelectContent>
  //                 {academicTerms.map((term, index) => (
  //                   <SelectItem key={index} value={term.id}>
  //                     {term.name}
  //                   </SelectItem>
  //                 ))}
  //               </SelectContent>
  //             </Select>
  //           </div>
  //         )}
  //       </div>
  //       <div>
  //         <div className="mb-2">
  //           <SearchInputButton
  //             placeholderText="Search Class Period"
  //             handleSearch={handleSearchClassPeriod}
  //           />
  //         </div>
  //         {loading ? (
  //           generateSkeletonList()
  //         ) : (
  //           <div>
  //             <Separator className="my-3" />
  //             <div className="my-3">
  //               <Label className="font-semibold">
  //                 Total Kelas: {virtualClassPeriods.length}
  //               </Label>
  //             </div>
  //             <ScrollArea className={`${heightTable} rounded-md`}>
  //               {virtualClassPeriods.map((classPeriod, index) => (
  //                 <Link
  //                   to={`/admin/class-periods/${classPeriod.classPeriodCode}`}
  //                   key={index}
  //                 >
  //                   <CardClassItem key={index} data={classPeriod} />
  //                 </Link>
  //               ))}
  //               <ScrollBar orientation="vertical" />
  //             </ScrollArea>
  //           </div>
  //         )}
  //       </div>
  //       <div>
  //         <Button
  //           variant="smagaLMSGreen"
  //           className="w-full mt-2"
  //           onClick={navigateToAddNewClassroom}
  //         >
  //           Add New Class
  //         </Button>
  //       </div>
  //     </div>
  //   </>
  // );

  return (
    <>
      <HeaderPageWithBackButton pageTitle={pageTitle} />
      <div className="mx-4">
        {loading ? (
          <div>
            <SkeletonGenerator />
          </div>
        ) : (
          <div>
            {/* <Separator className="my-3" /> */}
            <div className="my-3">
              <div>
                <Label className="font-semibold">
                  Total Kelas: {classrooms.length}
                </Label>
              </div>
              <div>
                {isClassroomEmpty && (
                  <div className={`${heightTable}`}>
                    <Label className="text-sm text-gray-500">
                      Tidak ada kelas yang tersedia
                    </Label>
                  </div>
                )}
              </div>
            </div>
            {!isClassroomEmpty && (
              <ScrollArea
                className={`${heightTable} rounded-md overflow-y-auto`}
              >
                {classrooms.map((classrooms, index) => (
                  <Link
                    to={`/classrooms/${classrooms.id}`}
                    key={index}
                    className="block"
                  >
                    <CardClassroomItem key={index} data={classrooms} />
                  </Link>
                ))}
              </ScrollArea>
            )}
          </div>
        )}
        <div className="bottom-16 left-0 w-full bg-white">
          <Button
            variant="smagaLMSGreen"
            className="w-full mt-2"
            onClick={navigateToAddNewClassroom}
          >
            Add New Class
          </Button>
        </div>
      </div>
    </>
  );
}
