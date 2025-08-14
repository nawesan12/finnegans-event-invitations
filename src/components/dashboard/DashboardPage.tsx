"use client"
import React from "react";
import dynamic from "next/dynamic";
import { StatCard } from "./StatCard";
import { UpcomingEventsAgenda } from "./UpcomingEventsAgenda";
import { Card } from "./ui/Card";
import { Icon } from "./ui/Icon";
import { Event, Attendee } from "@/lib/types";
import { RegistrationsChart } from "./RegistrationsChart";

interface DashboardPageProps {
  events: Event[];
  attendees: Attendee[];
  isLoading: boolean;
  onViewDetails: (eventId: number) => void;
}

export const DashboardPage = ({ events, attendees, isLoading, onViewDetails }: DashboardPageProps) => {

  const DynamicRegistrationsChart = dynamic(
    () => Promise.resolve(RegistrationsChart),
    {
      ssr: false,
      loading: () => (
        <Card className="p-4 h-80 flex items-center justify-center">
          <div className="animate-spin">
            <Icon name="loader" />
          </div>
        </Card>
      ),
    },
  );

  const upcomingEventsCount = events.filter(
    (e) => e.status === "UPCOMING",
  ).length;

  const dietaryNeedsCount = attendees.filter((a) => a.dietaryNeeds).length;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold text-white">Panel de Control</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          title="Eventos Totales"
          value={events.length}
          icon="calendar"
          isLoading={isLoading}
        />
        <StatCard
          title="Asistentes Totales"
          value={attendees.length}
          icon="users"
          isLoading={isLoading}
        />
        <StatCard
          title="Eventos Próximos"
          value={upcomingEventsCount}
          icon="ticket"
          isLoading={isLoading}
        />
        <StatCard
          title="Capacidad Promedio"
          value={Math.round(
            events.reduce((sum, e) => sum + e.capacity, 0) /
              (events.length || 1),
          )}
          icon="barChart"
          isLoading={isLoading}
        />
        <StatCard
          title="Necesidades Dietéticas"
          value={dietaryNeedsCount}
          icon="edit"
          isLoading={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DynamicRegistrationsChart
            attendees={attendees}
            isLoading={isLoading}
          />
        </div>
        <div>
          <UpcomingEventsAgenda
            events={events}
            isLoading={isLoading}
            onViewDetails={onViewDetails}
          />
        </div>
      </div>
    </div>
  );
};
