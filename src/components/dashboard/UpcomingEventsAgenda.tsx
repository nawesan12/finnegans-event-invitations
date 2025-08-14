"use client"
import React, { useMemo } from "react";
import { Card } from "./ui/Card";
import { Event } from "@/lib/types";

interface UpcomingEventsAgendaProps {
  events: Event[];
  isLoading: boolean;
  onViewDetails: (id: number) => void;
}

export const UpcomingEventsAgenda = ({ events, isLoading, onViewDetails }: UpcomingEventsAgendaProps) => {
  const upcomingEvents = useMemo(() => {
    return events
      .filter((event) => event.status === "UPCOMING")
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5); // Show the next 5
  }, [events]);

  if (isLoading) {
    return (
      <Card className="p-4 h-80">
        <div className="h-6 w-3/4 bg-white/10 rounded-md animate-pulse mb-4"></div>
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-10 bg-white/10 rounded-md animate-pulse"
            ></div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 h-full">
      <h3 className="text-lg font-semibold text-white mb-4">
        Próximos Eventos
      </h3>
      {upcomingEvents.length > 0 ? (
        <ul className="space-y-4">
          {upcomingEvents.map((event) => (
            <li
              key={event.id}
              className="flex items-center gap-4 p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <div className="flex-shrink-0 flex flex-col items-center justify-center w-12 h-12 bg-[#4BC3FE]/20 text-[#8694FF] rounded-lg">
                <span className="text-xs font-bold uppercase">
                  {new Date(event.date).toLocaleDateString("es-ES", {
                    month: "short",
                  })}
                </span>
                <span className="text-xl font-bold">
                  {new Date(event.date).getDate()}
                </span>
              </div>
              <div>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onViewDetails(event.id);
                  }}
                  className="hover:text-[#4BC3FE] transition-colors"
                >
                  <p className="font-semibold text-white">{event.name}</p>
                </a>
                <p className="text-xs text-white/60">{event.location}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex items-center justify-center h-full text-white/50">
          <p>No hay eventos próximos.</p>
        </div>
      )}
    </Card>
  );
};
