"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { NewMeetingDialog } from "./new-meeting-dialog";
import { useState } from "react";

export const MeetingsListHeader = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <>
      <NewMeetingDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <div className="px-4 py-4 md:px-8 flex flex-col gap-y-6">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Meetings</h5>
          <Button onClick={() => setDialogOpen(true)}>
            <PlusIcon />
            New Meeting
          </Button>
        </div>
        <div className="flex items-center gap-x-2 p-1">TODO: FILTER</div>
      </div>
    </>
  );
};
