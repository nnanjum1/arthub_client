import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>


      <body>
        <NavBar />
        {children}
        <Footer />
        <ToastContainer />
      </body>

    </html>
  );
}