"use client"
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { Event, Attendee } from "@/lib/types";

interface AttendeesPageProps {
  events: Event[];
  attendees: Attendee[];
  isLoading: boolean;
  onDelete: (attendeeId: number) => void;
}

export const AttendeesPage = ({
  events,
  attendees,
  isLoading,
  onDelete,
}: AttendeesPageProps) => {
  const [selectedEventId, setSelectedEventId] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dietaryFilter, setDietaryFilter] = useState("all");

  const filteredAttendees = useMemo(() => {
    return attendees.filter((attendee) => {
      const matchesEvent =
        selectedEventId === "all" ||
        attendee.eventId === parseInt(selectedEventId);
      const matchesSearch =
        searchTerm === "" ||
        attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attendee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attendee.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDietary =
        dietaryFilter === "all" ||
        (dietaryFilter === "yes" && attendee.dietaryNeeds) ||
        (dietaryFilter === "no" && !attendee.dietaryNeeds);
      return matchesEvent && matchesSearch && matchesDietary;
    });
  }, [attendees, selectedEventId, searchTerm, dietaryFilter]);

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <h2 className="text-3xl font-bold text-white">Asistentes</h2>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Buscar por nombre, email o empresa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-[#4BC3FE] outline-none"
          />
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="w-full md:w-auto px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-[#4BC3FE] outline-none"
            disabled={isLoading}
          >
            <option value="all">Todos los Eventos</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name}
              </option>
            ))}
          </select>
          <select
            value={dietaryFilter}
            onChange={(e) => setDietaryFilter(e.target.value)}
            className="w-full md:w-auto px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-[#4BC3FE] outline-none"
          >
            <option value="all">Todas las Dietas</option>
            <option value="yes">Con Necesidades Dietéticas</option>
            <option value="no">Sin Necesidades Dietéticas</option>
          </select>
        </div>
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-white/80">
            <thead className="text-xs text-white/60 uppercase bg-white/5">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3">
                  Empresa
                </th>
                <th scope="col" className="px-6 py-3">
                  Evento
                </th>
                <th scope="col" className="px-6 py-3">
                  Dieta Especial
                </th>
                <th scope="col" className="px-6 py-3 text-right">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading &&
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-white/10">
                    <td className="px-6 py-4">
                      <div className="h-4 bg-white/10 rounded w-3/4 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-white/10 rounded w-1/2 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-white/10 rounded w-1/4 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-white/10 rounded w-1/4 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="h-8 w-20 bg-white/10 rounded-lg animate-pulse"></div>
                    </td>
                  </tr>
                ))}
              {!isLoading &&
                filteredAttendees.map((attendee) => (
                  <tr
                    key={attendee.id}
                    className="border-b border-white/10 hover:bg-white/5"
                  >
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-white whitespace-nowrap"
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={`https://placehold.co/32x32/8694FF/FFFFFF?text=${attendee.name.charAt(0)}`}
                          alt={attendee.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <div>
                          <p className="font-semibold">{attendee.name}</p>
                          <p className="text-xs text-white/60">
                            {attendee.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{attendee.company}</td>
                    <td className="px-6 py-4">
                      {events.find((e) => e.id === attendee.eventId)?.name ||
                        "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {attendee.dietaryNeeds ? (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-[#FE4D17]/20 text-[#FE4D17]">
                          {attendee.dietaryNeeds}
                        </span>
                      ) : (
                        <span className="text-white/50">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        variant="danger"
                        onClick={() => onDelete(attendee.id)}
                        className="px-3 py-1 text-xs"
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              {!isLoading && filteredAttendees.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-white/60"
                  >
                    No se encontraron asistentes para los filtros actuales.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
