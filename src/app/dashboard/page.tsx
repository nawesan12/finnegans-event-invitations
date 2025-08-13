"use client";

import React, { useState, useEffect, useMemo } from "react";

interface Attendee {
  id: number;
  name: string;
  email: string;
  empresa: string;
  cargo: string;
  diet: string | null;
}

export default function DashboardPage() {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const response = await fetch("/api/atendees");
        if (response.ok) {
          const data = await response.json();
          setAttendees(data);
        } else {
          console.error("Failed to fetch attendees");
        }
      } catch (error) {
        console.error("An error occurred while fetching attendees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendees();
  }, []);

  const filteredAttendees = useMemo(
    () =>
      attendees.filter(
        (attendee) =>
          attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          attendee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          attendee.empresa.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [attendees, searchTerm]
  );

  return (
    <div className="bg-primary-dark text-white min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">Attendees Dashboard</h1>
          <input
            type="text"
            placeholder="Filter by name, email, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-full border-2 border-accent-blue bg-white text-primary-dark w-full md:w-[300px]"
          />
        </header>

        {loading ? (
          <p>Loading attendees...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white text-primary-dark rounded-lg overflow-hidden">
              <thead className="bg-accent-blue text-primary-dark">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Company</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Diet</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendees.map((attendee) => (
                  <tr key={attendee.id} className="border-b border-accent-purple">
                    <td className="p-4">{attendee.name}</td>
                    <td className="p-4">{attendee.email}</td>
                    <td className="p-4">{attendee.empresa}</td>
                    <td className="p-4">{attendee.cargo}</td>
                    <td className="p-4">{attendee.diet || "N/A"}</td>
                    <td className="p-4">
                      <a
                        href={`mailto:${attendee.email}`}
                        className="bg-accent-orange text-white px-4 py-2 rounded-full no-underline font-bold hover:bg-opacity-80"
                      >
                        Contact
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
