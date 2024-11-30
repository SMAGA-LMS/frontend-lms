import HeaderPageWithBackButton from "@/components/global/HeaderPageWithBackButton";
import SkeletonGenerator from "@/components/global/SkeletonGenerator";
import { ModuleDto } from "@/components/modules/module";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import ErrorPage from "@/pages/ErrorPage";
import moduleService from "@/services/apis/modules/moduleService";
import { EyeIcon, PaperclipIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export default function ClassEnrollmentModuleDetailPage() {
  const pageTitle = "Modul";
  const { moduleID } = useParams<{ moduleID: string }>();

  const [loading, setLoading] = useState<boolean>(false);
  const [hasErrorPage, setHasErrorPage] = useState<boolean>(false);

  const [module, setModule] = useState<ModuleDto>();

  useEffect(() => {
    const getModuleDetail = async () => {
      if (!moduleID) {
        return;
      }

      setLoading(true);
      const response = await moduleService.getModuleDetailByID(
        Number(moduleID)
      );
      setLoading(false);

      if (response.success && response.data) {
        setModule(response.data);
      } else {
        toast.error(response.message);
        setHasErrorPage(true);
      }
    };
    getModuleDetail();
  }, [moduleID]);

  if (hasErrorPage) {
    return <ErrorPage />;
  }

  const handleViewFile = () => {
    if (module?.file) {
      window.open(module.file, "_blank");
    }
  };

  const getFileName = (filePath: string): string => {
    const fileName = filePath.split("/").pop() || "";
    return fileName.length > 25 ? `${fileName.substring(0, 25)}...` : fileName;
  };

  return (
    <>
      <HeaderPageWithBackButton pageTitle={pageTitle} />
      <div className="mx-4">
        {loading ? (
          <SkeletonGenerator />
        ) : (
          <div>
            <h1 className="font-semibold">{module?.name}</h1>
            <Separator className="my-3" />
            <Textarea
              value={module?.description}
              disabled
              className="text-black bg-secondary"
              style={{ opacity: 1 }}
            />
            {module?.file && (
              <div className="flex items-center justify-between space-x-2 mt-2">
                <PaperclipIcon size="24" />
                <span className="text-black flex-grow">
                  {getFileName(module?.file)}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  className="p-2"
                  onClick={handleViewFile}
                >
                  <EyeIcon size="24" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
