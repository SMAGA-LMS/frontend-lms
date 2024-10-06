import { Skeleton } from "@/components/ui/skeleton";

interface BasicSkeletonProps {
  additionalClassName?: string;
}

export default function BasicSkelenton({
  additionalClassName,
}: BasicSkeletonProps) {
  return (
    <>
      <div
        className={`flex items-center space-x-4 my-2 ${additionalClassName}`}
      >
        <div className="space-y-2 w-full">
          <Skeleton className="h-4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </>
  );
}
