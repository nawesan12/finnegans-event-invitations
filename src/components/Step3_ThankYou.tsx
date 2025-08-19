"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Step3_ThankYou() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="lg:text-[80px] text-left px-6 lg:px-0 text-5xl md:text-6xl font-semibold text-white mb-14 w-full leading-[52px] md:leading-12"
      >
        <span className="text-8xl md:text-9xl font-medium font-bright-clones relative top-4 md:top-3">
          Listo!
        </span>{" "}
        <br className="md:hidden block" />
        Te esperamos <br /> para disfrutar <i>juntos</i>.
      </motion.h1>

      {/* Info Bubbles */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-12 md:mb-8 w-full"
      >
        {[
          {
            src: "/pantalla3/fecha-mobile.png",
            alt: "Calendar Icon",
            href: "https://www.google.com/calendar/render?action=TEMPLATE&text=Evento+Finnegans&dates=20250925T213000Z/20250925T253000Z&details=Finnegans&location=Santos+Dumont+4080",
          },
          { src: "/pantalla3/reloj-mobile.png", alt: "Time Icon", href: null },
          {
            src: "/pantalla3/ubicacion-mobile.png",
            alt: "Location Icon",
            href: "https://www.google.com/maps/place/Santos+Dumont+4080,+C1427EIN+Cdad.+Aut%C3%B3noma+de+Buenos+Aires/@-34.5889014,-58.4525789,17z",
          },
        ].map((item, i) => {
          const content = (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              className="w-full relative overflow-hidden aspect-square max-h-24"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-contain rounded-3xl overflow-hidden"
              />
            </motion.div>
          );
          return item.href ? (
            <a key={i} target="_blank" href={item.href}>
              {content}
            </a>
          ) : (
            content
          );
        })}
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="flex flex-row justify-between items-center w-full gap-2 px-6 lg:px-0"
      >
        <Image
          src="/finnegans.svg"
          alt="Finnegans Logo"
          width={400}
          height={200}
          className="aspect-auto h-5 lg:h-8 mx-0 px-0 max-w-max"
        />

        <div className="relative group inline-flex">
          <Image
            src="/finnegans-2.svg"
            alt="Finnegans Logo"
            width={400}
            height={200}
            className="aspect-auto h-8 lg:h-16 mx-0 px-0 max-w-max"
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
      </motion.div>
    </motion.div>
  );
}
