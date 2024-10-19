import CardCourseItem from "@/components/courses/CardCourseItem";
import { CourseDto } from "@/components/courses/courses";
import HeaderPageWithBackButton from "@/components/global/HeaderPageWithBackButton";
import SkeletonGenerator from "@/components/global/SkeletonGenerator";
import { Button } from "@/components/ui/button";
import { ScrollBar } from "@/components/ui/scroll-area";
import courseService from "@/services/apis/courses/courseService";
import { Label } from "@radix-ui/react-label";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function CoursesPage() {
  const pageTitle = "Courses List";
  const heightTable = "h-[40vh]";

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [courses, setCourses] = useState<CourseDto[]>([]);

  // const [classPeriods, setClassPeriods] = useState<ClassPeriodDto[]>([]);
  // const [academicTerms, setAcademicTerms] = useState<AcademicTermDto[]>([]);
  // const [selectedAcademicTermID, setSelectedAcademicTermID] =
  //   useState<string>("");

  useEffect(() => {
    getCoursesData();
  }, []);

  const getCoursesData = async () => {
    setLoading(true);
    const response = await courseService.getCourses();
    setLoading(false);

    if (response.success && response.data) {
      setCourses(response.data);
      // setVirtualClassPeriods(response.data);
    } else {
      toast.error(response.message);
    }
  };

  const navigateToAddNewCourse = () => {
    navigate("/courses/create");
    return;
  };

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
                  Total Mata Pelajaran: {courses.length}
                </Label>
              </div>
              <div>
                {courses.length === 0 && (
                  <Label className="text-sm text-gray-500">
                    Tidak ada mata pelajaran yang tersedia
                  </Label>
                )}
              </div>
            </div>
            <ScrollArea className={`${heightTable} rounded-md`}>
              {courses.map((courses, index) => (
                <Link to={`/courses/${courses.id}`} key={index}>
                  <CardCourseItem key={index} data={courses} />
                </Link>
              ))}
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </div>
        )}
        <div>
          <Button
            variant="smagaLMSGreen"
            className="w-full mt-2"
            onClick={navigateToAddNewCourse}
          >
            Add New Course
          </Button>
        </div>
      </div>
    </>
  );
}
