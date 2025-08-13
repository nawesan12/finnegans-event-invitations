// File: app/api/events/route.ts
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const events = await db.event.findMany({
      // Include the attendees related to each event
      include: {
        attendees: true,
      },
      orderBy: {
        date: "desc", // Show the newest events first
      },
    });

    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("GET Events API Error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 },
    );
  }
}
