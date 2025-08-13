// File: app/api/events/route.ts
import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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

export async function PATCH(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const id = params.get("id");
    const { name, location, status, date, capacity } = await request.json();

    const updatedEvent = await db.event.update({
      where: { id: Number(id) as number },
      data: {
        name,
        location,
        status,
        date: new Date(date),
        capacity,
      },
    });

    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (error) {
    console.error("PATCH Event API Error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 },
    );
  }
}
