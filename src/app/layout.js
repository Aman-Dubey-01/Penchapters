import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/Footer";
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "@/providers/ThemeProvider";
import AuthProvider from "@/providers/AuthProvider";
import Head from "next/head";
import icon from "./icon.png";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PenChapters",
  description: "The best blog app!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <Head>
      <link rel="shortcut icon" href={icon} />
    </Head>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <div className="container">
                <Navbar />
                <div className="wrapper">
                  {children}
                </div>
                <Footer />
              </div>
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
