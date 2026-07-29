"use client";
import {
  CommandDialog,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Dispatch, SetStateAction } from "react";

interface DashboardCommandProps {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  // setIsOpen: (value: boolean) => void;
}
export const DashboardCommand = ({
  open,
  setIsOpen,
}: DashboardCommandProps) => {
  return (
    <CommandDialog open={open} onOpenChange={setIsOpen}>
      <CommandInput placeholder="find a meeting or an agent" />
      <CommandList>
        <CommandItem>Test</CommandItem>
      </CommandList>
    </CommandDialog>
  );
};
