import iconAttendance from "@/assets/icons/bottom-navigation/attendances.svg";
import iconAssignments from "@/assets/icons/bottom-navigation/assignments.svg";
import IconMenu from "../global/IconMenu";

export default function HomeStudentMenu() {
  return (
    <div className="mt-5 flex gap-2">
      <div className="w-1/2 bg-slate-300 rounded-xl p-2 flex items-center">
        <div className="mr-2">
          <IconMenu icon={iconAttendance} />
        </div>
        <p className="text-sm">
          Total: 0 kehadiran <b>terlewat</b>
        </p>
      </div>
      <div className="w-1/2 bg-slate-300 rounded-xl p-2 flex items-center">
        <div className="mr-2">
          <IconMenu icon={iconAssignments} />
        </div>
        <p className="text-sm">
          Total: 0 tugas <b>perlu dikerjakan</b>
        </p>
      </div>
    </div>
  );
}
