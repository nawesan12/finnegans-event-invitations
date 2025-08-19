"use client";
import Image from "next/image";
import { motion } from "framer-motion";

type Step1InvitationProps = {
  onYes: () => void;
  onNo: () => void;
};

export default function Step1Invitation({ onYes, onNo }: Step1InvitationProps) {
  return (
    <motion.div
      className="flex flex-col gap-4 lg:gap-2"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { staggerChildren: 0.2, duration: 0.6, ease: "easeOut" },
        },
      }}
    >
      {/* Logo */}
      <motion.div
        className="inline-flex max-w-max items-center relative px-2 md:px-0 -left-2"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <Image
          src="/logo-finnegans.svg"
          alt="Finnegans Logo"
          width={70}
          height={70}
          className="rounded-full h-[74px] w-auto relative -top-3"
          priority
        />
      </motion.div>

      {/* Title */}
      <motion.h1
        className="lg:text-[101px] text-6xl leading-13 md:leading-none px-4 md:px-0 md:text-8xl font-semibold text-white lg:mb-10 text-shadow-xs text-left w-full"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        Comienza nuestra <br /> <i>nueva</i> era ¿venís?
      </motion.h1>

      {/* Buttons */}
      <motion.div
        className="flex items-center justify-center md:justify-start gap-6 px-6 md:px-0 relative top-4 md:top-0"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={onYes}
          className="border-white/80 whitespace-nowrap border-2 border-t-0 border-b-0 cursor-pointer font-semibold text-xl md:text-3xl py-3 px-6 rounded-full bg-white/40 backdrop-blur-md text-white shadow-lg"
        >
          Obvio que si!
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNo}
          className="border-white/80 whitespace-nowrap border-2 border-t-0 border-b-0 cursor-pointer font-semibold text-xl md:text-3xl py-3 px-6 rounded-full bg-white/40 backdrop-blur-md text-white shadow-lg"
        >
          No puedo :(
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
