import { CommandSelect } from "@/components/command-select";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useMeetingsFilters } from "../hooks/use-meetings-filters";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { useState } from "react";

export const AgentIdFilters = () => {
  const [filters, setFilters] = useMeetingsFilters();
  const [agentSearch, setAgentSearch] = useState("");
  const trpc = useTRPC();

  const { data } = useQuery(
    trpc.agents.getMany.queryOptions({ search: agentSearch, pageSize: 100 }),
  );

  return (
    <CommandSelect
      options={(data?.items || []).map((item) => ({
        id: item.id,
        value: item.id,
        children: (
          <div className="flex items-center gap-x-2">
            <GeneratedAvatar
              seed={item.name}
              variant="botttsNeutral"
              className="size-6"
            />
            <span>{item.name}</span>
          </div>
        ),
      }))}
      placeholder="Agent"
      className="h-9"
      onSelect={(agentId) => setFilters({ agentId: agentId })}
      value={filters.agentId ?? ""}
      onSearch={setAgentSearch}
    />
  );
};
