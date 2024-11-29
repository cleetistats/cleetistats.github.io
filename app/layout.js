import localFont from "next/font/local";
import "./globals.css";

const rockwell = localFont({
  src: "./fonts/rockwell-bold.ttf",
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
      <body className={`${rockwell.variable}`}>
        {children}
      </body>
    </html>
  );
}
