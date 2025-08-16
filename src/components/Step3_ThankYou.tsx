"use client";
import Image from "next/image";

export default function Step3_ThankYou() {
  return (
    <div>
      <h1 className="lg:text-[80px] text-5xl md:text-6xl font-semibold text-white mb-8 w-full leading-12">
        <span className="text-7xl md:text-9xl font-medium font-bright-clones relative top-3">
          Listo!
        </span>{" "}
        Te esperamos <br /> para disfrutar <i>juntos</i>.
      </h1>

      {/* Info Bubbles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-12 md:mb-8 w-full">
        <div className="w-full   relative overflow-hidden aspect-square max-h-24">
          <Image
            src="/final-fecha.png"
            alt="Calendar Icon"
            fill
            className="object-contain rounded-3xl shadow-xs overflow-hidden"
          />
        </div>

        <div className="w-full   relative overflow-hidden aspect-square max-h-24">
          <Image
            src="/final-hora.png"
            alt="Time Icon"
            fill
            className="object-contain rounded-3xl shadow-xs overflow-hidden"
          />
        </div>

        <a
          href="https://www.google.com/maps/place/Santos+Dumont+4080,+C1427EIN+Cdad.+Aut%C3%B3noma+de+Buenos+Aires/@-34.5889014,-58.4525789,17z"
          className="w-full   relative overflow-hidden aspect-square max-h-24"
        >
          <Image
            src="/final-ubi.png"
            alt="Location Icon"
            fill
            className="object-contain rounded-3xl shadow-xs overflow-hidden"
          />
        </a>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-4">
        <Image
          src="/finnegans.svg"
          alt="Finnegans Logo"
          width={400}
          height={200}
          className="aspect-auto h-8 mx-0 px-0 max-w-max lg:block hidden"
        />

        <div className="relative group inline-flex">
          <Image
            src="/finnegans-2.svg"
            alt="Finnegans Logo"
            width={400}
            height={200}
            className="aspect-auto h-16 mx-0 px-0 max-w-max "
          />

          {/* Overlay tooltip */}
          <div
            className="absolute inset-0 flex items-center justify-center
                          backdrop-blur-md bg-white/20 rounded-full border-2 border-white
                          text-white font-semibold text-xl px-4 py-1
                          opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
          >
            Sin spoilers!
          </div>
        </div>
      </div>
    </div>
  );
}
