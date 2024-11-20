import { PaperclipIcon } from "lucide-react";
import { ModuleDto } from "./module";

interface CardModuleProps {
  data: ModuleDto;
}

export default function CardModule({ data }: CardModuleProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-2 m-4">
      <div className="flex items-center">
        <PaperclipIcon size="24" className="mr-2" />
        <h1 className="font-bold font-sans text-lg">{data.name}</h1>
      </div>
    </div>
  );
}
