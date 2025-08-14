"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Event, Attendee } from "@/lib/types";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { EventModal } from "@/components/dashboard/EventModal";
import { DashboardPage } from "@/components/dashboard/DashboardPage";
import { EventsPage } from "@/components/dashboard/EventsPage";
import { AttendeesPage } from "@/components/dashboard/AttendeesPage";
import { EventDetailsPage } from "@/components/dashboard/EventDetailsPage";
import { Card } from "@/components/dashboard/ui/Card";
import { Button } from "@/components/dashboard/ui/Button";

export default function App() {
  const [activePage, setActivePage] = useState("Panel");
  const [events, setEvents] = useState<Event[]>([]);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<Event | null>(null);
  const [viewingEventId, setViewingEventId] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const MOCK_USER = "finnegansadmin";
    const MOCK_PASS = "XLR8FN";

    if (username === MOCK_USER && password === MOCK_PASS) {
      setIsAuthenticated(true);
      setLoginError(null);
      fetchData();
    } else {
      setLoginError("Invalid username or password");
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [eventsRes, attendeesRes] = await Promise.all([
        fetch("/api/events"),
        fetch("/api/attendees"),
      ]);
      if (!eventsRes.ok || !attendeesRes.ok)
        throw new Error("Falló la carga de datos");
      const eventsData = await eventsRes.json();
      const attendeesData = await attendeesRes.json();
      setEvents(eventsData);
      setAttendees(attendeesData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ocurrió un error desconocido",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setViewingEventId(null);
  }, [activePage]);

  const handleOpenModal = (event: Event | null) => {
    setEventToEdit(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEventToEdit(null);
  };

  const handleSaveEvent = async (
    eventData: Omit<Event, "id" | "attendees">,
  ) => {
    const method = eventToEdit ? "PATCH" : "POST";
    const url = eventToEdit
      ? `/api/events?id=${eventToEdit.id}`
      : "/api/events";
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) throw new Error("No se pudo guardar el evento");
      await fetchData();
      handleCloseModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    }
  };

  const handleDeleteEvent = async (eventId: number) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este evento?")) {
      try {
        const response = await fetch(`/api/events/${eventId}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("No se pudo eliminar el evento");
        await fetchData();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al eliminar");
      }
    }
  };

  const handleViewEventDetails = (eventId: number) => {
    setViewingEventId(eventId);
  };

  const handleBackToEventsList = () => {
    setViewingEventId(null);
  };

  const renderActivePage = () => {
    if (error) return <div className="p-6 text-[#FE4D17]">Error: {error}</div>;
    switch (activePage) {
      case "Panel":
        return (
          <DashboardPage
            events={events}
            attendees={attendees}
            isLoading={isLoading}
            onViewDetails={handleViewEventDetails}
          />
        );
      case "Eventos":
        if (viewingEventId) {
          const event = events.find((e) => e.id === viewingEventId);
          const eventAttendees = attendees.filter(
            (a) => a.eventId === viewingEventId,
          );
          return (
            <EventDetailsPage
              event={event}
              attendees={eventAttendees}
              isLoading={isLoading}
              onBack={handleBackToEventsList}
              onEdit={handleOpenModal}
            />
          );
        }
        return (
          <EventsPage
            events={events}
            isLoading={isLoading}
            onEdit={handleOpenModal}
            onDelete={handleDeleteEvent}
            onViewDetails={handleViewEventDetails}
          />
        );
      case "Asistentes":
        return (
          <AttendeesPage
            events={events}
            attendees={attendees}
            isLoading={isLoading}
          />
        );
      default:
        return (
          <DashboardPage
            events={events}
            attendees={attendees}
            isLoading={isLoading}
            onViewDetails={handleViewEventDetails}
          />
        );
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen bg-[#04102D] text-white font-sans items-center justify-center">
        <Card className="w-full max-w-sm border-white/20 p-8">
          <div className="text-center mb-8">
            <Image
              src="/finnegans.svg"
              alt="Logo"
              width={170}
              height={170}
              className="mx-auto"
            />
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-white/80 mb-2"
              >
                Usuario
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-white/10 border-white/20 rounded-lg p-3 focus:ring-2 focus:ring-[#4BC3FE] outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white/80 mb-2"
              >
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/10 border-white/20 rounded-lg p-3 focus:ring-2 focus:ring-[#4BC3FE] outline-none"
              />
            </div>
            {loginError && (
              <p className="text-sm text-[#FE4D17]">{loginError}</p>
            )}
            <div className="pt-2">
              <Button type="submit" className="w-full py-3">
                Login
              </Button>
            </div>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#04102D] text-white font-sans">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-cover bg-center">
          {renderActivePage()}
        </main>
      </div>
      <EventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveEvent}
        eventToEdit={eventToEdit}
      />
    </div>
  );
}
