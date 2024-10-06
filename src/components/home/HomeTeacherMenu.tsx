import IconMenu from "../global/IconMenu";
import iconAssignments from "@/assets/icons/bottom-navigation/assignments.svg";

export default function HomeTeacherMenu() {
  return (
    <div className="mt-5 flex gap-2">
      <div className="w-1/2 bg-slate-300 rounded-xl p-2 flex items-center">
        <div className="mr-2">
          <IconMenu icon={iconAssignments} />
        </div>
        <p className="text-sm">
          Total: 0 tugas <b>perlu dinilai!</b>
        </p>
      </div>
    </div>
  );
}
