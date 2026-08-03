import { NextResponse } from "next/server";
import { DEFAULT_PASSAGES, PassageItem } from "@alarabi/curriculum";

// Server memory store initialized with DEFAULT_PASSAGES
let serverPassagesStore: PassageItem[] = [...DEFAULT_PASSAGES];

export async function GET() {
  return NextResponse.json({
    success: true,
    passages: serverPassagesStore,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { passage } = body;

    if (!passage || !passage.id) {
      return NextResponse.json({ success: false, error: "Invalid passage data" }, { status: 400 });
    }

    const existingIdx = serverPassagesStore.findIndex((p) => p.id === passage.id);
    if (existingIdx >= 0) {
      serverPassagesStore[existingIdx] = passage;
    } else {
      serverPassagesStore.push(passage);
    }

    return NextResponse.json({ success: true, passages: serverPassagesStore });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing passage ID" }, { status: 400 });
    }

    serverPassagesStore = serverPassagesStore.filter((p) => p.id !== id);
    return NextResponse.json({ success: true, passages: serverPassagesStore });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
