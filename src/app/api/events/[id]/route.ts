import { db } from "@/lib/prisma";
import { EventStatus, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const VALID_EVENT_STATUSES: EventStatus[] = [
  "UPCOMING",
  "COMPLETED",
  "PLANNING",
  "CANCELED",
];

const isValidStatus = (status: string): status is EventStatus =>
  VALID_EVENT_STATUSES.includes(status as EventStatus);

const parseEventId = (id: string) => {
  const eventId = Number(id);
  return Number.isInteger(eventId) && eventId > 0 ? eventId : null;
};

const resolveEventId = async (
  params?: Promise<Record<string, string | string[] | undefined>>,
) => {
  if (!params) {
    return null;
  }

  const { id } = await params;

  if (typeof id !== "string") {
    return null;
  }

  return parseEventId(id);
};

export async function GET(
  _request: NextRequest,
  { params }: RouteContext<"/api/events/[id]">,
) {
  const eventId = await resolveEventId(params);

  if (!eventId) {
    return NextResponse.json(
      { message: "A valid event id must be provided." },
      { status: 400 },
    );
  }

  try {
    const event = await db.event.findUnique({
      where: { id: eventId },
      include: { attendees: true },
    });

    if (!event) {
      return NextResponse.json(
        { message: "The requested event could not be found." },
        { status: 404 },
      );
    }

    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    console.error("GET Event by ID API Error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext<"/api/events/[id]">,
) {
  const eventId = await resolveEventId(params);

  if (!eventId) {
    return NextResponse.json(
      { message: "A valid event id must be provided." },
      { status: 400 },
    );
  }

  try {
    const body = await request.json();
    const data: Prisma.EventUpdateInput = {};

    if ("name" in body) {
      const name = typeof body.name === "string" ? body.name.trim() : "";
      if (!name) {
        return NextResponse.json(
          { message: "Event name cannot be empty." },
          { status: 400 },
        );
      }
      data.name = name;
    }

    if ("location" in body) {
      const location =
        typeof body.location === "string" ? body.location.trim() : "";
      if (!location) {
        return NextResponse.json(
          { message: "Event location cannot be empty." },
          { status: 400 },
        );
      }
      data.location = location;
    }

    if ("status" in body) {
      const rawStatus =
        typeof body.status === "string" ? body.status.toUpperCase() : "";
      if (!isValidStatus(rawStatus)) {
        return NextResponse.json(
          { message: "Event status provided is not valid." },
          { status: 400 },
        );
      }
      data.status = rawStatus as EventStatus;
    }

    if ("capacity" in body) {
      const capacityNumber = Number(body.capacity);
      if (!Number.isFinite(capacityNumber) || capacityNumber < 0) {
        return NextResponse.json(
          { message: "Event capacity must be a non-negative number." },
          { status: 400 },
        );
      }
      data.capacity = capacityNumber;
    }

    if ("date" in body) {
      const eventDate = new Date(body.date);
      if (Number.isNaN(eventDate.getTime())) {
        return NextResponse.json(
          { message: "A valid event date must be provided." },
          { status: 400 },
        );
      }
      data.date = eventDate;
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { message: "No valid fields were provided for update." },
        { status: 400 },
      );
    }

    const updatedEvent = await db.event.update({
      where: { id: eventId },
      data,
      include: { attendees: true },
    });

    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (error) {
    console.error("PATCH Event API Error:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { message: "The event you tried to update does not exist." },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: RouteContext<"/api/events/[id]">,
) {
  const eventId = await resolveEventId(params);

  if (!eventId) {
    return NextResponse.json(
      { message: "A valid event id must be provided." },
      { status: 400 },
    );
  }

  try {
    await db.attendee.deleteMany({ where: { eventId } });
    await db.event.delete({ where: { id: eventId } });

    return NextResponse.json(
      { message: "Event deleted successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE Event API Error:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { message: "The event you tried to delete does not exist." },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 },
    );
  }
}
