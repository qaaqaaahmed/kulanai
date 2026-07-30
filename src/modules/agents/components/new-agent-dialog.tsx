import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentsForm } from "./agents-form";

interface NewAgentDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

export const NewAgentDialog = ({ open, onOpenChange }: NewAgentDialogProps) => {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="New Agent"
      description="Create a new agent"
    >
      <AgentsForm
        onCancel={() => onOpenChange(false)}
        onSuccess={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
};
