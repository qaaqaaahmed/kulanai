"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { NewAgentDialog } from "./new-agent-dialog";
import { useState } from "react";
import { AgentsSearchFilter } from "./agents-search-filter";
import { useAgentsFilter } from "../hooks/use-agents-filter";
import { DEFAULT_PAGE } from "@/constants";

export const AgentsListHeader = () => {
  const [filters, setFilters] = useAgentsFilter();
  const [dialogOpen, setDialogOpen] = useState(false);

  const isAnySearchFiltersModified = !!filters.search;

  const onClearFilters = () => {
    setFilters({
      search: "",
      page: DEFAULT_PAGE,
    });
  };
  return (
    <>
      <NewAgentDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <div className="px-4 py-4 md:px-8 flex flex-col gap-y-6">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">Agents</h5>
          <Button onClick={() => setDialogOpen(true)}>
            <PlusIcon />
            New Agent
          </Button>
        </div>
        <div className="flex items-center gap-x-2 p-1">
          <AgentsSearchFilter />

          {isAnySearchFiltersModified && (
            <Button variant="outline" size="sm" onClick={onClearFilters}>
              <XCircleIcon />
              Clear
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
