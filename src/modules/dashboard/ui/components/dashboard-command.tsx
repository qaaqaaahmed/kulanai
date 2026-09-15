"use client";
import { GeneratedAvatar } from "@/components/generated-avatar";
import {
  CommandResponsiveDialog,
  CommandInput,
  CommandItem,
  CommandList,
  CommandGroup,
  CommandEmpty,
} from "@/components/ui/command";
import { useTRPC } from "@/trpc/client";

import { useQuery } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

interface DashboardCommandProps {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  // setIsOpen: (value: boolean) => void;
}
export const DashboardCommand = ({
  open,
  setIsOpen,
}: DashboardCommandProps) => {
  const [search, setSearch] = useState("");
  const trpc = useTRPC();
  const router = useRouter();

  const agents = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: search,
    }),
  );
  const meetings = useQuery(
    trpc.meetings.getMany.queryOptions({
      pageSize: 100,
      search: search,
    }),
  );
  return (
    <CommandResponsiveDialog
      shouldFilter={false}
      open={open}
      onOpenChange={setIsOpen}
    >
      <CommandInput
        placeholder="find a meeting or an agent..."
        value={search}
        onValueChange={(value) => setSearch(value)}
      />
      <CommandList>
        <CommandGroup heading="Meetings">
          <CommandEmpty className="text-muted-foreground text-sm">
            No meetings Found
          </CommandEmpty>

          {meetings.data?.items.map((meeting) => {
            return (
              <CommandItem
                key={meeting.id}
                onSelect={() => {
                  router.push(`/meetings/${meeting.id}`);
                  setIsOpen(false);
                }}
              >
                {meeting.name}
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandGroup heading="Agents">
          <CommandEmpty className="text-muted-foreground text-sm">
            No agents found
          </CommandEmpty>

          {agents.data?.items.map((agent) => {
            return (
              <CommandItem
                key={agent.id}
                onSelect={() => {
                  router.push(`/agents/${agent.id}`);
                  setIsOpen(false);
                }}
              >
                <GeneratedAvatar
                  className="size-5"
                  variant="botttsNeutral"
                  seed={agent.name}
                />
                {agent.name}
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </CommandResponsiveDialog>
  );
};
