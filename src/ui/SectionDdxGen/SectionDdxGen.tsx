import React, { FC } from "react";
import rightImgDemo from "@/images/grid.svg";
import ButtonPrimary from "@/ui/Button/ButtonPrimary";
import Image, { StaticImageData } from "next/image";
import BgGlassmorphism from "../BgGlassmorphism/BgGlassmorphism";
import BgGlassmorphism2 from "../BgGlassmorphism2/BgGlassmorphism2";
import Badge from "../Badge/Badge";
import Input from "../Input/Input";
import ButtonCircle from "../Button/ButtonCircle";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import DdxFields from "./DdxFields.client";
import arrow from "../../images/arrow-circle-right.svg";

export interface SectionDdxGenProps {
  className?: string;
  rightImg?: string | StaticImageData;
}

const SectionDdxGen: FC<SectionDdxGenProps> = ({
  className = "",
  rightImg = rightImgDemo,
}) => {
  return (
    <div className="dark:bg-gray-900 flex flex-col md:flex-row items-center min-h-screen bg-white">
      {/* Left Content */}
      <div className="flex-1 p-4 md:p-8">
        <div className="relative bg-white dark:bg-gray-800 px-4 md:px-6 pt-6 md:pt-10 pb-6 md:pb-8 shadow border-2 border-gray-100 ring-1 ring-gray-900/0 sm:max-w-lg sm:rounded-2xl sm:px-10 mx-auto">
          <div className="mx-auto max-w-md">
            <DdxFields />
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1   relative flex-col justify-center overflow-hidden bg-transparent dark:bg-gray-900">
        {/* <Image src={rightImgDemo} alt="" layout="fill" objectFit="cover" className="opacity-50" />
        <BgGlassmorphism /> */}
        <div className="container p-4 md:p-9 relative z-10 text-neutral-900 dark:text-neutral-100 shadow-lr">
          <div className="mx-auto max-w-md md:max-w-xl">
            <h2 className="font-semibold text-2xl md:text-4xl mb-4">
              Differential Diagnosis AI
            </h2>
            <span className="block text-neutral-500 dark:text-neutral-400 font-semibold">
              Explore the cutting-edge features of our AI model.
            </span>
            <ul className="space-y-4 mt-6 md:mt-10 cursor-default">
              <li className="flex items-center space-x-4 transform transition-transform duration-500 hover:scale-105">
                <Badge name="01" />
                <span className="font-medium text-neutral-700 dark:text-neutral-300">
                  Real-time Data Processing
                </span>
              </li>
              <li className="flex items-center space-x-4 transform transition-transform duration-500 hover:scale-105">
                <Badge color="blue" name="02" />
                <span className="font-medium text-neutral-700 dark:text-neutral-300">
                  Advanced Neural Networks
                </span>
              </li>
              <li className="flex items-center space-x-4 transform transition-transform duration-500 hover:scale-105">
                <Badge color="blue" name="03" />
                <span className="font-medium text-neutral-700 dark:text-neutral-300">
                  Enhanced Security Protocols
                </span>
              </li>
            </ul>
            <form className="mt-6 md:mt-10 relative max-w-sm">
              <Input
                required
                aria-required
                placeholder="Enter your email"
                type="email"
              />
              <ButtonCircle
                type="submit"
                className="absolute transform top-1/2 -translate-y-1/2 end-1 bg-white dark:bg-neutral-300 dark:text-black"
              >
                <Image
                  src={arrow}
                  alt="arrow"
                  className="bg-blend-color-burn"
                />
              </ButtonCircle>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionDdxGen;
