import { EmptyState } from "@/components/empty-state";

export const CancelledState = () => {
  return (
    <div className="flex flex-col gap-y-6 bg-white rounded-lg items-center justify-center">
      <EmptyState
        image="/cancelled.svg"
        title="Meeting cancelled"
        description="This meeting was cancelled"
      />
    </div>
  );
};
