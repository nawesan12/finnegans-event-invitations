import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Google font: Poppins
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

// Local font: Bright Clones
const brightClones = localFont({
  src: "../../public/fonts/Bright Clones Regular.ttf", // Path relative to `public/`
  variable: "--font-bright-clones",
  weight: "400",
  style: "normal",
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
        className={`${poppins.variable} ${brightClones.variable} font-sans bg-slate-900 lg:overflow-hidden min-h-screen relative`}
      >
        {/* Background Container */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[url('/Imagen.png')] bg-cover bg-center"></div>
        </div>
        {children}
      </body>
    </html>
  );
}
