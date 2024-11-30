import localFont from "next/font/local";
import "./globals.css";

const rockwell = localFont({
  src: "./fonts/RockwellNova-bold.ttf",
  variable: "--rockwell-bold",
  weight: "100 900",
});

export const metadata = {
  title: "CleetiStats",
  description: "View player stats!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <body className={`${rockwell.variable}`}>
        {children}
      </body>
    </html>
  );
}
