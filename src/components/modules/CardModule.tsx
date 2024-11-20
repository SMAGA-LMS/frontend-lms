import { PaperclipIcon } from "lucide-react";
import { ModuleDto } from "./module";

interface CardModuleProps {
  data: ModuleDto;
}

export default function CardModule({ data }: CardModuleProps) {
  const getFileName = (filePath: string): string => {
    const fileName = filePath.split("/").pop() || "";
    return fileName.length > 40 ? `${fileName.substring(0, 40)}...` : fileName;
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-2 m-2">
      <div className="flex items-center">
        <PaperclipIcon size="24" className="mr-2" />
        <h1 className="font-bold font-sans text-sm">
          {getFileName(data.name)}
        </h1>
      </div>
    </div>
  );
}
