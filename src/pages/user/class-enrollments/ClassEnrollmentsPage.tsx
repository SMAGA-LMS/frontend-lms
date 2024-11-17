import CardClassEnrollmentItem from "@/components/class-enrollments/CardClassEnrollmentItem";
import { ClassEnrollmentDto } from "@/components/class-enrollments/classEnrollment";
import HeaderPageWithBackButton from "@/components/global/HeaderPageWithBackButton";
import SkeletonGenerator from "@/components/global/SkeletonGenerator";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import classEnrollmentService from "@/services/apis/class-enrollments/classEnrollmentService";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ClassEnrollmentsPage() {
  const pageTitle = "Class Enrollment List";
  const heightTable = "h-[68vh]";

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [classEnrollments, setClassEnrollments] = useState<
    ClassEnrollmentDto[]
  >([]);

  useEffect(() => {
    getClassEnrollmentsData();
  }, []);

  const getClassEnrollmentsData = async () => {
    setLoading(true);
    const response = await classEnrollmentService.getClassEnrollments();
    setLoading(false);

    if (response.success && response.data) {
      setClassEnrollments(response.data);
      // setVirtualClassPeriods(response.data);
    } else {
      console.log("render: ", response.message);
      toast.error(response.message);
    }
  };

  const navigateToAddNewClassEnrollment = () => {
    navigate("/class-enrollment/create");
    return;
  };

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
                      Tidak ada Class Enrollment yang tersedia
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
                      to={`/class-enrollments/${classEnrollment.id}`}
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
        <div className="bottom-16 left-0 w-full bg-white">
          <Button
            variant="smagaLMSGreen"
            className="w-full mt-2"
            onClick={navigateToAddNewClassEnrollment}
          >
            Add New Class Enrollment
          </Button>
        </div>
      </div>
    </>
  );
}
