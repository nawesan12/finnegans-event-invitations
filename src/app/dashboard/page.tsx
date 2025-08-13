"use client";

import { PieChart } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useState, useEffect, useMemo } from "react";
// In a real project, you would install and import from recharts
// npm install recharts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Pie,
  Cell,
} from "recharts";

// --- DEFINICIONES DE TIPOS (coinciden con el esquema de Prisma) ---
interface Attendee {
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

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  status: "UPCOMING" | "COMPLETED" | "PLANNING" | "CANCELED";
  capacity: number;
  attendees: Attendee[];
}

// --- ICONOS Y COMPONENTES DE UI REUTILIZABLES ---
const Icon = ({
  name,
  className = "w-6 h-6",
}: {
  name: string;
  className?: string;
}) => {
  const icons: { [key: string]: React.ReactNode } = {
    layoutDashboard: (
      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    ),
    calendar: (
      <path d="M8 2v4m8-4v4M3 10h18M5 6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6z" />
    ),
    users: (
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
    ),
    search: <path d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />,
    bell: (
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
    ),
    plusCircle: (
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm1-13h-2v4H7v2h4v4h2v-4h4v-2h-4z" />
    ),
    chevronDown: <path d="m6 9 6 6 6-6" />,
    moreHorizontal: <path d="M6 12h.01M12 12h.01M18 12h.01" />,
    ticket: (
      <path d="M2 9a3 3 0 0 1 0 6v1a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-1a3 3 0 0 1 0-6V8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
    ),
    barChart: <path d="M3 3v18h18M18 17V7M13 17V3M8 17v-4" />,
    x: <path d="M18 6 6 18M6 6l12 12" />,
    edit: (
      <>
        {" "}
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </>
    ),
    trash: (
      <path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    ),
    arrowLeft: <path d="m12 19-7-7 7-7m-7 7h18" />,
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {icons[name] || <circle cx="12" cy="12" r="10" />}
    </svg>
  );
};
const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white/5 dark:bg-[#FFFFFF]/5 border border-white/10 rounded-xl shadow-lg backdrop-blur-sm ${className}`}
  >
    {children}
  </div>
);
const Button = ({
  children,
  onClick,
  variant = "default",
  className = "",
  disabled = false,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: string;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#04102D] disabled:opacity-50 disabled:cursor-not-allowed";
  const variants: { [key: string]: string } = {
    default:
      "bg-[#4BC3FE] text-[#04102D] hover:bg-[#8694FF] focus:ring-[#4BC3FE]",
    danger: "bg-[#FE4D17] text-white hover:bg-red-700 focus:ring-[#FE4D17]",
    ghost:
      "hover:bg-white/10 text-white/80 hover:text-white focus:ring-white/20",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// --- MODAL COMPONENT ---
const EventModal = ({
  isOpen,
  onClose,
  onSave,
  eventToEdit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<Event, "id" | "attendees">) => void;
  eventToEdit: Event | null;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: "",
    capacity: "100",
    status: "PLANNING",
  });

  useEffect(() => {
    if (eventToEdit) {
      setFormData({
        name: eventToEdit.name,
        date: new Date(eventToEdit.date).toISOString().substring(0, 10),
        location: eventToEdit.location,
        capacity: String(eventToEdit.capacity),
        status: eventToEdit.status,
      });
    } else {
      setFormData({
        name: "",
        date: "",
        location: "",
        capacity: "100",
        status: "PLANNING",
      });
    }
  }, [eventToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); //@ts-expect-error bla
    onSave({ ...formData, capacity: parseInt(formData.capacity) });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-lg border-white/20">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="text-lg font-bold text-white">
            {eventToEdit ? "Editar Evento" : "Crear Nuevo Evento"}
          </h3>
          <Button
            variant="ghost"
            onClick={onClose}
            className="p-1 rounded-full"
          >
            <Icon name="x" />
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white/80 mb-1"
            >
              Nombre del Evento
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-white/10 border-white/20 rounded-lg p-2 focus:ring-2 focus:ring-[#4BC3FE] outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-white/80 mb-1"
              >
                Fecha
              </label>
              <input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full bg-white/10 border-white/20 rounded-lg p-2 focus:ring-2 focus:ring-[#4BC3FE] outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="capacity"
                className="block text-sm font-medium text-white/80 mb-1"
              >
                Capacidad
              </label>
              <input
                type="number"
                name="capacity"
                id="capacity"
                value={formData.capacity}
                onChange={handleChange}
                required
                className="w-full bg-white/10 border-white/20 rounded-lg p-2 focus:ring-2 focus:ring-[#4BC3FE] outline-none"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-white/80 mb-1"
            >
              Ubicación
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full bg-white/10 border-white/20 rounded-lg p-2 focus:ring-2 focus:ring-[#4BC3FE] outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-white/80 mb-1"
            >
              Estado
            </label>
            <select
              name="status"
              id="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-white/10 border-white/20 rounded-lg p-2 focus:ring-2 focus:ring-[#4BC3FE] outline-none"
            >
              <option value="PLANNING">Planeando</option>
              <option value="UPCOMING">Próximo</option>
              <option value="COMPLETED">Completado</option>
              <option value="CANCELED">Cancelado</option>
            </select>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="px-6 py-2">
              Guardar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

// --- LAYOUT COMPONENTS ---
const Sidebar = ({
  activePage,
  setActivePage,
}: {
  activePage: string;
  setActivePage: (page: string) => void;
}) => {
  const navItems = [
    { name: "Panel", icon: "layoutDashboard" },
    { name: "Eventos", icon: "calendar" },
    { name: "Asistentes", icon: "users" },
  ];
  return (
    <aside className="hidden md:flex flex-col w-64 bg-[#04102D] border-r border-white/10">
      <div className="h-16 flex items-center px-6">
        <Image
          src="/finnegans-blanco.png"
          alt="Logo"
          width={200}
          height={200}
        />
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <a
            key={item.name}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActivePage(item.name);
            }}
            className={`flex items-center px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors ${activePage === item.name ? "bg-[#4BC3FE]/20 text-[#8694FF]" : "text-white/70 hover:bg-white/5 hover:text-white"}`}
          >
            <Icon name={item.icon} className="w-5 h-5 mr-3" /> {item.name}
          </a>
        ))}
      </nav>
    </aside>
  );
};
const Header = () => (
  <header className="h-16 flex items-center justify-end bg-[#04102D]/50 backdrop-blur-lg border-b border-white/10 px-6">
    <div className="flex items-center gap-4">
      <Button variant="ghost" className="relative p-2 rounded-full">
        <Icon name="bell" className="w-5 h-5" />
        <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-[#FE4D17] ring-2 ring-[#04102D]"></span>
      </Button>
      <div className="flex items-center gap-3">
        <img
          src="https://placehold.co/40x40/8694FF/FFFFFF?text=A"
          alt="Admin"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="text-sm font-semibold text-white">Admin</p>
          <p className="text-xs text-white/60">Admin de eventos</p>
        </div>
      </div>
    </div>
  </header>
);

// --- DATA-DRIVEN PAGE COMPONENTS ---
const StatCard = ({
  title,
  value,
  icon,
  isLoading,
}: {
  title: string;
  value: string | number;
  icon: string;
  isLoading: boolean;
}) => (
  <Card>
    <div className="p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-white/60">{title}</h3>
        <Icon name={icon} className="w-5 h-5 text-white/40" />
      </div>
      {isLoading ? (
        <div className="h-8 w-20 bg-white/10 rounded-md animate-pulse"></div>
      ) : (
        <p className="text-3xl font-bold text-white">{value}</p>
      )}
    </div>
  </Card>
);

const RegistrationsChart = ({
  attendees,
  isLoading,
}: {
  attendees: Attendee[];
  isLoading: boolean;
}) => {
  const data = useMemo(() => {
    if (!attendees || attendees.length === 0) return [];
    const countsByDate = attendees.reduce(
      (acc, attendee) => {
        const date = new Date(attendee.createdAt).toLocaleDateString("es-ES", {
          month: "short",
          day: "numeric",
        });
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(countsByDate)
      .map(([date, count]) => ({ date, Asistentes: count }))
      .slice(-30); // Last 30 days
  }, [attendees]);

  if (isLoading)
    return (
      <Card className="p-4 h-80 flex items-center justify-center">
        <div className="animate-spin">
          <Icon name="loader" />
        </div>
      </Card>
    );

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold text-white mb-4">
        Registros por Día
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255, 255, 255, 0.1)"
          />
          <XAxis dataKey="date" stroke="rgba(255, 255, 255, 0.5)" />
          <YAxis stroke="rgba(255, 255, 255, 0.5)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#04102D",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="Asistentes"
            stroke="#4BC3FE"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 8, stroke: "#8694FF" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

const DashboardPage = ({
  events,
  attendees,
  isLoading,
  onViewDetails,
}: {
  events: Event[];
  attendees: Attendee[];
  isLoading: boolean;
  onViewDetails: (eventId: number) => void;
}) => {
  // FIX: Create dynamically imported, client-side-only versions of the chart components.
  // The loading component reuses the skeleton you already created.
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
        {/* StatCards remain the same */}
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
          {/* FIX: Use the dynamic component */}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          {/* FIX: Use the dynamic component */}
        </div>
        <div className="lg:col-span-2">
          {/* You could add another component here in the future! */}
        </div>
      </div>
    </div>
  );
};

const EventsPage = ({
  events,
  isLoading,
  onEdit,
  onDelete,
  onViewDetails,
}: {
  events: Event[];
  isLoading: boolean;
  onEdit: (event: Event) => void;
  onDelete: (eventId: number) => void;
  onViewDetails: (eventId: number) => void; // NEW: Prop to handle navigation
}) => {
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
          {/*@ts-expect-error bla*/}
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
                      {/* NEW: Clickable event name */}
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

const AttendeesPage = ({
  events,
  attendees,
  isLoading,
}: {
  events: Event[];
  attendees: Attendee[];
  isLoading: boolean;
}) => {
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
                        <img
                          src={`https://placehold.co/32x32/8694FF/FFFFFF?text=${attendee.name.charAt(0)}`}
                          alt={attendee.name}
                          className="w-8 h-8 rounded-full"
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
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// --- NEW: EVENT DETAILS PAGE ---
const EventDetailsPage = ({
  event,
  attendees,
  isLoading,
  onBack,
  onEdit,
}: {
  event: Event | undefined;
  attendees: Attendee[];
  isLoading: boolean;
  onBack: () => void;
  onEdit: (event: Event) => void;
}) => {
  if (isLoading || !event) {
    // Show a full-page skeleton while loading event data
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

// --- MAIN APP COMPONENT ---
export default function App() {
  const [activePage, setActivePage] = useState("Panel");
  const [events, setEvents] = useState<Event[]>([]);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<Event | null>(null);

  // NEW: State to manage which event detail page to show
  const [viewingEventId, setViewingEventId] = useState<number | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

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
    // This effect ensures that if we switch main pages (e.g., from Eventos to Panel),
    // we clear the detailed view.
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

  // NEW: Handlers for navigating to/from the details page
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
        // NEW: Conditional rendering for the event details view
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

  // If authenticated, render the full dashboard
  return (
    <div className="flex h-screen bg-[#04102D] text-white font-sans">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
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

const UpcomingEventsAgenda = ({
  events,
  isLoading,
  onViewDetails,
}: {
  events: Event[];
  isLoading: boolean;
  onViewDetails: (id: number) => void;
}) => {
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
