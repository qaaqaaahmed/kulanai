"use client";

import { ColumnDef } from "@tanstack/react-table";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { VideoIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MeetingsGetMany } from "../../types";
import humanizeDuration from "humanize-duration";
import { format } from "date-fns";

import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  ClockFadingIcon,
  CornerDownRightIcon,
  LoaderIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

//converting the seconds from db to ms as per api requirement of humanize
function formatDurationFromDB(seconds: number) {
  return humanizeDuration(seconds * 1000, {
    round: true,
    largest: 1,
    units: ["h", "m", "s"],
  });
}

const statusIconMap = {
  upcoming: ClockArrowUpIcon,
  active: LoaderIcon,
  completed: CircleCheckIcon,
  processing: LoaderIcon,
  cancelled: CircleXIcon,
};

const statusColorMap = {
  upcoming: "bg-yellow-500/20 text-yellow-800 border-yellow-800/5 p-1",
  active: "bg-blue-500/20 text-blue-800 border-blue-800/5 p-1",
  completed: "bg-emerald-500/20 text-emerald-800 border-emerald-800/5 p-1",
  processing: "bg-gray-300/20 text-gray-500 border-grey-500/5 p-1",
  cancelled: "bg-rose-500/20 text-rose-800 border-rose-800/5 p-1",
};

export const columns: ColumnDef<MeetingsGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Meeting Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1">
        <span className="font-semibold capitalize">{row.original.name}</span>

        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-x-1">
            <CornerDownRightIcon className="size-3 text-muted-foreground" />
            <span className="text-sm text-muted-foreground max-w-[200px] truncate capitalize">
              {row.original.agent.name}
            </span>
          </div>

          <GeneratedAvatar
            seed={row.original.agent.name}
            variant="botttsNeutral"
            className="size-4"
          />

          <span className="text-muted-foreground text-sm">
            {row.original.startedAt
              ? format(row.original.startedAt, "MMM dd")
              : ""}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const Icon =
        statusIconMap[row.original.status as keyof typeof statusIconMap];

      return (
        <Badge
          variant="outline"
          className={cn(
            "capitalize [&>svg]:size-4 text-muted-foreground",
            statusColorMap[row.original.status as keyof typeof statusColorMap],
          )}
        >
          <Icon
            className={cn(
              row.original.status === "processing" && "animate-spin",
            )}
          />
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "duration",
    header: "duration",
    cell: ({ row }) => {
      return (
        <Badge
          variant="outline"
          className="capitalize [&>svg]:size-4 text-muted-foreground"
        >
          <ClockFadingIcon className="text-blue-700" />
          {row.original.duration
            ? formatDurationFromDB(row.original.duration)
            : "No duration"}
        </Badge>
      );
    },
  },
];
