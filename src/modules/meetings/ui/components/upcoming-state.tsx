import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { BanIcon, VideoIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  meetingId: string;
  onCancelMeeting: () => void;
  isCancelling: boolean;
}

export const UpcomingState = ({
  meetingId,
  onCancelMeeting,
  isCancelling,
}: Props) => {
  return (
    <div className="flex flex-col gap-y-6 bg-white rounded-lg items-center justify-center">
      <EmptyState
        image="/upcoming.svg"
        title="Not started yet"
        description="Once you start this meeting, a summary will appear here"
      />

      <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-4">
        <Button
          variant="secondary"
          disabled={isCancelling}
          className="w-full lg:w-auto"
          onClick={onCancelMeeting}
        >
          <BanIcon />
          Cancel meeting
        </Button>

        <Button disabled={isCancelling} className="w-full lg:w-auto" asChild>
          <Link href={`/call${meetingId}`}>
            <VideoIcon />
            Start meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};
