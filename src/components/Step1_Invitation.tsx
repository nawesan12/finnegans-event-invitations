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
    <div className="flex flex-col gap-2">
      <div className="inline-flex max-w-max items-center gap-2 py-2 px-5 rounded-full text-base font-medium mb-8 bg-white/20 backdrop-blur-md border border-white/30 text-white">
        <Image
          src="/finnegans.svg"
          alt="Finnegans Logo"
          width={16}
          height={16}
          className="rounded-full h-4 w-auto"
        />
        <span></span>
      </div>
      <h1 className="text-6xl sm:text-6xl md:text-8xl font-semibold text-white mb-10 jtext-shadow-2xs w-full">
        Comienza una <br /> nueva era ¿venís?
      </h1>
      <div className="flex flex-wrap justify-center md:justify-start ">
        <button onClick={onYes} className="cursor-pointer relative lg:-left-4">
          <Image
            src="/boton obvio.svg"
            alt="Check Icon"
            width={24}
            height={24}
            className="rounded-full h-24 aspect-auto object-contain w-auto"
          />
        </button>
        <button onClick={onNo} className="cursor-pointer relative lg:-left-8">
          <Image
            src="/no puedo.svg"
            alt="Check Icon"
            width={24}
            height={24}
            className="rounded-full h-24 aspect-auto object-contain w-auto"
          />
        </button>
      </div>
    </div>
  );
}
