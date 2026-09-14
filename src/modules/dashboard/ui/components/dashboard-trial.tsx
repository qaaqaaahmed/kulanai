import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { RocketIcon } from "lucide-react";
import { MAX_FREE_AGENTS, MAX_FREE_MEETINGS } from "../../../premium/constants";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const DashboardTrial = () => {
  const trpc = useTRPC();

  const { data } = useQuery(trpc.premium.getFreeUsage.queryOptions());

  if (!data) return null;

  return (
    <div className="border border-border/10 bg-white/5 w-full rounded-lg flex flex-col gap-2">
      <div className="p-3 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <RocketIcon className="size-4" />
          <p className="text-sm font-medium">Free</p>
        </div>

        <div className="flex flex-col gap-y-2">
          <p className="text-xs">
            {data.agentsCount}/{MAX_FREE_AGENTS} agents
          </p>

          <Progress value={(data.agentsCount / MAX_FREE_AGENTS) * 100} />
        </div>

        <div className="flex flex-col gap-y-2">
          <p className="text-xs">
            {data.meetingCount}/{MAX_FREE_MEETINGS} meetings
          </p>

          <Progress value={(data.meetingCount / MAX_FREE_MEETINGS) * 100} />
        </div>
      </div>

      <Button
        className="bg-transparent hover:bg-white/10 rounded-t-none border border-t border-border/10 p-2"
        asChild
      >
        <Link href={`/upgrade`}>Upgrade</Link>
      </Button>
    </div>
  );
};
