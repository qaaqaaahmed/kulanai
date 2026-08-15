import { EmptyState } from "@/components/empty-state";

export const ProcessingState = () => {
  return (
    <div className="flex flex-col gap-y-6 bg-white rounded-lg items-center justify-center">
      <EmptyState
        image="/processing.svg"
        title="Meeting was completed"
        description="After processing is complete, a trasncript summary will appear here"
      />
    </div>
  );
};
