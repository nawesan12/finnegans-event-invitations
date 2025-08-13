import { NextRequest, NextResponse } from "next/server";

interface Attendee {
  id: number;
  name: string;
  email: string;
  empresa: string;
  cargo: string;
  diet: string | null;
}

// In-memory database
let attendees: Attendee[] = [];
let nextId = 1;

/**
 * Handles the GET request to fetch all attendees.
 * @returns {NextResponse} A JSON response with the list of attendees.
 */
export async function GET() {
  try {
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
    const { name, email, empresa, cargo, diet } = body;

    if (!name || !email || !empresa || !cargo) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 },
      );
    }

    const newAttendee: Attendee = {
      id: nextId++,
      name,
      email,
      empresa,
      cargo,
      diet: diet || null,
    };

    attendees.push(newAttendee);

    console.log("New Registration Received and Stored:", newAttendee);

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
