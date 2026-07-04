import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import Navbar from "@/components/layout/components/Navbar";
import Footer from "@/components/layout/components/Footer";
import AuthInitializer from "@/components/auth/components/AuthInitializer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Job Portal",
  description: "Find your dream job",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <QueryProvider>
  <AuthInitializer />

  <Navbar />
  <Toaster />

  <main>{children}</main>

  <Footer />
</QueryProvider>
      </body>
    </html>
  );
}