import { Card } from "../ui/card";

interface CardSessionSummaryProps {
  totalDoneSession: number;
  totalPresent?: number;
}

export default function CardSessionSummary({
  totalDoneSession,
  totalPresent,
}: CardSessionSummaryProps) {
  return (
    <Card className="bg-smagaLMS-green text-white p-2 rounded-xl shadow-xl w-full max-w-md">
      <div className="flex justify-center items-center space-x-8">
        {totalPresent !== undefined && (
          <>
            <div className="text-center">
              <h2 className="text-sm font-medium">Total Hadir</h2>
              <p className="text-xl font-extrabold">{totalPresent}</p>
            </div>
            <div className="w-px h-10 bg-white/30" />
          </>
        )}
        <div className="text-center">
          <h2 className="text-sm font-medium">Total Sesi Selesai</h2>
          <p className="text-xl font-extrabold">{totalDoneSession}</p>
        </div>
      </div>
    </Card>
  );
}
