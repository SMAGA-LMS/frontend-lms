import SkeletonUserCard from "@/components/users/SkeletonUserCard";

export default function SkeletonGenerator() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <SkeletonUserCard key={index} />
      ))}
    </>
  );
}
