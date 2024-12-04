"use client";
import React, { FC, useState } from "react";
import Image from "next/image";
import xrayDemo from "@/images/xray.jpg"; // replace with path to your xray image
import BgGlassmorphism2 from "../BgGlassmorphism2/BgGlassmorphism2";
import ButtonPrimary from "../Button/ButtonPrimary";
import website from "../../images/website.svg";
import mask from "../../images/mask.svg";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import website1 from "../../images/website1.jpg";

const SectionAppFeaturesAPI: FC = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="">
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden  overflow-x-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }: { card: CardType }) => {
  return (
    <div className="relative mt-20 isolate overflow-hidden overflow-x-hidden max-[970px]:overflow-hidden w-[80vw] bg-[#0051FF] dark:bg-[#1b346a] h-[80vh] px-6 pt-16 shadow-2xl dark:shadow-gray-700 sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
      <Image
        src={mask}
        alt="mask"
        className="absolute -bottom-10 -z-10 scale-90"
      />

      <svg
        viewBox="0 0 1024 1024"
        className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
        aria-hidden="true"
      >
        <circle
          cx={512}
          cy={512}
          r={512}
          fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
          fillOpacity="0.7"
        />
        <defs>
          <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
            <stop stopColor="#7775D6" />
            <stop offset={1} stopColor="#E935C1" />
          </radialGradient>
        </defs>
      </svg>
      <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Create your Medical Workspace with Cliniso
          <br />
          Start your experience now.
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-300">
          Ac euismod vel sit maecenas id pellentesque eu sed consectetur.
          Malesuada adipiscing sagittis vel nulla.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
          <a
            href="#"
            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Get started
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-white">
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
      <div className="relative mt-16 h-80 lg:mt-8">
        <Image
          className="absolute left-0 w-[40rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
          src={card.src}
          alt="App screenshot"
          width={1824}
          height={1080}
        />
      </div>
    </div>
  );
};

type CardType = {
  src: string;
  title: string;
  id: number;
};

const cards: CardType[] = [
  {
    src: website,
    title: "Title 1",
    id: 1,
  },
  {
    src: website1,
    title: "Title 1",
    id: 1,
  },
];

export default SectionAppFeaturesAPI;
