import { Poppins, Dancing_Script } from "next/font/google";
import "./globals.css";

// Configure fonts
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-dancing-script",
});

export const metadata = {
  title: "Comienza una nueva era",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${poppins.variable} ${dancingScript.variable} font-sans bg-slate-900 lg:overflow-hidden min-h-screen relative`}
      >
        {/* Background Container */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[url('/Imagen.png')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        {children}
      </body>
    </html>
  );
}

// Note: Ensure your public folder contains the images:
// /public/Imagen.png
// /public/finnegans.svg
// /public/calendario-blanco.svg
// etc.
