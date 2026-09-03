import {
  DefaultVideoPlaceholder,
  StreamVideoParticipant,
  ToggleAudioPreviewButton,
  ToggleVideoPreviewButton,
  VideoPreview,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { LogInIcon } from "lucide-react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { authClient } from "@/lib/auth-client";
import { generateAvatarUri } from "@/lib/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  onJoin: () => void;
}

const DisabledVideoPreview = () => {
  const { data } = authClient.useSession();

  return (
    <DefaultVideoPlaceholder
      participant={
        {
          name: data?.user.name ?? "",
          image:
            data?.user.image ??
            generateAvatarUri({
              seed: data?.user.name ?? "",
              variant: "initials",
            }),
        } as StreamVideoParticipant
      }
    />
  );
};

const AllowBrowserPermissions = () => {
  return (
    <p className="text-sm">
      Please grant your browser permissions to access your camera and microphone
    </p>
  );
};

export const CallLobby = ({ onJoin }: Props) => {
  const { useCameraState, useMicrophoneState } = useCallStateHooks();

  const { hasBrowserPermission: hasCameraPermissions } = useCameraState();
  const { hasBrowserPermission: hasMicrophonePermissions } =
    useMicrophoneState();

  const hasBrowserPermissions =
    hasCameraPermissions && hasMicrophonePermissions;

  return (
    <div className="flex flex-col items-center justify-center bg-radial from-sidebar-accent to-sidebar h-full">
      <div className="px-8 py-4 flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center justify-center bg-background p-10 rounded-lg shadow-sm gap-y-6">
          <div className="flex flex-col gap-y-2 text-center">
            <h6 className="text-lg font-medium">Ready to join?</h6>
            <p className="text-sm">Set up your call before joining</p>
          </div>

          <VideoPreview
            DisabledVideoPreview={
              hasBrowserPermissions
                ? DisabledVideoPreview
                : AllowBrowserPermissions
            }
          />

          <div className="flex items-center gap-2">
            <ToggleAudioPreviewButton />
            <ToggleVideoPreviewButton />
          </div>

          <div className="w-full flex items-center justify-between gap-x-2">
            <Button asChild variant="ghost">
              <Link href={`/meetings`}>Cancel</Link>
            </Button>
            <Button onClick={onJoin}>
              <LogInIcon />
              Join call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
