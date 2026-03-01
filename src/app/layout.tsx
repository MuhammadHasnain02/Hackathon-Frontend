import type { Metadata } from "next";
import { Montserrat, Open_Sans, Roboto } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/api/QueryProvider";
import { AuthProvider } from "@/context/AuthContext";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HealthClinic AI | AI Clinic Management",
  description:
    "Smart diagnosis, digital prescriptions, and medical history. Streamline your clinic with AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        suppressHydrationWarning={true}
        className={`${montserrat.variable} ${openSans.variable} ${roboto.variable} font-sans antialiased`}
      >
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
