"use client";
import {
  CommandResponsiveDialog,
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
    <CommandResponsiveDialog open={open} onOpenChange={setIsOpen}>
      <CommandInput placeholder="find a meeting or an agent" />
      <CommandList>
        <CommandItem>Test</CommandItem>
      </CommandList>
    </CommandResponsiveDialog>
  );
};
