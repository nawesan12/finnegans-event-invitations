"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

type InfoSidebarProps = {
  horizontal?: boolean; // new prop
};

export default function InfoSidebar({ horizontal = false }: InfoSidebarProps) {
  const items = [
    {
      icon: "/calendario-color.svg",
      label: "14 de Noviembre \n Agregar al calendario",
      href: "https://www.google.com/calendar/render?action=TEMPLATE&text=Evento+Finnegans&dates=20251114T210000Z/20251115T010000Z&details=Finnegans&location=Santos+Dumont+4080",
    },
    { icon: "/reloj-color.svg", label: "18:00h", href: null },
    {
      icon: "/ubicacion-color.svg",
      label: "Santos Dumont 4080",
      href: null,
    },
  ];

  const IconBlock = ({
    icon,
    label,
    link,
  }: {
    icon: string;
    label: string;
    link: string | null;
  }) => {
    const [showLabel, setShowLabel] = useState(false);
    const lines = label.split("\n");

    return (
      <div
        className="group relative flex flex-col items-center"
        onClick={() => setShowLabel((prev) => !prev)}
      >
        <div className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center rounded-2xl bg-white/40 text-[#4bc3fe] backdrop-blur-md border border-white/30 transition-all">
          <a href={link ?? "#"} target={link ? "_blank" : ""}>
            <Image src={icon} alt={`${label} icon`} width={100} height={100} />
          </a>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 px-4 py-2 rounded-lg bg-white shadow-lg text-gray-800 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden text-center md:block">
          {lines.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>

        {/* Label debajo en mobile cuando se toca */}
        <div
          className={`mt-2 text-white font-semibold text-sm md:hidden transition-opacity ${
            showLabel ? "opacity-100" : "opacity-0"
          }`}
        >
          {lines.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      </div>
    );
  };

  return horizontal ? (
    // Horizontal row version for Step 1 (mobile)
    <div className="flex justify-around gap-6 mt-16 md:hidden">
      {items.map((item, index) => {
        const content = (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
          >
            <IconBlock icon={item.icon} label={item.label} link={item.href} />
          </motion.div>
        );

        return content;
      })}
    </div>
  ) : (
    // Original vertical sidebar for desktop
    <div className="hidden md:flex items-center relative -left-4 h-full">
      <aside className="relative flex flex-col gap-6 z-20 justify-center h-full">
        {items.map((item, index) => {
          const content = (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <IconBlock icon={item.icon} label={item.label} link={item.href} />
            </motion.div>
          );

          return <div key={index}>{content}</div>;
        })}
      </aside>
    </div>
  );
}
