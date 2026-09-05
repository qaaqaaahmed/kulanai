import {
  CallEndedEvent,
  CallTranscriptionReadyEvent,
  CallSessionStartedEvent,
  CallSessionParticipantLeftEvent,
  CallRecordingReadyEvent,
} from "@stream-io/node-sdk";

import { NextResponse, NextRequest } from "next/server";
import { and, eq } from "drizzle-orm";
import { streamVideo } from "@/lib/stream-video";
import { db } from "@/db/drizzle";
import { agents, meetings } from "@/db/schema";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("x-signature");
  const apiKey = req.headers.get("x-api-key");

  if (!signature || !apiKey) {
    return NextResponse.json(
      { error: "Missing signature or api key" },
      { status: 400 },
    );
  }

  // const body = await req.text();
  const rawBody = Buffer.from(await req.arrayBuffer());

  let payload: unknown;

  try {
    // payload = JSON.parse(body) as Record<string, unknown>;
    payload = streamVideo.verifyAndParseWebhook(rawBody, signature);
  } catch {
    return NextResponse.json({ error: "Invalid Webhook" }, { status: 400 });
  }

  const eventType = (payload as Record<string, unknown>)?.type;

  console.log("eventType:", eventType);

  if (eventType === "call.session_started") {
    const event = payload as CallSessionStartedEvent;
    const meetingId = event.call.custom.meetingId;

    if (!meetingId) {
      return NextResponse.json(
        { error: "Missing meeting id" },
        { status: 400 },
      );
    }

    const [existingMeeting] = await db
      .select()
      .from(meetings)
      .where(and(eq(meetings.id, meetingId), eq(meetings.status, "upcoming")));

    if (!existingMeeting) {
      return NextResponse.json(
        {
          error: "Meeting not found",
        },
        { status: 404 },
      );
    }

    await db
      .update(meetings)
      .set({
        status: "active",
        startedAt: new Date(),
      })
      .where(eq(meetings.id, meetingId));

    const [existingAgent] = await db
      .select()
      .from(agents)
      .where(eq(agents.id, existingMeeting.agentId));

    if (!existingAgent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    const call = streamVideo.video.call("default", meetingId);

    const realtimeClient = await streamVideo.video.connectOpenAi({
      call,
      agentUserId: existingAgent.id,
      openAiApiKey: process.env.OPEN_AI_API_KEY!,
    });
    // console.log("OPENAI CONNECTED");

    // realtimeClient.on("realtime.event", (data) => {
    //   console.log("OPENAI RAW EVENT:", data);
    // });
    realtimeClient.updateSession({
      instructions: existingAgent.instructions,
      turn_detection: {
        type: "semantic_vad",
      },
    });
    // console.log("SESSION UPDATED");
  } else if (eventType === "call.session_participant_left") {
    const event = payload as CallSessionParticipantLeftEvent;
    const meetingId = event.call_cid.split(":")[1];

    if (!meetingId) {
      return NextResponse.json(
        { error: "Missing meeting Id" },
        { status: 400 },
      );
    }

    const call = streamVideo.video.call("default", meetingId);

    await call.end();
  }

  return NextResponse.json({ status: "ok" });
}
