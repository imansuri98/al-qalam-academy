import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "online",
    service: "Al-Arabi API Engine",
    timestamp: new Date().toISOString(),
    pedagogicalRules: {
      instructionLanguage: "English",
      transliteration: "Strictly Disabled (Zero Transliteration)",
      tracksSupported: ["Informal Conversational Fusha", "Classical Grammar (I'rab & Sarf)"],
    },
  });
}
