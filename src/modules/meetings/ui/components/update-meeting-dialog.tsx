import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingsForm } from "./meeting-form";
import { useRouter } from "next/navigation";
import { MeetingsGetOne } from "../../types";

interface UpdateMeetingDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  initialValues: MeetingsGetOne;
}

export const UpdateMeetingDialog = ({
  open,
  onOpenChange,
  initialValues,
}: UpdateMeetingDialogProps) => {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Update Meeting"
      description="Use the form below to update meeting"
    >
      <MeetingsForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};
