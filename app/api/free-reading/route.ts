import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are a master Saju (Korean Four Pillars of Destiny) reader with deep knowledge of East Asian metaphysics, the Ten Heavenly Stems, Twelve Earthly Branches, and the five elements (Wood, Fire, Earth, Metal, Water).

Your role is to provide a personalized, insightful mini Saju reading in English for a global audience. The reading should feel mystical yet grounded, blending ancient wisdom with modern relevance.

Structure your response using these exact markdown sections:

## Your Four Pillars at a Glance
Brief overview of the birth chart energy pattern (2-3 sentences).

## Core Personality & Inner Nature
Key personality traits revealed by the chart (3-4 points using **bold** for emphasis).

## Love & Relationships
Romantic tendencies, ideal partner qualities, emotional patterns (2-3 points).

## Career & Life Path
Strengths, ideal domains, and life direction (2-3 points).

## Your 2025–2026 Fortune Window
Current energetic cycle and what it means for this period (2-3 points).

## A Message from the Stars
Closing poetic insight personalized to the person (2-3 sentences).

Guidelines:
- Use **bold** for key concepts and *italics* for element names
- Keep the tone warm, empowering, and mystical — not fatalistic
- Be specific to the birth date provided, mentioning the actual year's Heavenly Stem and Earthly Branch
- Total length: 350–500 words
- Do NOT include disclaimers or "this is for entertainment" notes`;

function buildUserPrompt(
  name: string,
  gender: string,
  birthDate: string,
  birthTime: string
): string {
  const [year, month, day] = birthDate.split("-");
  const timeInfo =
    birthTime === "Unknown"
      ? "Birth time is unknown (Hour Pillar will be omitted)"
      : `Birth time: ${birthTime}`;

  return `Please provide a Saju reading for the following person:

Name: ${name}
Gender: ${gender}
Birth Date: ${birthDate} (Year: ${year}, Month: ${month}, Day: ${day})
${timeInfo}

Please address them by name (${name}) throughout the reading.`;
}

export async function POST(req: NextRequest) {
  let body: {
    name?: string;
    gender?: string;
    birthDate?: string;
    birthTime?: string;
  };

  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { name, gender, birthDate, birthTime } = body;

  if (!name || !gender || !birthDate) {
    return new Response(
      JSON.stringify({ error: "name, gender, and birthDate are required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const resolvedBirthTime = birthTime || "Unknown";
  const userPrompt = buildUserPrompt(name, gender, birthDate, resolvedBirthTime);

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const claudeStream = await anthropic.messages.create({
          model: "claude-opus-4-6",
          max_tokens: 1024,
          stream: true,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: userPrompt }],
        });

        for await (const event of claudeStream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            const data = `data: ${JSON.stringify({ text: event.delta.text })}\n\n`;
            controller.enqueue(encoder.encode(data));
          }
        }

        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ error: message })}\n\n`)
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
