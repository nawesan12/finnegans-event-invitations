import { db } from "@/lib/prisma";
import { sendEmail } from "@/lib/mail";
import { confirmationEmailTemplate } from "@/lib/templates/confirmationEmail";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Attendee {
  id: number | undefined;
  name: string;
  email: string;
  company: string;
  role: string;
  dietaryNeeds: string | null;
  eventId: number | undefined;
}

/**
 * Handles the GET request to fetch all attendees.
 * @returns {NextResponse} A JSON response with the list of attendees.
 */
export async function GET() {
  try {
    const attendees: Attendee[] = await db.attendee.findMany();

    return NextResponse.json(attendees, { status: 200 });
  } catch (error) {
    console.error("GET Attendees API Error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 },
    );
  }
}

/**
 * Handles the POST request for event registration.
 * This function receives attendee data from the registration form,
 * validates it, and saves it to the in-memory store.
 *
 * @param {NextRequest} request The incoming request object, containing the form data.
 * @returns {NextResponse} A JSON response indicating success or failure.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, role, diet } = body;

    if (!name || !email || !company || !role) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 },
      );
    }

    const newAttendee: Attendee = await db.attendee.create({
      data: {
        name,
        email,
        company,
        role,
        dietaryNeeds: diet || null,
        eventId: 2,
      },
    });

    console.log("New Registration Received and Stored:", newAttendee);

    // Send confirmation email to attendee
    const text = `Hola ${name}, tu registro al evento ha sido recibido. ¡Gracias!`;
    const html = confirmationEmailTemplate(name);
    await sendEmail(email, "Confirmación de registro", text, html);

    return NextResponse.json(
      { message: "Registration successful!", data: newAttendee },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST Attendee API Error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const attendeeId = Number(body?.id);

    if (!Number.isInteger(attendeeId) || attendeeId <= 0) {
      return NextResponse.json(
        { message: "A valid attendee id must be provided." },
        { status: 400 },
      );
    }

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
