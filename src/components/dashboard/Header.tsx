import React from "react";
import Image from "next/image";
import { Button } from "./ui/Button";
import { Icon } from "./ui/Icon";

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => (
  <header className="h-16 flex items-center justify-between bg-[#04102D]/50 backdrop-blur-lg border-b border-white/10 px-6">
    <div className="md:hidden">
      <Button variant="ghost" onClick={onMenuClick} className="p-2 rounded-full">
        <Icon name="menu" className="w-6 h-6" />
      </Button>
    </div>
    <div className="flex flex-1 items-center justify-end gap-4">
      <Button variant="ghost" className="relative p-2 rounded-full">
        <Icon name="bell" className="w-5 h-5" />
        <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-[#FE4D17] ring-2 ring-[#04102D]"></span>
      </Button>
      <div className="flex items-center gap-3">
        <Image
          src="https://placehold.co/40x40/8694FF/FFFFFF?text=A"
          alt="Admin"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <p className="text-sm font-semibold text-white">Admin</p>
          <p className="text-xs text-white/60">Admin de eventos</p>
        </div>
      </div>
    </div>
  </header>
);
