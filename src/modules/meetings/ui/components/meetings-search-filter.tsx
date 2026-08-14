import { Input } from "@/components/ui/input";
import { useMeetingsFilters } from "../hooks/use-meetings-filters";
import { SearchIcon } from "lucide-react";
import { DEFAULT_PAGE } from "@/constants";

export const MeetingsSearchFilter = () => {
  const [filters, setFilters] = useMeetingsFilters();

  return (
    <div className="relative">
      <Input
        placeholder="Filter by search..."
        value={filters.search}
        className="h-9 w-[200px] bg-white pl-7"
        onChange={(e) =>
          // SAW THE BUG ANTONIO DID NOT INCLUDE THE PAGE, CORRECTED AND ADDED PAGE MYSELF
          setFilters({ search: e.target.value, page: DEFAULT_PAGE })
        }
      />
      <SearchIcon className="left-2 top-1/2 absolute -translate-y-1/2 text-muted-foreground size-4" />
    </div>
  );
};
