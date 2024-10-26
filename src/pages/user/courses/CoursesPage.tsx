import CardCourseItem from "@/components/courses/CardCourseItem";
import { CourseDto } from "@/components/courses/courses";
import HeaderPageWithBackButton from "@/components/global/HeaderPageWithBackButton";
import SkeletonGenerator from "@/components/global/SkeletonGenerator";
import { Button } from "@/components/ui/button";
import courseService from "@/services/apis/courses/courseService";
import { Label } from "@radix-ui/react-label";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function CoursesPage() {
  const pageTitle = "Courses List";
  const heightTable = "h-[68vh]";

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [courses, setCourses] = useState<CourseDto[]>([]);

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

  const isCourseEmpty = courses.length === 0;

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
                {isCourseEmpty && (
                  <Label className="text-sm text-gray-500">
                    Tidak ada mata pelajaran yang tersedia
                  </Label>
                )}
              </div>
            </div>
            {!isCourseEmpty && (
              <ScrollArea
                className={`${heightTable} rounded-md overflow-y-auto`}
              >
                <div className="space-y-2">
                  {courses.map((course, index) => (
                    <Link
                      to={`/courses/${course.id}`}
                      key={index}
                      className="block"
                    >
                      <CardCourseItem key={index} data={course} />
                    </Link>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        )}
        <div className="w-full my-2">
          <Button
            variant="smagaLMSGreen"
            className="w-full"
            onClick={navigateToAddNewCourse}
          >
            Add New Course
          </Button>
        </div>
      </div>
    </>
  );
}
