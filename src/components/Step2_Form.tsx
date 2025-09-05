"use client";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
export default function Step2_Form({
  onSubmit,
  showMessage,
}: {
  onSubmit: () => void;
  showMessage: (msg: string) => void;
}) {
  const [hasAllergy, setHasAllergy] = useState<string | null>(null);
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
  const [customDiet, setCustomDiet] = useState<string>("");
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
  });

  const handleDietToggle = (diet: string) => {
    setHasAllergy("yes"); // si selecciona una dieta, marcamos "sí"
    setSelectedDiets((prev) =>
      prev.includes(diet) ? prev.filter((d) => d !== diet) : [...prev, diet],
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, company, role } = formValues;
    if (!name || !email || !company || !role) {
      showMessage("Por favor completa todos los campos.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showMessage("Por favor ingresa un email válido.");
      return;
    }

    if (hasAllergy === null) {
      showMessage("Por favor indica si tienes alguna alergia.");
      return;
    }

    const formData = new FormData(e.currentTarget);

    const diets = [...selectedDiets];
    if (customDiet.trim()) diets.push(`otra: ${customDiet.trim()}`);
    formData.set("diet", diets.join("-"));

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
      } else {
        showMessage("No pudimos enviar tus datos. Intenta nuevamente.");
        console.error("Form submission failed.", response);
      }
    } catch (error) {
      showMessage("Ocurrió un error al enviar el formulario.");
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
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-6 relative py-6 pb-4"
        >
          {/* Campos principales */}
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

          {/* Alergias */}
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
                  onClick={() => {
                    setHasAllergy(option);
                    if (option === "no") {
                      setSelectedDiets([]);
                      setCustomDiet("");
                    }
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`py-2 px-6 rounded-full text-md font-semibold transition-all ${
                    hasAllergy === option
                      ? "bg-white text-[#4bc3fe]"
                      : "bg-white/20 text-white border border-white/30"
                  }`}
                >
                  {option === "yes" ? "sí" : "no"}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Dietas */}
          {hasAllergy !== "no" && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {["Vegetariana", "Gluten Free", "Vegana"].map((diet) => {
                  const value = diet.toLowerCase().replace(" ", "-");
                  return (
                    <motion.label
                      key={diet}
                      className={`flex items-center gap-3 cursor-pointer p-3 rounded-full transition-all ${
                        selectedDiets.includes(value)
                          ? "bg-transparent text-white"
                          : "bg-transparent text-white"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <input
                        type="checkbox"
                        name="diet"
                        value={value}
                        checked={selectedDiets.includes(value)}
                        onChange={() => handleDietToggle(value)}
                        className="w-5 h-5 appearance-none rounded-full border border-white/50 bg-white/20 backdrop-blur-md checked:bg-[#4bc3fe] checked:border-[#4bc3fe] transition-all cursor-pointer"
                      />
                      <span>{diet}</span>
                    </motion.label>
                  );
                })}

                {/* Opción Otra */}
                <motion.div
                  className="flex items-center gap-3 p-3 rounded-full bg-transparent border-white transition-all"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <input
                    type="text"
                    name="custom-diet"
                    placeholder="Otra"
                    value={customDiet}
                    onChange={(e) => {
                      setCustomDiet(e.target.value);
                      if (e.target.value.trim()) setHasAllergy("yes");
                    }}
                    className={`flex-1 px-3 py-1 rounded-full text-lg font-medium backdrop-blur-xs focus:outline-none ${
                      customDiet
                        ? "bg-white text-black placeholder-black/50"
                        : "bg-transparent text-white placeholder-white/70"
                    }`}
                  />
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Botón submit */}
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
