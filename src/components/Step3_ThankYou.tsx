"use client";
import Image from "next/image";

export default function Step3_ThankYou() {
  return (
    <div>
      <h1 className="lg:text-[80px] text-5xl md:text-6xl font-semibold text-white mb-8 w-full leading-tight">
        <span className="text-7xl md:text-9xl font-medium font-bright-clones">
          Listo!
        </span>{" "}
        Te esperamos <br /> para disfrutar <i>juntos</i>.
      </h1>
      {/* Info Bubbles */}
      <div className="flex flex-col md:flex-row lg:items-center gap-4 mb-12 md:mb-8">
        <div className="flex-1 inline-flex max-w-max items-center justify-center gap-3 py-4 px-8 rounded-2xl shadow-xl text-base font-semibold text-white bg-white/20 backdrop-blur-md border border-white/30">
          <Image
            src="/calendario-blanco.svg"
            alt="Calendar Icon"
            width={40}
            height={40}
            className="size-12"
          />
          <span>25 de Septiembre</span>
        </div>
        <div className="flex-1 inline-flex max-w-max items-center justify-center gap-3 py-4 px-8 rounded-2xl shadow-xl text-base font-semibold text-white bg-white/20 backdrop-blur-md border border-white/30">
          <Image
            src="/reloj-blanco.svg"
            alt="Time Icon"
            width={40}
            height={40}
            className="size-12"
          />
          <span>De 18.30 a 22.30 hs</span>
        </div>
        <a href="https://www.google.com/maps/place/Santos+Dumont+4080,+C1427EIN+Cdad.+Aut%C3%B3noma+de+Buenos+Aires/@-34.5889014,-58.4525789,17z">
          <div className="flex-1 inline-flex max-w-max items-center justify-center gap-3 py-4 px-8 rounded-2xl shadow-xl text-base font-semibold text-white bg-white/20 backdrop-blur-md border border-white/30">
            <Image
              src="/ubicacion-blanco.svg"
              alt="Location Icon"
              width={40}
              height={40}
              className="size-12"
            />
            <span>Santos Dumont 4080</span>
          </div>
        </a>
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
          <span className="italic font-normal font-bright-clones text-2xl">
            imaginamos.
          </span>
        </p>
      </div>
    </div>
  );
}
