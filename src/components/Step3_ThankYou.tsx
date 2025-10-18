"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Step3_ThankYou() {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="space-y-2 px-4 max-h-svh"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="lg:text-[84px]  text-left relative md:top-0 top-10 px-6 lg:px-0 text-4xl md:text-6xl font-semibold text-white mb-14 w-full leading-10 md:leading-12"
      >
        <span className="text-8xl md:text-[137px] font-medium font-bright-clones relative top-4 md:top-3 text-white">
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
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-12 md:mb-8 w-11/12 lg:w-full "
      >
        {[
          {
            src: "/pantalla3/fecha-mobile.png",
            alt: "Calendar Icon",
            href: "https://www.google.com/calendar/render?action=TEMPLATE&text=Evento+Finnegans&dates=20251114T210000Z/20251115T010000Z&details=Finnegans&location=Santos+Dumont+4080",
            title: "Agregar a mi calendario",
          },
          {
            src: "/pantalla3/reloj-mobile.png",
            alt: "Time Icon",
            href: null,
            titulo: null,
          },
          {
            src: "/pantalla3/ubicacion-mobile.png",
            alt: "Location Icon",
            href: "https://www.google.com/maps/place/Santos+Dumont+4080,+C1427EIN+Cdad.+Aut%C3%B3noma+de+Buenos+Aires/@-34.5889014,-58.4525789,17z",
            title: "Ver en el mapa",
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
              className="relative px-6 lg:px-0"
              title={item.title || ""}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={400}
                height={400}
                className="object-contain w-full"
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

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="flex lg:justify-between items-center w-full gap-2 px-0 justify-start"
      >
        {/* LEFT */}
        <div
          className="relative group"
          onClick={() => setShowOverlay(!showOverlay)}
        >
          {/* Desktop: finnegans normal */}
          <Image
            src="/finnegans-blanco.png"
            alt="Finnegans Logo"
            width={400}
            height={200}
            className="hidden lg:block aspect-auto h-8 mx-0 px-0 max-w-max"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
