// File: app/api/register/route.js

import { NextRequest, NextResponse } from "next/server";

/**
 * Handles the POST request for event registration.
 * This function receives attendee data from the registration form,
 * validates it, and would typically save it to a database.
 *
 * @param {NextRequest} request The incoming request object, containing the form data.
 * @returns {NextResponse} A JSON response indicating success or failure.
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Parse the incoming request body as JSON
    const body = await request.json();
    const { name, email, empresa, cargo, diet } = body;

    // 2. Basic Server-Side Validation
    // Ensure all required fields are present.
    if (!name || !email || !empresa || !cargo) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 },
      );
    }

    // 3. Process the data
    // In a real-world application, this is where you would
    // interact with your database (e.g., PostgreSQL, MongoDB, Firebase).
    // For this example, we'll just log the data to the console
    // to simulate a successful registration.
    console.log("New Registration Received:");
    console.log({
      name,
      email,
      company: empresa,
      role: cargo,
      dietaryNeeds: diet, // The 'diet' field can be a string or null
    });

    // 4. Return a success response
    // This confirms to the client that the data was received successfully.
    return NextResponse.json(
      { message: "Registration successful!", data: body },
      { status: 201 }, // 201 Created is a good status for successful resource creation.
    );
  } catch (error) {
    // 5. Handle potential errors
    // This could be a JSON parsing error or any other unexpected issue.
    console.error("Registration API Error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 },
    );
  }
}
