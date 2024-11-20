import { CourseDto } from "@/components/courses/courses";
import BasicSkelenton from "@/components/global/BasicSkelenton";
import HeaderPageWithBackButton from "@/components/global/HeaderPageWithBackButton";
import SkeletonGenerator from "@/components/global/SkeletonGenerator";
import CardModule from "@/components/modules/CardModule";
import { ModuleDto } from "@/components/modules/module";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import ErrorPage from "@/pages/ErrorPage";
import courseService from "@/services/apis/courses/courseService";
import moduleService from "@/services/apis/modules/moduleService";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function ModulesPage() {
  const pageTitle = "List Modules";
  const heightTable = "h-[60vh]";

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [hasErrorPage, setHasErrorPage] = useState<boolean>(false);

  const [course, setCourse] = useState<CourseDto>();
  const [modules, setModules] = useState<ModuleDto[]>([]);

  useEffect(() => {
    const getCourseDetail = async () => {
      if (!id) {
        return;
      }

      setLoading(true);
      const response = await courseService.getCourseDetailByID(id);
      setLoading(false);

      if (response.success && response.data) {
        setCourse(response.data);
      } else {
        toast.error(response.message);
        setHasErrorPage(true);
      }
    };
    getCourseDetail();

    const getModulesData = async () => {
      setLoading(true);
      const response = await moduleService.getCourseModules(Number(id));
      setLoading(false);

      if (response.success && response.data) {
        setModules(response.data);
      } else {
        toast.error(response.message);
      }
    };
    getModulesData();
  }, [id]);

  if (hasErrorPage) {
    return <ErrorPage />;
  }

  const navigateToAddNewModule = () => {
    navigate(`/courses/${id}/modules/create`);
    return;
  };

  const isCourseModuleEmpty = modules.length === 0;

  return (
    <>
      <HeaderPageWithBackButton pageTitle={pageTitle} />
      <div className="mt-4 pb-24 bg-smagaLMS-gradient-linear">
        {loading ? (
          <BasicSkelenton additionalClassName="mx-4" />
        ) : (
          <div className="mx-4 mt-4">
            <h1 className="font-bold font-sans text-lg">
              {course?.name} | {course?.grade}
            </h1>
            <Badge variant="default">{course?.id}</Badge>
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
                  Total Module: {modules.length}
                </Label>
              </div>
              <div>
                {isCourseModuleEmpty && (
                  <div className={`${heightTable}`}>
                    <Label className="text-sm text-gray-500">
                      Tidak ada mata pelajaran yang tersedia
                    </Label>
                  </div>
                )}
              </div>
            </div>
            {!isCourseModuleEmpty && (
              <ScrollArea
                className={`${heightTable} rounded-md overflow-y-auto`}
              >
                <div className="space-y-2">
                  {modules.map((module, index) => (
                    <Link
                      to={`/courses/${id}/modules/${module.id}`}
                      key={index}
                      className="block"
                    >
                      <CardModule key={index} data={module} />
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
