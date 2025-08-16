"use client";
import { FormEvent, useState } from "react";

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

    // Si eligió "otra", reemplazamos diet con el texto que escribió
    if (selectedDiet === "otra") {
      formData.set("diet", customDiet.trim());
    }

    const data = Object.fromEntries(formData.entries());
    console.log(data);

    try {
      const response = await fetch("/api/attendees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Form submitted successfully!");
        onSubmit();
      } else {
        console.error("Form submission failed.");
        console.log(response);
      }
    } catch (error) {
      console.error("An error occurred during form submission:", error);
    }
  };

  return (
    <div className="relative bottom-6">
      <h2 className="text-xl sm:text-xl font-medium text-white mb-4 px-4 py-2 text-shadow text-shadow-xs">
        Algunos datos
      </h2>
      <div className="px-8 rounded-3xl bg-white/40 shadow-md backdrop-blur-lg border-2 border-white/30">
        <form onSubmit={handleSubmit} className="space-y-6 relative py-6 pb-4">
          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-lg font-medium text-white mb-2"
              >
                Nombre y Apellido
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formValues.name}
                onChange={(e) =>
                  setFormValues((prev) => ({ ...prev, name: e.target.value }))
                }
                className={`w-full text-lg px-4 py-1 rounded-full bg-transparent text-black font-medium placeholder-black/50 border border-gray-300 focus:ring-2  focus:outline-none transition-all ${
                  formValues.name
                    ? "bg-white text-black placeholder-black/50"
                    : "bg-transparent text-white placeholder-white/70"
                }`}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium text-white mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formValues.email}
                onChange={(e) =>
                  setFormValues((prev) => ({ ...prev, email: e.target.value }))
                }
                className={`w-full text-lg px-4 py-1 rounded-full bg-transparent text-black font-medium placeholder-black/50 border border-gray-300 focus:ring-2  focus:outline-none transition-all ${
                  formValues.email
                    ? "bg-white text-black placeholder-black/50"
                    : "bg-transparent text-white placeholder-white/70"
                }`}
              />
            </div>
            <div>
              <label
                htmlFor="company"
                className="block text-lg font-medium text-white mb-2"
              >
                Empresa
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required
                value={formValues.company}
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    company: e.target.value,
                  }))
                }
                className={`w-full text-lg px-4 py-1 rounded-full bg-transparent text-black font-medium placeholder-black/50 border border-gray-300 focus:ring-2  focus:outline-none transition-all ${
                  formValues.company
                    ? "bg-white text-black placeholder-black/50"
                    : "bg-transparent text-white placeholder-white/70"
                }`}
              />
            </div>
            <div>
              <label
                htmlFor="role"
                className="block text-lg font-medium text-white mb-2"
              >
                Cargo
              </label>
              <input
                type="text"
                id="role"
                name="role"
                required
                value={formValues.role}
                onChange={(e) =>
                  setFormValues((prev) => ({ ...prev, role: e.target.value }))
                }
                className={`w-full text-lg px-4 py-1 rounded-full bg-transparent text-black font-medium placeholder-black/50 border border-gray-300 focus:ring-2  focus:outline-none transition-all ${
                  formValues.role
                    ? "bg-white text-black placeholder-black/50"
                    : "bg-transparent text-white placeholder-white/70"
                }`}
              />
            </div>
          </div>

          {/* Allergy Question */}
          <div className="flex items-center lg:flex-row flex-col gap-4">
            <label className="block text-lg font-medium text-white">
              ¿Alguna alergia o restricción alimentaria?
            </label>
            <div className="flex items-center  gap-4">
              {["yes", "no"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setHasAllergy(option)}
                  className={`py-2 px-6 rounded-full text-md font-semibold transition-all ${
                    hasAllergy === option
                      ? "bg-white text-[#4bc3fe]"
                      : "bg-white/20 text-white border border-white/30"
                  }`}
                >
                  {option === "yes" ? "si" : "no"}
                </button>
              ))}
            </div>
          </div>

          {/* Diet Options */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Vegetariana", "Gluten Free", "Vegana"].map((diet) => (
                <label
                  key={diet}
                  className="flex items-center gap-3 cursor-pointer p-3 rounded-full bg-transparent transition-all"
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
                </label>
              ))}

              {/* Opción Otra con input */}
              <div className="flex items-center gap-3 p-3 lg:w-full max-w-[40px] rounded-full bg-transparent border-white transition-all">
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
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-8 absolute -bottom-6 right-10">
            <button
              type="submit"
              className="py-2 px-6 border-2 border-white/30 rounded-full text-xl font-semibold bg-[#4bc3fe] text-white hover:bg-cyan-500 transition-colors"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
