"use client";
import React, { FC, useState } from "react";
import Image from "next/image";
import xrayDemo from "@/images/xray.jpg"; // replace with path to your xray image
import BgGlassmorphism2 from "../BgGlassmorphism2/BgGlassmorphism2";
import ButtonPrimary from "../Button/ButtonPrimary";
import { Cute_Font } from "next/font/google";
import Hospitals from "../../images/Hospitals.svg";
import Marquee from "react-fast-marquee";
const SectionAppTestimonials: FC = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section className="relative isolate overflow-hidden bg-white px-6 py-4 sm:py-8 lg:px-8 dark:bg-gray-900 ">
      {/* <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20 dark:bg-gray-900" /> */}
      {/* <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl dark:bg-gray-900 shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" /> */}
      <div className="mx-auto max-w-2xl lg:max-w-4xl flex flex-col justify-center items-center">
        {/* <img className="mx-auto h-12" src="https://tailwindui.com/img/logos/workcation-logo-indigo-600.svg" alt="" /> */}
        <p className="font-semibold text-gray-400 text-[1.3rem]">
          Powered by <span className="text-[#83ABFF]">Open Source AI</span>
        </p>
        <p className="text-4xl leading-[3rem] mt-5 font-semibold text-center">
          <span className="text-[#0051FF]">Clinisio</span> is best Medical based
          workspace platform. Enriched by Artificial Intelligence for{" "}
          <span className="text-[#0051FF]  tracking-tight">
            Clinical Decision Support System.
          </span>
        </p>
      </div>
      <div className="bg-white py-24 sm:py-32 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-lg font-semibold leading-8 text-gray-900 dark:text-white">
            Trusted by the world’s most innovative teams
          </h2>
          {/* <div className="mx-auto mt-10 grid max-w-lg grid-cols-6 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-6"> */}
          <Marquee pauseOnHover speed={100}>
            <div className="mt-10 flex gap-20">
              <Image
                className="col-span-2 max-h-[20rem] w-full object-contain lg:col-span-1 dark:bg-white p-3 rounded-xl"
                src={Hospitals}
                alt="Reform"
                width={158}
                height={48}
              />
              <Image
                className="col-span-2 max-h-[20rem] w-full object-contain lg:col-span-1 dark:bg-white p-3 rounded-xl"
                src={Hospitals}
                alt="Reform"
                width={158}
                height={48}
              />
            </div>
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default SectionAppTestimonials;
