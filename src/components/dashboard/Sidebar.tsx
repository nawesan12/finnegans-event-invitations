import React from "react";
import Image from "next/image";
import { Button } from "./ui/Button";
import { Icon } from "./ui/Icon";

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

interface NavItemProps {
  activePage: string;
  item: { name: string; icon: string };
  setActivePage: (page: string) => void;
}

const NavItem = ({ activePage, item, setActivePage }: NavItemProps) => (
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
);

export const Sidebar = ({ activePage, setActivePage, isOpen, onClose }: SidebarProps) => {
  const navItems = [
    { name: "Panel", icon: "layoutDashboard" },
    { name: "Eventos", icon: "calendar" },
    { name: "Asistentes", icon: "users" },
  ];

  const sidebarContent = (
    <>
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <Image
          src="/finnegans-blanco.png"
          alt="Logo"
          width={150}
          height={40}
        />
         <Button variant="ghost" onClick={onClose} className="p-2 rounded-full md:hidden ml-auto">
            <Icon name="x" className="w-6 h-6" />
        </Button>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavItem key={item.name} activePage={activePage} item={item} setActivePage={setActivePage} />
        ))}
      </nav>
    </>
  );

  return (
    <>
      {/* Mobile Sidebar (Overlay) */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity md:hidden ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      ></div>
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#04102D] border-r border-white/10 z-50 transform transition-transform md:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {sidebarContent}
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#04102D] border-r border-white/10">
        {sidebarContent}
      </aside>
    </>
  );
};
