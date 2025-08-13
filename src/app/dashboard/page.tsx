"use client";
import React, { useState, useMemo } from "react";

const mockEvents = [
  {
    id: 1,
    name: "Finnegans Summit 2025",
    date: "2025-09-25",
    location: "Santos Dumont 4080",
    status: "Upcoming",
    attendees: 120,
    capacity: 200,
  },
  {
    id: 2,
    name: "Q3 Tech Workshop",
    date: "2025-07-15",
    location: "Online",
    status: "Completed",
    attendees: 85,
    capacity: 100,
  },
  {
    id: 3,
    name: "Annual Company Retreat",
    date: "2025-11-01",
    location: "Mountain Resort",
    status: "Upcoming",
    attendees: 0,
    capacity: 150,
  },
  {
    id: 4,
    name: "Product Launch: Phoenix",
    date: "2025-06-05",
    location: "Convention Center",
    status: "Completed",
    attendees: 250,
    capacity: 300,
  },
  {
    id: 5,
    name: "New Year Celebration",
    date: "2026-01-02",
    location: "Main Office",
    status: "Planning",
    attendees: 0,
    capacity: 250,
  },
];

const mockAttendees = [
  {
    id: 101,
    eventId: 1,
    name: "Elena Rodriguez",
    email: "elena.r@example.com",
    company: "Tech Solutions Inc.",
    role: "Project Manager",
    diet: "None",
  },
  {
    id: 102,
    eventId: 1,
    name: "Benjamin Carter",
    email: "ben.c@example.com",
    company: "Innovate LLC",
    role: "Lead Developer",
    diet: "Vegetarian",
  },
  {
    id: 103,
    eventId: 2,
    name: "Chloe Kim",
    email: "chloe.k@example.com",
    company: "Data Insights",
    role: "Data Analyst",
    diet: "None",
  },
  {
    id: 104,
    eventId: 1,
    name: "David Chen",
    email: "david.c@example.com",
    company: "CloudNet",
    role: "Systems Engineer",
    diet: "Gluten-Free",
  },
  {
    id: 105,
    eventId: 4,
    name: "Sophia Williams",
    email: "sophia.w@example.com",
    company: "Marketing Masters",
    role: "Marketing Director",
    diet: "Vegan",
  },
  {
    id: 106,
    eventId: 2,
    name: "Liam O'Connell",
    email: "liam.o@example.com",
    company: "Innovate LLC",
    role: "UX Designer",
    diet: "None",
  },
  {
    id: 107,
    eventId: 1,
    name: "Isabella Rossi",
    email: "isabella.r@example.com",
    company: "Tech Solutions Inc.",
    role: "Software Engineer",
    diet: "None",
  },
];

