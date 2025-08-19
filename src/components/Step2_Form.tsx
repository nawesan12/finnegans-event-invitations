"use client";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";

export default function Step2_Form({ onSubmit }: { onSubmit: () => void }) {
  const [hasAllergy, setHasAllergy] = useState<string | null>(null);
  const [selectedDiet, setSelectedDiet] = useState<string | null>(null);
  const [customDiet, setCustomDiet] = useState<string>("");
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (selectedDiet === "otra") formData.set("diet", customDiet.trim());
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    try {
      const response = await fetch("/api/attendees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Form submitted successfully!");
        onSubmit();
      } else console.error("Form submission failed.", response);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // Motion Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, duration: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const inputLabels = {
    name: "Nombre",
    email: "Email",
    company: "Empresa",
    role: "Rol",
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative bottom-6"
    >
      <motion.h2
        variants={itemVariants}
        className="text-xl sm:text-xl font-medium text-white mb-4 px-4 py-2 text-shadow text-shadow-xs"
      >
        Algunos datos
      </motion.h2>

      <motion.div
        variants={itemVariants}
        className="px-8 rounded-3xl bg-white/40 shadow-md backdrop-blur-lg border-2 border-white/30"
      >
        <form onSubmit={handleSubmit} className="space-y-6 relative py-6 pb-4">
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {["name", "email", "company", "role"].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-lg font-medium text-white mb-2"
                >
                  {/*@ts-expect-error bla*/}
                  {inputLabels[field as string]}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  id={field}
                  name={field}
                  required
                  value={formValues[field as keyof typeof formValues]}
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      [field]: e.target.value,
                    }))
                  }
                  className={`w-full text-lg px-4 py-1 rounded-full bg-transparent text-black font-medium placeholder-black/50 border border-gray-300 focus:ring-2 focus:outline-none transition-all ${
                    formValues[field as keyof typeof formValues]
                      ? "bg-white text-black placeholder-black/50"
                      : "bg-transparent text-white placeholder-white/70"
                  }`}
                />
              </div>
            ))}
          </motion.div>

          {/* Allergy Question */}
          <motion.div
            variants={itemVariants}
            className="flex items-center lg:flex-row flex-col gap-4"
          >
            <label className="block text-lg font-medium text-white">
              ¿Alguna alergia o restricción alimentaria?
            </label>
            <div className="flex items-center gap-4">
              {["yes", "no"].map((option) => (
                <motion.button
                  key={option}
                  type="button"
                  onClick={() => setHasAllergy(option)}
                  whileTap={{ scale: 0.95 }}
                  className={`py-2 px-6 rounded-full text-md font-semibold transition-all ${
                    hasAllergy === option
                      ? "bg-white text-[#4bc3fe]"
                      : "bg-white/20 text-white border border-white/30"
                  }`}
                >
                  {option === "yes" ? "si" : "no"}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Diet Options */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Vegetariana", "Gluten Free", "Vegana"].map((diet) => (
                <motion.label
                  key={diet}
                  className="flex items-center gap-3 cursor-pointer p-3 rounded-full bg-transparent transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <input
                    type="radio"
                    name="diet"
                    value={diet.toLowerCase().replace(" ", "-")}
                    checked={
                      selectedDiet === diet.toLowerCase().replace(" ", "-")
                    }
                    onChange={() =>
                      setSelectedDiet(diet.toLowerCase().replace(" ", "-"))
                    }
                    className="w-5 h-5 appearance-none rounded-full border border-white/50 bg-white/20 backdrop-blur-md checked:bg-[#4bc3fe] checked:border-[#4bc3fe] transition-all cursor-pointer"
                  />
                  <span className="text-white font-semibold select-none">
                    {diet}
                  </span>
                </motion.label>
              ))}

              {/* Opción Otra con input */}
              <motion.div
                className="flex items-center gap-3 p-3 lg:w-full max-w-[40px] rounded-full bg-transparent border-white transition-all"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <input
                  type="text"
                  name="diet"
                  placeholder="Otra"
                  value={customDiet}
                  onChange={(e) => {
                    setCustomDiet(e.target.value);
                    setSelectedDiet(e.target.value ? "otra" : null);
                  }}
                  className={`lg:relative lg:right-4 flex-1 px-3 py-1 max-w-32 lg:max-w-none rounded-full  backdrop-blur-xs text-black placeholder-white text-lg focus:outline-none font-medium ${
                    customDiet
                      ? "bg-white text-black placeholder-black/50"
                      : "bg-transparent text-white placeholder-white/70"
                  }`}
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex justify-end pt-8 absolute -bottom-6 right-10"
          >
            <button
              type="submit"
              className="py-2 px-6 border-2 border-white/30 rounded-full text-xl font-semibold bg-[#4bc3fe] text-white hover:bg-cyan-500 transition-colors"
            >
              Enviar
            </button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
}
