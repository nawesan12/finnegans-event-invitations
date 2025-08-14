export interface Attendee {
  id: number;
  name: string;
  email: string;
  company: string;
  role: string;
  dietaryNeeds: string | null;
  eventId: number;
  createdAt: string;
  event?: Event;
}

export interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  status: "UPCOMING" | "COMPLETED" | "PLANNING" | "CANCELED";
  capacity: number;
  attendees: Attendee[];
}
