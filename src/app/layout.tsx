import "./globals.css";
import "@/styles/index.scss";
import { Poppins } from "next/font/google";
import Footer from "@/ui/Footer/Footer";
import SiteHeader from "./SiteHeader";
import { ReduxProvider } from "@/store/provider";
import type { Viewport } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleAnalytics } from "@next/third-parties/google";

// export const metadata = {
//   title: "Clinisio - Advancing Healthcare with AI and ML",
//   description: "Transforming Healthcare through Intelligent Innovation",
// };
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};
export const metadata = {
  title: {
    default: "Clinisio - Advancing Healthcare with AI and ML",
    template: "%s | Clinisio",
  },
  description: "Transforming Healthcare through Intelligent Innovation",
  openGraph: {
    title: "Clinisio - Advancing Healthcare with AI and ML",
    description: "Transforming Healthcare through Intelligent Innovation",
    image: "https://nextjs.org/imgs/og-image.png",
  },
  twitter: {
    title: "Clinisio - Advancing Healthcare with AI and ML",
    description: "Transforming Healthcare through Intelligent Innovation",
    image: "https://nextjs.org/imgs/og-image.png",
  },
  image: "https://nextjs.org/imgs/sticker.png",
};

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="main-container scroll-smooth dark:bg-[#111827]">
        <ReduxProvider>
          <div className="bg-[#f8f8f8] text-base dark:bg-neutral-900/95 text-neutral-900 dark:text-neutral-200">
            <ToastContainer />

            <SiteHeader />
            {children}
            <Footer />
          </div>
        </ReduxProvider>
      </body>
      <GoogleAnalytics gaId="G-4NSW1YPPMZ" />
    </html>
  );
}
