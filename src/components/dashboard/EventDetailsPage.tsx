"use client"
import React from "react";
import { Button } from "./ui/Button";
import { Icon } from "./ui/Icon";
import { Card } from "./ui/Card";
import { StatCard } from "./StatCard";
import { Event, Attendee } from "@/lib/types";

interface EventDetailsPageProps {
  event: Event | undefined;
  attendees: Attendee[];
  isLoading: boolean;
  onBack: () => void;
  onEdit: (event: Event) => void;
}

export const EventDetailsPage = ({ event, attendees, isLoading, onBack, onEdit }: EventDetailsPageProps) => {
  if (isLoading || !event) {
    return (
      <div className="p-6 space-y-6 animate-pulse">
        <div className="h-8 w-1/4 bg-white/10 rounded-md"></div>
        <div className="h-10 w-3/4 bg-white/10 rounded-md"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-24 bg-white/10 rounded-xl"></div>
          <div className="h-24 bg-white/10 rounded-xl"></div>
          <div className="h-24 bg-white/10 rounded-xl"></div>
        </div>
        <div className="h-80 bg-white/10 rounded-xl"></div>
      </div>
    );
  }

  const attendanceRate =
    event.capacity > 0
      ? ((attendees.length / event.capacity) * 100).toFixed(1)
      : "0.0";
  const dietaryNeedsCount = attendees.filter((a) => a.dietaryNeeds).length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Button variant="ghost" onClick={onBack} className="mb-2 -ml-2">
            <Icon name="arrowLeft" className="mr-2" />
            Volver a Eventos
          </Button>
          <h2 className="text-3xl font-bold text-white">{event.name}</h2>
          <p className="text-white/60">
            {new Date(event.date).toLocaleDateString("es-AR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            · {event.location}
          </p>
        </div>
        <Button onClick={() => onEdit(event)} className="gap-2 px-4 py-2">
          <Icon name="edit" className="w-4 h-4" />
          Editar Evento
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Asistencia"
          value={`${attendees.length} / ${event.capacity}`}
          icon="users"
          isLoading={isLoading}
        />
        <StatCard
          title="Tasa de Asistencia"
          value={`${attendanceRate}%`}
          icon="pieChart"
          isLoading={isLoading}
        />
        <StatCard
          title="Necesidades Dietéticas"
          value={dietaryNeedsCount}
          icon="edit"
          isLoading={isLoading}
        />
        <StatCard
          title="Estado"
          value={event.status}
          icon="ticket"
          isLoading={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1"></div>
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-lg font-semibold text-white p-4 border-b border-white/10">
              Lista de Asistentes ({attendees.length})
            </h3>
            <div className="overflow-y-auto max-h-[400px]">
              <table className="w-full text-sm text-left text-white/80">
                <thead className="text-xs text-white/60 uppercase bg-white/5 sticky top-0">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Nombre
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Empresa
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Rol
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {attendees.map((attendee) => (
                    <tr key={attendee.id} className="hover:bg-white/5">
                      <td className="px-6 py-4 font-medium">{attendee.name}</td>
                      <td className="px-6 py-4">{attendee.company}</td>
                      <td className="px-6 py-4">{attendee.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {attendees.length === 0 && (
                <div className="text-center py-10 text-white/50">
                  No hay asistentes registrados para este evento.
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
