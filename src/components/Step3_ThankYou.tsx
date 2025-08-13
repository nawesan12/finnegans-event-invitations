"use client";
import Image from "next/image";

export default function Step3_ThankYou() {
  return (
    <div>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white mb-12 text-shadow w-full leading-tight">
        <span className="text-6xl sm:text-7xl md:text-8xl font-semibold font-cursive">
          Listo!
        </span>{" "}
        Te esperamos <br /> para disfrutar juntos.
      </h1>
      {/* Info Bubbles */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-12 md:mb-20 w-full">
        <div className="flex-1 inline-flex items-center justify-center gap-3 py-4 px-6 rounded-full text-base font-semibold text-white bg-white/20 backdrop-blur-md border border-white/30">
          <Image
            src="/calendario-blanco.svg"
            alt="Calendar Icon"
            width={40}
            height={40}
          />
          <span>25 de Septiembre</span>
        </div>
        <div className="flex-1 inline-flex items-center justify-center gap-3 py-4 px-6 rounded-full text-base font-semibold text-white bg-white/20 backdrop-blur-md border border-white/30">
          <Image
            src="/reloj-blanco.svg"
            alt="Time Icon"
            width={40}
            height={40}
          />
          <span>De 18.30 a 22.30 hs</span>
        </div>
        <div className="flex-1 inline-flex items-center justify-center gap-3 py-4 px-6 rounded-full text-base font-semibold text-white bg-white/20 backdrop-blur-md border border-white/30">
          <Image
            src="/ubicacion-blanco.svg"
            alt="Location Icon"
            width={40}
            height={40}
          />
          <span>Santos Dumont 4080</span>
        </div>
      </div>
      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-4">
        <Image
          src="/finnegans-2.svg"
          alt="Finnegans Logo"
          width={400}
          height={200}
          className="aspect-auto h-16 mx-0 px-0 max-w-max"
        />
        <p className="text-white/90 text-lg font-semibold text-center sm:text-right whitespace-nowrap">
          Te acompañamos al futuro que{" "}
          <span className="italic font-cursive text-xl">imaginamos.</span>
        </p>
      </div>
    </div>
  );
}
