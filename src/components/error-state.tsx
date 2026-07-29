import { AlertCircleIcon } from "lucide-react";

interface ErrorStateProps {
  title: string;
  description: string;
}

export const ErrorState = ({ title, description }: ErrorStateProps) => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-6 p-10 rounded-lg bg-background">
        <AlertCircleIcon className="size-6 text-destructive" />
        <div className="flex flex-col gap-y-2 text-center">
          <h6 className="text-lg">{title}</h6>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};
