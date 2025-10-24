import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/prisma";

const resolveAttendeeId = (params?: { id?: string }) => {
  if (!params || typeof params.id !== "string") {
    return null;
  }

  const attendeeId = Number(params.id);
  return Number.isInteger(attendeeId) ? attendeeId : null;
};

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id?: string } },
) {
  const attendeeId = resolveAttendeeId(params);

  if (attendeeId === null) {
    return NextResponse.json(
      { message: "Invalid attendee id." },
      { status: 400 },
    );
  }

  try {
    await db.attendee.delete({
      where: { id: attendeeId },
    });

    return NextResponse.json(
      { message: "Attendee deleted successfully." },
      { status: 200 },
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { message: "Attendee not found." },
        { status: 404 },
      );
    }

    console.error("DELETE Attendee API Error:", error);

    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 },
    );
  }
}