const Icon = ({
  name,
  className = "w-6 h-6",
}: {
  name: string;
  className?: string;
}) => {
  const icons = {
    layoutDashboard: (
      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    ),
    calendar: (
      <path d="M8 2v4m8-4v4M3 10h18M5 6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6z" />
    ),
    users: (
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
    ),
    settings: (
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
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
    arrowUpRight: <path d="M7 17V7h10" />,
    ticket: (
      <path d="M2 9a3 3 0 0 1 0 6v1a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-1a3 3 0 0 1 0-6V8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
    ),
    barChart: <path d="M3 3v18h18M18 17V7M13 17V3M8 17v-4" />,
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
      {/*@ts-expect-error bla*/}
      {icons[name as string] || <circle cx="12" cy="12" r="10" />}
    </svg>
  );
};

// --- UI COMPONENTS ---
const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm ${className}`}
  >
    {children}
  </div>
);

const StatCard = ({
  title,
  value,
  icon,
  change,
}: {
  title: string;
  value: string;
  icon: string;
  change?: string;
}) => (
  <Card>
    <div className="p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </h3>
        <Icon
          name={icon}
          className="w-5 h-5 text-gray-400 dark:text-gray-500"
        />
      </div>
      <div className="flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
          {value}
        </p>
        {change && (
          <span
            className={`ml-2 text-sm font-medium flex items-center ${change.startsWith("+") ? "text-green-500" : "text-red-500"}`}
          >
            <Icon
              name="arrowUpRight"
              className={`w-4 h-4 ${!change.startsWith("+") && "transform rotate-90"}`}
            />
            {change}
          </span>
        )}
      </div>
    </div>
  </Card>
);

const Button = ({
  children,
  onClick,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: string;
  className?: string;
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline:
      "border border-gray-300 dark:border-gray-600 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-gray-500",
    ghost: "hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-gray-500",
  };
  return (
    <button
      onClick={onClick} //@ts-expect-error bla
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
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
    { name: "Dashboard", icon: "layoutDashboard" },
    { name: "Events", icon: "calendar" },
    { name: "Attendees", icon: "users" },
    { name: "Settings", icon: "settings" },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-700">
        <Icon name="ticket" className="w-8 h-8 text-blue-600" />
        <h1 className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
          EventFlow
        </h1>
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
            className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
              activePage === item.name
                ? "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-white"
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            <Icon name={item.icon} className="w-5 h-5 mr-3" />
            {item.name}
          </a>
        ))}
      </nav>
    </aside>
  );
};

const Header = ({
  setActivePage,
}: {
  setActivePage: (page: string) => void;
}) => (
  <header className="h-16 flex items-center justify-between bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6">
    <div className="flex items-center">
      {/* Search Bar */}
      <div className="relative">
        <Icon
          name="search"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search..."
          className="w-full md:w-64 pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border-transparent focus:bg-white dark:focus:bg-gray-800 focus:border-blue-500 focus:ring-blue-500 transition"
        />
      </div>
    </div>
    <div className="flex items-center gap-4">
      {/*@ts-expect-error bla*/}
      <Button variant="ghost" className="relative p-2 rounded-full">
        <Icon name="bell" className="w-5 h-5" />
        <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800"></span>
      </Button>
      <div className="flex items-center gap-3">
        <img
          src="https://placehold.co/40x40/6366f1/ffffff?text=A"
          alt="Admin"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            Admin User
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            admin@eventflow.com
          </p>
        </div>
        {/*@ts-expect-error bla*/}
        <Button variant="ghost" className="p-2 rounded-full">
          <Icon name="chevronDown" className="w-5 h-5" />
        </Button>
      </div>
    </div>
  </header>
);

// --- PAGE COMPONENTS ---
const DashboardPage = () => {
  // In a real app, you'd calculate these stats
  const totalAttendees = mockAttendees.length;
  const upcomingEvents = mockEvents.filter(
    (e) => e.status === "Upcoming",
  ).length;
  const attendanceRate = 82; // Mock data

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Dashboard
      </h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Events"
          value={String(mockEvents.length)}
          icon="calendar"
          change="+2 this month"
        />
        <StatCard
          title="Total Attendees"
          value={String(totalAttendees)}
          icon="users"
          change="+50 this month"
        />
        <StatCard
          title="Upcoming Events"
          value={String(upcomingEvents)}
          icon="ticket"
        />
        <StatCard
          title="Attendance Rate"
          value={`${attendanceRate}%`}
          icon="barChart"
          change="-1.2%"
        />
      </div>

      {/* Recent Activity & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="p-4 border-b dark:border-gray-700">
            <h3 className="text-lg font-semibold">Recent Registrations</h3>
          </div>
          <div className="p-4">
            <ul className="space-y-4">
              {mockAttendees.slice(0, 4).map((attendee) => (
                <li
                  key={attendee.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://placehold.co/32x32/c7d2fe/4338ca?text=${attendee.name.charAt(0)}`}
                      alt={attendee.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium">{attendee.name}</p>
                      <p className="text-xs text-gray-500">{attendee.email}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {mockEvents.find((e) => e.id === attendee.eventId)?.name}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Card>
        <Card>
          <div className="p-4 border-b dark:border-gray-700">
            <h3 className="text-lg font-semibold">Event Status</h3>
          </div>
          <div className="p-4">
            {/* Placeholder for a chart */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Upcoming</span>
                <div className="w-1/2 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: "40%" }}
                  ></div>
                </div>
                <span className="text-sm font-semibold">2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Completed</span>
                <div className="w-1/2 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{ width: "40%" }}
                  ></div>
                </div>
                <span className="text-sm font-semibold">2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Planning</span>
                <div className="w-1/2 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-yellow-400 h-2.5 rounded-full"
                    style={{ width: "20%" }}
                  ></div>
                </div>
                <span className="text-sm font-semibold">1</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

const EventsPage = () => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300";
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300";
      case "Planning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Events
        </h2>
        {/*@ts-expect-error bla*/}
        <Button className="gap-2 px-4 py-2">
          <Icon name="plusCircle" className="w-5 h-5" />
          Create Event
        </Button>
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Event Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Attendees
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {mockEvents.map((event) => (
                <tr
                  key={event.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {event.name}
                  </th>
                  <td className="px-6 py-4">{event.date}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(event.status)}`}
                    >
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {event.attendees} / {event.capacity}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {/*@ts-expect-error bla*/}
                    <Button variant="ghost" className="p-2 rounded-full">
                      <Icon name="moreHorizontal" className="w-5 h-5" />
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

const AttendeesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAttendees = useMemo(
    () =>
      mockAttendees.filter(
        (attendee) =>
          attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          attendee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          attendee.company.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [searchTerm],
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Attendees
        </h2>
        <div className="relative">
          <Icon
            name="search"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search attendees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border-transparent focus:bg-white dark:focus:bg-gray-800 focus:border-blue-500 focus:ring-blue-500 transition"
          />
        </div>
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Company
                </th>
                <th scope="col" className="px-6 py-3">
                  Event
                </th>
                <th scope="col" className="px-6 py-3">
                  Dietary Needs
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendees.map((attendee) => (
                <tr
                  key={attendee.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://placehold.co/32x32/c7d2fe/4338ca?text=${attendee.name.charAt(0)}`}
                        alt={attendee.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-semibold">{attendee.name}</p>
                        <p className="text-xs text-gray-500">
                          {attendee.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{attendee.company}</td>
                  <td className="px-6 py-4">
                    {mockEvents.find((e) => e.id === attendee.eventId)?.name}
                  </td>
                  <td className="px-6 py-4">
                    {attendee.diet !== "None" ? (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300">
                        {attendee.diet}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {/*@ts-expect-error bla*/}
                    <Button variant="ghost" className="p-2 rounded-full">
                      <Icon name="moreHorizontal" className="w-5 h-5" />
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

const SettingsPage = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
      Settings
    </h2>
    <Card className="mt-6 p-6">
      <p>
        Settings page content goes here. You could manage user profiles,
        notifications, integrations, and more.
      </p>
    </Card>
  </div>
);

// --- MAIN APP COMPONENT ---
export default function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const renderActivePage = () => {
    switch (activePage) {
      case "Dashboard":
        return <DashboardPage />;
      case "Events":
        return <EventsPage />;
      case "Attendees":
        return <AttendeesPage />;
      case "Settings":
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setActivePage={setActivePage} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {renderActivePage()}
        </main>
      </div>
    </div>
  );
}
