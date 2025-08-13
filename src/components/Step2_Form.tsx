"use client";
import { FormEvent, useState } from "react";

export default function Step2_Form({ onSubmit }: { onSubmit: () => void }) {
  const [hasAllergy, setHasAllergy] = useState<string | null>(null); // null, 'yes', or 'no'

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically handle form data submission (e.g., send to an API)
    console.log("Form submitted!");
    onSubmit(); // Move to the next step
  };

  return (
    <div>
      <h2 className="text-xl sm:text-xl font-bold text-white mb-4 text-shadow">
        Algunos datos
      </h2>
      <div className="p-4 rounded-3xl bg-white/20 backdrop-blur-lg border border-white/30">
        <form onSubmit={handleSubmit} className="space-y-6 relative py-6 pb-12">
          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-md font-medium text-white mb-2"
              >
                Nombre y Apellido
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full text-md px-4 py-2 rounded-full bg-white/30 border-2 border-white/40 text-white placeholder-white/70 focus:ring-2 focus:ring-white focus:outline-none backdrop-blur-md transition-all"
              />
            </div>
            {/* Email, Empresa, Cargo inputs go here... same structure */}
            <div>
              <label
                htmlFor="email"
                className="block text-md font-medium text-white mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full text-md px-4 py-2 rounded-full bg-white/30 border-2 border-white/40 text-white placeholder-white/70 focus:ring-2 focus:ring-white focus:outline-none backdrop-blur-md transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="empresa"
                className="block text-md font-medium text-white mb-2"
              >
                Empresa
              </label>
              <input
                type="text"
                id="empresa"
                name="empresa"
                required
                className="w-full text-md px-4 py-2 rounded-full bg-white/30 border-2 border-white/40 text-white placeholder-white/70 focus:ring-2 focus:ring-white focus:outline-none backdrop-blur-md transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="cargo"
                className="block text-md font-medium text-white mb-2"
              >
                Cargo
              </label>
              <input
                type="text"
                id="cargo"
                name="cargo"
                required
                className="w-full text-md px-4 py-2 rounded-full bg-white/30 border-2 border-white/40 text-white placeholder-white/70 focus:ring-2 focus:ring-white focus:outline-none backdrop-blur-md transition-all"
              />
            </div>
          </div>
          {/* Allergy Question */}
          <div className="flex items-center gap-4">
            <label className="block text-md font-medium text-white">
              ¿Alguna alergia o restricción alimentaria?
            </label>
            <div className="flex items-center gap-4">
              {["yes", "no"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setHasAllergy(option)}
                  className={`py-2 px-6 rounded-full text-md font-semibold transition-all ${hasAllergy === option ? "bg-white text-black" : "bg-white/20 text-white border border-white/30"}`}
                >
                  {option === "yes" ? "si" : "no"}
                </button>
              ))}
            </div>
          </div>
          {/* Dietary Options (conditionally rendered) */}
          {hasAllergy === "yes" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["Vegetariana", "Gluten Free", "Vegana", "Otra"].map(
                  (diet) => (
                    <label
                      key={diet}
                      className="flex items-center gap-3 cursor-pointer p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 transition-all hover:bg-white/30"
                    >
                      <input
                        type="radio"
                        name="diet"
                        value={diet.toLowerCase().replace(" ", "-")}
                        className="w-5 h-5 appearance-none rounded-full border border-white/50 bg-white/20 backdrop-blur-md checked:bg-cyan-500 checked:border-cyan-400 transition-all cursor-pointer"
                      />
                      <span className="text-white font-semibold select-none">
                        {diet}
                      </span>
                    </label>
                  ),
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end pt-8 absolute -bottom-10 right-10">
            <button
              type="submit"
              className="py-2 px-6 border-2 border-white rounded-full text-xl font-semibold bg-[#4bc3fe] text-white hover:bg-cyan-500 transition-colors"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
