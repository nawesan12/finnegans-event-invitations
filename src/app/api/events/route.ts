import { db } from "@/lib/prisma";
import { EventStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const VALID_EVENT_STATUSES: EventStatus[] = [
  "UPCOMING",
  "COMPLETED",
  "PLANNING",
  "CANCELED",
];

const isValidStatus = (status: string): status is EventStatus =>
  VALID_EVENT_STATUSES.includes(status as EventStatus);

export async function GET() {
  try {
    const events = await db.event.findMany({
      include: {
        attendees: true,
      },
      orderBy: {
        date: "desc",
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const location =
      typeof body.location === "string" ? body.location.trim() : "";
    const rawStatus =
      typeof body.status === "string" ? body.status.toUpperCase() : "";
    const capacityNumber = Number(body.capacity);
    const eventDate = new Date(body.date);

    if (!name || !location) {
      return NextResponse.json(
        { message: "Missing required fields for event creation." },
        { status: 400 },
      );
    }

    if (!body.date || Number.isNaN(eventDate.getTime())) {
      return NextResponse.json(
        { message: "A valid event date must be provided." },
        { status: 400 },
      );
    }

    if (!Number.isFinite(capacityNumber) || capacityNumber < 0) {
      return NextResponse.json(
        { message: "Event capacity must be a non-negative number." },
        { status: 400 },
      );
    }

    if (!isValidStatus(rawStatus)) {
      return NextResponse.json(
        { message: "Event status provided is not valid." },
        { status: 400 },
      );
    }

    const newEvent = await db.event.create({
      data: {
        name,
        location,
        status: rawStatus as EventStatus,
        capacity: capacityNumber,
        date: eventDate,
      },
      include: {
        attendees: true,
      },
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("POST Event API Error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 },
    );
  }
}
