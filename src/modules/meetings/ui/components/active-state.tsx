import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { BanIcon, VideoIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  meetingId: string;
}

export const ActiveState = ({ meetingId }: Props) => {
  return (
    <div className="flex flex-col gap-y-6 bg-white rounded-lg items-center justify-center">
      <EmptyState
        image="/upcoming.svg"
        title="Meeting is active"
        description="Meeting will end once all the participants have left"
      />

      <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-4">
        <Button className="w-full lg:w-auto" asChild>
          <Link href={`/call${meetingId}`}>
            <VideoIcon />
            Join meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};
