import CardCourseItem from "@/components/courses/CardCourseItem";
import { CourseDto } from "@/components/courses/courses";
import HeaderPageWithBackButton from "@/components/global/HeaderPageWithBackButton";
import SkeletonGenerator from "@/components/global/SkeletonGenerator";
import { Button } from "@/components/ui/button";
import { useStateContext } from "@/contexts/ContextProvider";
import UserRolesEnum from "@/enums/UserRoleEnum";
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
  const { currentUser } = useStateContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [courses, setCourses] = useState<CourseDto[]>([]);

  useEffect(() => {
    const getCoursesData = async () => {
      if (!currentUser) {
        return;
      }

      let response;
      setLoading(true);
      if (currentUser.role === UserRolesEnum.ADMIN) {
        response = await courseService.getCourses();
      } else if (currentUser.role === UserRolesEnum.TEACHER) {
        response = await courseService.getCourses(currentUser.id);
      }
      setLoading(false);

      if (response.success && response.data) {
        setCourses(response.data);
        // setVirtualClassPeriods(response.data);
      } else {
        toast.error(response.message);
      }
    };
    getCoursesData();
  }, [currentUser]);

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
                  <div className={`${heightTable}`}>
                    <Label className="text-sm text-gray-500">
                      Tidak ada mata pelajaran yang tersedia
                    </Label>
                  </div>
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
        {currentUser && currentUser.role === UserRolesEnum.ADMIN && (
          <div className="bottom-16 left-0 w-full bg-white">
            <Button
              variant="smagaLMSGreen"
              className="w-full mt-2"
              onClick={navigateToAddNewCourse}
            >
              Add New Course
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
