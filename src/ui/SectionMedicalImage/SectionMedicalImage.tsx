"use client";
import React, { FC, useState } from "react";
import Image from "next/image";
import xrayDemo from "@/images/xray.jpg"; // replace with path to your xray image
import BgGlassmorphism2 from "../BgGlassmorphism2/BgGlassmorphism2";
import ButtonPrimary from "../Button/ButtonPrimary";
import brain from "../../images/brain.svg";

const SectionMedicalImage: FC = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="text-slate-600 relative m-auto p-8 bg-white dark:bg-gray-900">
      <div
        className="flex-wrap py-12 px-8 flex mb-12 rounded-3xl justify-between max-[880px]:flex-col max-[880px]:items-center"
        style={{
          backgroundImage:
            "linear-gradient(113.74deg, rgb(16, 24, 53) 25.51%, rgb(14, 54, 74) 97.73%)",
        }}
      >
        <div className="items-center justify-center px-12 flex">
          <div>
            <div>
              <h2 className="text-white text-5xl font-semibold max-lg:text-4xl">
                Clinisio for doctors
              </h2>

              <p className="text-white mb-10 py-3 max-lg:text-base">
                Enhance your patient care
              </p>
            </div>

            <a
              className="text-white font-bold mt-10 p-5  relative text-center capitalize border-2 border-white/[0.4] border-solid rounded-lg"
              href="https://synaptiq.co/enterprise"
            >
              Learn More
            </a>
          </div>
        </div>

        <div>
          <Image alt="" className="w-auto h-80 max-[1090px]:h-60" src={brain} />
          {"            "}
        </div>
      </div>
    </div>
  );
};

export default SectionMedicalImage;
