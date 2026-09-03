"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon, XIcon } from "lucide-react";
import { NewMeetingDialog } from "./new-meeting-dialog";
import { useState } from "react";
import { MeetingsSearchFilter } from "./meetings-search-filter";
import { StatusFilter } from "./status-filter";
import { AgentIdFilters } from "./agent-id-filters";
import { useMeetingsFilters } from "../hooks/use-meetings-filters";
import { DEFAULT_PAGE } from "@/constants";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const MeetingsListHeader = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filters, setFilters] = useMeetingsFilters();

  const isFiltersModified =
    !!filters.search || !!filters.agentId || filters.status;

  const onClearFilters = () => {
    setFilters({
      search: "",
      status: null,
      agentId: "",
      page: DEFAULT_PAGE,
    });
  };
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

        <ScrollArea>
          <div className="flex items-center gap-x-2 p-1">
            <MeetingsSearchFilter />
            <StatusFilter />
            <AgentIdFilters />
            {isFiltersModified && (
              <Button
                type="button"
                onClick={onClearFilters}
                variant="destructive"
              >
                <XCircleIcon />
                Clear
              </Button>
            )}
          </div>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};
