import { ClassEnrollmentModuleDto } from "@/components/class-enrollment-modules/classEnrollmentModule";
import { ClassEnrollmentDto } from "@/components/class-enrollments/classEnrollment";
import BasicSkelenton from "@/components/global/BasicSkelenton";
import HeaderPageWithBackButton from "@/components/global/HeaderPageWithBackButton";
import SkeletonGenerator from "@/components/global/SkeletonGenerator";
import CardModule from "@/components/modules/CardModule";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import ErrorPage from "@/pages/ErrorPage";
import classEnrollmentModuleService from "@/services/apis/class-enrollment-modules/classEnrollmentModuleService";
import classEnrollmentService from "@/services/apis/class-enrollments/classEnrollmentService";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function ClassEnrollmentModulesPage() {
  const pageTitle = "List Modules";
  const heightTable = "h-[60vh]";

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [hasErrorPage, setHasErrorPage] = useState<boolean>(false);

  const [classEnrollment, setClassEnrollment] = useState<ClassEnrollmentDto>();
  const [classEnrollmentModules, setClassEnrollmentModules] = useState<
    ClassEnrollmentModuleDto[]
  >([]);

  useEffect(() => {
    const getClassEnrollmentDetail = async () => {
      if (!id) {
        return;
      }

      setLoading(true);
      const response = await classEnrollmentService.getClassEnrollmentByID(
        Number(id)
      );
      setLoading(false);

      if (response.success && response.data) {
        setClassEnrollment(response.data);
      } else {
        toast.error(response.message);
        setHasErrorPage(true);
      }
    };
    getClassEnrollmentDetail();

    const getClassEnrollmentModulesData = async () => {
      setLoading(true);
      const response =
        await classEnrollmentModuleService.getClassEnrollmentModules(
          Number(id)
        );
      setLoading(false);

      if (response.success && response.data) {
        setClassEnrollmentModules(response.data);
      } else {
        toast.error(response.message);
      }
    };
    getClassEnrollmentModulesData();
  }, [id]);

  if (hasErrorPage) {
    return <ErrorPage />;
  }

  const navigateToAddNewModule = () => {
    navigate(`/class-enrollments/${id}/modules/create`);
    return;
  };

  const isClassEnrollmentModulesEmpty = classEnrollmentModules.length === 0;

  return (
    <>
      <HeaderPageWithBackButton pageTitle={pageTitle} />
      <div className="mt-4 pb-24 bg-smagaLMS-gradient-linear">
        {loading ? (
          <BasicSkelenton additionalClassName="mx-4" />
        ) : (
          <div className="mx-4 mt-4">
            <h1 className="font-bold font-sans text-lg">
              {classEnrollment?.course.name} | {classEnrollment?.course?.grade}
            </h1>
            <Badge variant="outline">{classEnrollment?.classroom.name}</Badge>
          </div>
        )}
      </div>
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
                  Total Module: {classEnrollmentModules.length}
                </Label>
              </div>
              <div>
                {isClassEnrollmentModulesEmpty && (
                  <div className={`${heightTable}`}>
                    <Label className="text-sm text-gray-500">
                      Tidak ada module yang tersedia
                    </Label>
                  </div>
                )}
              </div>
            </div>
            {!isClassEnrollmentModulesEmpty && (
              <ScrollArea
                className={`${heightTable} rounded-md overflow-y-auto`}
              >
                <div className="space-y-2">
                  {classEnrollmentModules.map(
                    (classEnrollmentModule, index) => (
                      <Link
                        to={`/class-enrollments/${id}/modules/${classEnrollmentModule.module.id}`}
                        key={index}
                        className="block"
                      >
                        <CardModule
                          key={index}
                          data={classEnrollmentModule.module}
                        />
                      </Link>
                    )
                  )}
                </div>
              </ScrollArea>
            )}
          </div>
        )}
        <div className="bottom-16 left-0 w-full bg-white">
          <Button
            variant="smagaLMSGreen"
            className="w-full"
            type="submit"
            onClick={navigateToAddNewModule}
          >
            Tambah Modul
          </Button>
        </div>
      </div>
    </>
  );
}
