"use client";
import Image from "next/image";

export default function Step1_Invitation({
  onYes,
  onNo,
}: {
  onYes: () => void;
  onNo: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 lg:gap-2">
      <div className="inline-flex max-w-max items-center relative -left-2">
        <Image
          src="/logo-finnegans.svg"
          alt="Finnegans Logo"
          width={16}
          height={16}
          className="rounded-full h-[70px] w-auto"
        />
      </div>
      <h1 className="lg:text-[101px] text-5xl md:text-8xl font-semibold text-white lg:mb-10 text-shadow-xs text-left w-full">
        Comienza una <br /> nueva era ¿venís?
      </h1>
      <div className="flex items-center justify-center md:justify-start lg:gap-6">
        <button
          onClick={onYes}
          className="border-white/80 border-2 border-t-0 border-b-0 cursor-pointer font-semibold text-2xl py-3 px-6 rounded-full bg-white/40 backdrop-blur-md text-white shadow-lg"
        >
          Obvio que si!
        </button>
        <button
          onClick={onNo}
          className="border-white/80 border-2 border-t-0 border-b-0 cursor-pointer font-semibold text-2xl py-3 px-6 rounded-full bg-white/40 backdrop-blur-md text-white shadow-lg"
        >
          No puedo :(
        </button>
      </div>
    </div>
  );
}
