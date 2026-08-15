import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MeetingsGetOne } from "../../types";
import { meetingsInsertSchema } from "../../schemas";
import { useState } from "react";
import { CommandSelect } from "@/components/command-select";
import { NewAgentDialog } from "@/modules/agents/components/new-agent-dialog";

interface MeetingsForm {
  onSuccess?: (id?: string) => void;
  onCancel?: () => void;
  initialValues?: MeetingsGetOne;
}
export const MeetingsForm = ({
  onSuccess,
  onCancel,
  initialValues,
}: MeetingsForm) => {
  const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);
  const [agentSearch, setAgentSearch] = useState("");
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const agents = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: agentSearch,
    }),
  );

  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({}),
        );

        //invalidate free tier usage

        onSuccess?.(data.id);
      },
      onError: (error) => {
        toast.error(error.message);

        //TODO: CHECK IF ERROR IS FORBIDDEN -> REDIRECT TO UPGRADE
      },
    }),
  );

  const updateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({}),
        );

        //invalidate free tier usage

        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: initialValues.id }),
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

  const form = useForm<z.infer<typeof meetingsInsertSchema>>({
    resolver: zodResolver(meetingsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      agentId: initialValues?.agentId ?? "",
    },
  });

  const isEdit = !!initialValues?.id;

  const isPending = createMeeting.isPending || updateMeeting.isPending;

  const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
    if (isEdit) {
      updateMeeting.mutate({ ...values, id: initialValues.id });
    } else {
      createMeeting.mutate(values);
    }
  };

  return (
    <>
      <NewAgentDialog
        open={openNewAgentDialog}
        onOpenChange={setOpenNewAgentDialog}
      />
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input placeholder="e.g Math Consultations" {...field} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="agentId"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Agent</FieldLabel>
              <CommandSelect
                options={(agents.data?.items || []).map((agent) => ({
                  id: agent.id,
                  value: agent.id,
                  children: (
                    <div className="flex items-center gap-x-2">
                      <GeneratedAvatar
                        seed={agent.name}
                        variant="botttsNeutral"
                        className="border size-6"
                      />
                      <span>{agent.name}</span>
                    </div>
                  ),
                }))}
                onSelect={field.onChange}
                onSearch={setAgentSearch}
                value={field.value}
                placeholder="Select an agent"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}

              <FieldDescription>
                Not found what you&apos;re looking for?{" "}
                <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={() => setOpenNewAgentDialog(true)}
                >
                  Create new agent
                </button>
              </FieldDescription>
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
    </>
  );
};
