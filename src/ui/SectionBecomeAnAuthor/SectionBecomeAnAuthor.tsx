import React, { FC } from "react";
import rightImgDemo from "@/images/grid.svg";
import ButtonPrimary from "@/ui/Button/ButtonPrimary";
import Button from "../Button/Button";
import Image, { StaticImageData } from "next/image";
import BgGlassmorphism from "../BgGlassmorphism/BgGlassmorphism";
import BgGlassmorphism2 from "../BgGlassmorphism2/BgGlassmorphism2";
import Brain from "../../images/brain.svg";
export interface SectionBecomeAnAuthorProps {
  className?: string;
  rightImg?: string | StaticImageData;
}

const SectionBecomeAnAuthor: FC<SectionBecomeAnAuthorProps> = ({
  className = "",
  rightImg = rightImgDemo,
}) => {
  return (
    <div className="dark:bg-gray-900">
      <div className="relative flex flex-col justify-center overflow-hidden bg-white dark:bg-gray-800 ">
        {/* <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] dark:[mask-image:linear-gradient(180deg,black,rgba(0,0,0,0))]"></div> */}
        <div className="container p-9 relative z-10 text-neutral-900 dark:text-neutral-100 shadow-lr flex">
          <div className="max-w-3xl flex justify-center items-start flex-col">
            <h1 className="font-semibold max-[640px]:text-4xl max-[530px]:text-3xl max-[440px]:text-xl text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl mt-3 md:leading-[110%] xl:tracking-tight animate-gradient bg-clip-text bg-gradient-to-r text-[#0051FF]">
              AI-powered Clinical{" "}
              <span className="whitespace-nowrap">Decision Support System</span>
            </h1>
            <p className="mt-7 max-[640px]:text-base max-[440px]:text-xs text-xs lg:text-base font-[500] text-gray-700 dark:text-gray-300">
              Empowering clinicians with our specially crafted case specific
              AI-Powered Tools{" "}
              <span className="whitespace-nowrap">
                for Clinical Evaluation to Desecion Making.
              </span>
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse mt-11">
              <ButtonPrimary
                href="/"
                className="bg-[#0051FF] hover:bg-[#0051ffe8] text-white dark:bg-blue-500 dark:hover:bg-blue-400 rounded-lg"
              >
                Get Started
              </ButtonPrimary>
              <Button href="/" pattern="white">
                Learn More →
              </Button>
            </div>
          </div>
          <div className="max-sm:invisible max-lg:scale-90 max-[640px]:invisible">
            <Image
              src={Brain}
              alt="brain"
              className="scale-125 relative left-10 top-10 animate-oscillate"
            />
            <div className="absolute -right-40 -top-60 w-[40vw] -z-10">
              <BgGlassmorphism2 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionBecomeAnAuthor;
