import CardClassEnrollmentItem from "@/components/class-enrollments/CardClassEnrollmentItem";
import { ClassEnrollmentDto } from "@/components/class-enrollments/classEnrollment";
import HeaderPageWithBackButton from "@/components/global/HeaderPageWithBackButton";
import SkeletonGenerator from "@/components/global/SkeletonGenerator";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useStateContext } from "@/contexts/ContextProvider";
import UserRolesEnum from "@/enums/UserRoleEnum";
import classEnrollmentService from "@/services/apis/class-enrollments/classEnrollmentService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function AttendancesPage() {
  const pageTitle = "Attendances";
  const heightTable = "h-[68vh]";

  const { currentUser } = useStateContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [classEnrollments, setClassEnrollments] = useState<
    ClassEnrollmentDto[]
  >([]);

  useEffect(() => {
    const getClassEnrollmentsData = async () => {
      if (!currentUser) {
        return;
      }

      let response;
      setLoading(true);
      if (currentUser.role === UserRolesEnum.ADMIN) {
        response = await classEnrollmentService.getClassEnrollments();
      } else if (currentUser.role === UserRolesEnum.TEACHER) {
        response = await classEnrollmentService.getClassEnrollments(
          currentUser.id
        );
      } else if (currentUser.role === UserRolesEnum.STUDENT) {
        response = await classEnrollmentService.getStudentClassEnrollments(
          currentUser.id
        );
      }
      setLoading(false);

      if (response.success && response.data) {
        setClassEnrollments(response.data);
        // setVirtualClassPeriods(response.data);
      } else {
        console.log("render: ", response.message);
        toast.error(response.message);
      }
    };
    getClassEnrollmentsData();
  }, [currentUser]);

  const isClassEnrollmentsEmpty = classEnrollments.length === 0;

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
                  Total Class Enrollments: {classEnrollments.length}
                </Label>
              </div>
              <div>
                {isClassEnrollmentsEmpty && (
                  <div className={`${heightTable}`}>
                    <Label className="text-sm text-gray-500">
                      Tidak ada Attendances untuk Class Enrollment yang tersedia
                    </Label>
                  </div>
                )}
              </div>
            </div>
            {!isClassEnrollmentsEmpty && (
              <ScrollArea
                className={`${heightTable} rounded-md overflow-y-auto`}
              >
                <div className="space-y-2">
                  {classEnrollments.map((classEnrollment, index) => (
                    <Link
                      to={`/class-enrollments/${classEnrollment.id}/attendances`}
                      key={index}
                      className="block"
                    >
                      <CardClassEnrollmentItem
                        key={index}
                        data={classEnrollment}
                      />
                    </Link>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        )}
      </div>
    </>
  );
}
