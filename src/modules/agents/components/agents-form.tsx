import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { AgentsInsertSchema } from "../schemas";
import { AgentsGetOne } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AgentsFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: AgentsGetOne;
}
export const AgentsForm = ({
  onSuccess,
  onCancel,
  initialValues,
}: AgentsFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions());

        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: initialValues.id }),
          );
        }

        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);

        //TODO: CHECK IF ERROR IS FORBIDDEN -> REDIRECT TO UPGRADE
      },
    }),
  );

  const form = useForm<z.infer<typeof AgentsInsertSchema>>({
    resolver: zodResolver(AgentsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      instructions: initialValues?.instructions ?? "",
    },
  });

  const isEdit = !!initialValues?.id;

  const isPending = createAgent.isPending;

  const onSubmit = (values: z.infer<typeof AgentsInsertSchema>) => {
    if (isEdit) {
      console.log("TODO: UPDATE AGENT");
    } else {
      createAgent.mutate(values);
    }
  };

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <GeneratedAvatar
        seed={form.watch("name")}
        variant="botttsNeutral"
        className="size-16 border"
      />
      <Controller
        control={form.control}
        name="name"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Name</FieldLabel>
            <Input placeholder="e.g Deero" {...field} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="instructions"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Instructions</FieldLabel>
            <Textarea
              {...field}
              placeholder="e.g You are a chaotic agent, whenever someone seeks an advice from you, be extreme and give the most illogical advice"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <div className="flex justify-between">
        {onCancel && (
          <Button
            variant="outline"
            disabled={isPending}
            onClick={() => onCancel()}
            type="button"
          >
            Cancel
          </Button>
        )}

        <Button type="submit" disabled={isPending}>
          {isEdit ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
};
