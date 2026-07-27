"use client";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { DashboardCommand } from "./dashboard-command";

export const DashboardNavbar = () => {
  const { state, isMobile, toggleSidebar } = useSidebar();
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key == "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, []);
  return (
    <>
      <DashboardCommand open={commandOpen} setIsOpen={setCommandOpen} />
      <nav className=" flex items-center gap-x-2 px-4 py-3 border border-b bg-background">
        <Button variant="outline" className="size-9" onClick={toggleSidebar}>
          {state === "collapsed" || isMobile ? (
            <PanelLeftIcon className="size-4" />
          ) : (
            <PanelLeftCloseIcon className="size-4" />
          )}
        </Button>

        <Button
          className="h-10 w-72 justify-start font-normal text-muted-foreground hover:text-muted-foreground"
          variant="outline"
          size="sm"
          onClick={() => setCommandOpen((open) => !open)}
        >
          <SearchIcon />
          Search
          <kbd className="ml-auto pointer-events-none select-none inline-flex items-center gap-1 p-0.5 font-mono text-muted-foreground text-[10px] font-normal rounded border">
            <span className="text-xs">&#8984;</span>K
          </kbd>
        </Button>
      </nav>
    </>
  );
};
