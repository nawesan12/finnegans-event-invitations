"use client";
import Image from "next/image";

export default function InfoSidebar() {
  const items = [
    { icon: "/ubicacion-color.svg", label: "25 de Septiembre" },
    { icon: "/reloj-color.svg", label: "18:30hs" },
    { icon: "/ubicacion-color.svg", label: "Santos Dumont 4080" },
  ];

  return (
    <div className="hidden md:flex items-center relative h-full">
      <aside className="relative flex flex-col gap-6 z-20 justify-center h-full">
        {items.map((item, index) => (
          <div key={index} className="group relative">
            <div className="w-28 h-28 flex items-center justify-center rounded-2xl bg-white/10 text-cyan-400 backdrop-blur-md border border-white/30 transition-all transform group-hover:scale-110">
              <Image
                src={item.icon}
                alt={`${item.label} icon`}
                width={60}
                height={60}
              />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 px-4 py-2 rounded-lg bg-white shadow-lg text-gray-800 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {item.label}
            </div>
          </div>
        ))}
      </aside>
    </div>
  );
}
