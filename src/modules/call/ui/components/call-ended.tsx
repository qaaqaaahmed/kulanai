import { Button } from "@/components/ui/button";
import Link from "next/link";

export const CallEnded = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-radial from-sidebar-accent to-sidebar h-full">
      <div className="px-8 py-4 flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center justify-center bg-background p-10 rounded-lg shadow-sm gap-y-6">
          <div className="flex flex-col gap-y-2 text-center">
            <h6 className="text-lg font-medium">Call has ended</h6>
            <p className="text-sm">Summary will appear soon</p>
          </div>

          <Button asChild>
            <Link href={`/meetings`}>Back to meetings</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
