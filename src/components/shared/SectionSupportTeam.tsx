import React, { FC } from "react";
import Heading from "@/ui/Heading/Heading";
import Image from "next/image";
import aic from "@/images/aic-bihar.png";
import aim from "@/images/aim-logo.png";
import googlecloud from "@/images/googlecloud.svg";
import msforstartups from "@/images/msforstartups.png";
import mongodb from "@/images/mongodb.svg";
import amazonaws from "@/images/amazonaws.svg";
import startupindia from "@/images/startupindia.svg";
import NcImage from "@/ui/NcImage/NcImage";
import avatar from "../../images/avatar.svg";
import { start } from "repl";
import medicalAdvisors from "@/constants/commons";
export interface Statistic {
  id: string;
  heading: string;
  subHeading: string;
}

export interface Investor {
  id: string;
  name: string;
  imageUrl: string;
  twitterUrl: string;
  qualification: string;
  imageName: string;
}

const img = aic;
const imgaim = aim;

const SectionSupportTeam = ({}) => {
  return (
    <div className="overflow-hidden text-slate-800 items-center flex-col !my-24 sm:mx-10 justify-center break-words flex bg-slate-50 dark:bg-transparent">
      <div className="relative">
        <h2 className=" text-2xl sm:text-4xl leading-none font-semibold text-center mb-8 sm:mb-16 dark:text-white">
          Supported by industry-leading investors.
        </h2>
      </div>
      {/* <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(270deg,white,rgba(255,255,255,0))] dark:[mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div> */}

      <div className="sm:flex grid grid-cols-2 flex-wrap justify-center sm:flex-row flex-col mb-4 gap-2 sm:gap-x-8 sm:gap-y-2 ">
        <div className="bg-white items-center justify-center flex h-36 rounded-lg p-6">
          <Image src={googlecloud} className="h-16" alt="cld" />
        </div>
        <div className="bg-white items-center justify-center flex h-36 rounded-lg p-6">
          <Image src={msforstartups} className="h-12 w-auto" alt="cld" />
        </div>
        <div className="bg-white items-center justify-center flex h-36 rounded-lg p-6">
          <Image src={mongodb} className="scale-110" alt="cld" />
        </div>
        <div className="bg-white items-center justify-center flex h-36 rounded-lg p-6">
          <Image src={amazonaws} className="h-16 w-auto" alt="cld" />
        </div>
        <div className="bg-white items-center justify-center flex h-36 rounded-lg p-6">
          <Image src={startupindia} className="h-auto w-60" alt="cld" />
        </div>
        <div className="bg-white items-center justify-center flex h-36 rounded-lg p-6">
          <img
            src="https://wadhwanifoundation.org/wp-content/uploads/2023/10/Wadhwani-Foundation-Logo.png"
            className="h-auto w-40"
            alt="cld"
          />
        </div>
        <div className="bg-white items-center justify-center flex h-36 rounded-lg p-6">
          <Image src={img} className="h-auto w-40" alt="cld" />
        </div>
        <div className="bg-white items-center justify-center flex h-36 rounded-lg p-6">
          <Image src={imgaim} className="h-auto w-40" alt="cld" />
        </div>
        <div className="bg-white items-center justify-center flex h-36 rounded-lg p-6">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEGgiRPCu8QSve-bmKAMsg2SHZ_uHUwPtFtkDBSmgn&s"
            className="h-auto w-40"
            alt="cld"
          />
        </div>
      </div>
      <h2 className="text-2xl sm:text-4xl leading-none font-semibold py-10 sm:py-16 text-center dark:text-white">
        Medical Advisors
      </h2>
      <div className="grid grid-cols-2 gap-x-5 mx-3 lg:mx-10  gap-y-8 lg:grid-cols-4 xl:grid-cols-6 xl:gap-x-8">
        {medicalAdvisors.map((item, index) => (
          <div key={index} className="max-w-sm">
            <NcImage
              alt="founder"
              fill
              containerClassName="relative h-0 aspect-h-1 aspect-w-1 rounded-xl overflow-hidden z-0"
              className="absolute inset-0 bg-neutral-200 object-cover object-top"
              src={item?.image ? `/images/profile/${item?.image}` : avatar}
            />
            <h5 className="text-basae font-semibold text-neutral-900 mt-4 md:text-base dark:text-neutral-200">
              {item.name}
            </h5>
            <span className="block text-xs text-neutral-500 sm:text-xs dark:text-neutral-400">
              {item.specialization}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionSupportTeam;
