"use client"
import React, { useState, useMemo } from "react";
import { Button } from "./ui/Button";
import { Icon } from "./ui/Icon";
import { Card } from "./ui/Card";
import { Event } from "@/lib/types";

interface EventsPageProps {
  events: Event[];
  isLoading: boolean;
  onEdit: (event: Event | null) => void;
  onDelete: (eventId: number) => void;
  onViewDetails: (eventId: number) => void;
}

export const EventsPage = ({ events, isLoading, onEdit, onDelete, onViewDetails }: EventsPageProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch = event.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || event.status === statusFilter;
      const matchesDate =
        !dateFilter ||
        new Date(event.date).toISOString().slice(0, 10) === dateFilter;
      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [events, searchTerm, statusFilter, dateFilter]);

  const getStatusClass = (status: string) =>
    ({
      UPCOMING: "bg-[#4BC3FE]/20 text-[#4BC3FE]",
      COMPLETED: "bg-green-500/20 text-green-400",
      PLANNING: "bg-yellow-500/20 text-yellow-400",
      CANCELED: "bg-red-500/20 text-red-400",
    })[status] || "bg-gray-500/20 text-gray-400";

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <h2 className="text-3xl font-bold text-white">Eventos</h2>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-48 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-[#4BC3FE] outline-none"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-auto px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-[#4BC3FE] outline-none"
          >
            <option value="all">Todos los Estados</option>
            <option value="UPCOMING">Próximo</option>
            <option value="COMPLETED">Completado</option>
            <option value="PLANNING">Planeando</option>
            <option value="CANCELED">Cancelado</option>
          </select>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full md:w-auto px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-[#4BC3FE] outline-none"
          />
          <Button onClick={() => onEdit(null)} className="gap-2 px-4 py-2">
            <Icon name="plusCircle" className="w-5 h-5" />
            Crear Evento
          </Button>
        </div>
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-white/80">
            <thead className="text-xs text-white/60 uppercase bg-white/5">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nombre del Evento
                </th>
                <th scope="col" className="px-6 py-3">
                  Fecha
                </th>
                <th scope="col" className="px-6 py-3">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3">
                  Asistentes
                </th>
                <th scope="col" className="px-6 py-3 text-right">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading &&
                Array.from({ length: 4 }).map((_, i) => (
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
                    <td className="px-6 py-4"></td>
                  </tr>
                ))}
              {!isLoading &&
                filteredEvents.map((event) => (
                  <tr
                    key={event.id}
                    className="border-b border-white/10 hover:bg-white/5"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-semibold text-white whitespace-nowrap"
                    >
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          onViewDetails(event.id);
                        }}
                        className="hover:text-[#4BC3FE] transition-colors"
                      >
                        {event.name}
                      </a>
                    </th>
                    <td className="px-6 py-4">
                      {new Date(event.date).toLocaleDateString("es-AR")}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(event.status)}`}
                      >
                        {event.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {event.attendees.length} / {event.capacity}
                    </td>
                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        onClick={() => onEdit(event)}
                        className="p-2 rounded-full"
                      >
                        <Icon name="edit" className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => onDelete(event.id)}
                        className="p-2 rounded-full text-[#FE4D17]/80 hover:text-[#FE4D17] hover:bg-[#FE4D17]/10"
                      >
                        <Icon name="trash" className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
