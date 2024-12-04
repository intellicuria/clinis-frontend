import React, { FC, ReactNode } from "react";
export const metadata = {
  title: {
    default: "Contact Us",
    template: "%s |Contact Us",
  },
  description: "Transforming Healthcare through Intelligent Innovation",
  openGraph: {
    title: {
      default: "Contact Us",
      template: "%s |Contact Us",
    },
    description: "Transforming Healthcare through Intelligent Innovation",
    image: ["https://nextjs.org/og.png"], // Must be an absolute URL
  },
  twitter: {
    title: {
      default: "Contact Us",
      template: "%s |Contact Us",
    },
    description: "Transforming Healthcare through Intelligent Innovation",
    image: ["https://nextjs.org/og.png"], // Must be an absolute URL
  },
  image: "https://nextjs.org/imgs/sticker.png",
};
const LayoutPage = ({ children }: { children: ReactNode }) => {
  return <div className={`nc-LayoutPage  relative`}>{children}</div>;
};

export default LayoutPage;
