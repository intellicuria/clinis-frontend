import React from "react";
import SocialsList from "@/ui/SocialsList/SocialsList";
const info = [
  {
    title: "Whatsapp",
    desc: "7074474744",
  },
  {
    title: "Email",
    desc: "contact@clinisio.com",
  },
];
export default function SectionContactInfo() {
  return (
    <>
      <div className="flex flex-col justify-center items-start">
        <h1 className="xl:text-5xl 2xl:text-7xl text-4xl font-bold font-sans mb-5">
          Get in touch
        </h1>
        <p className="2xl:text-lg xl:text-base capitalize mb-5 tracking-wide">
          Interested in supercharging your Helath Services? We're here to help!
          Please fill out the form on the right or email us directly.
        </p>
        <div className="max-w-sm gap-5 grid grid-cols-2">
          {info.map((item, index) => (
            <div key={index}>
              <h3 className="uppercase font-semibold text-sm 2xl:text-lg dark:text-neutral-200 tracking-wider">
                {item.title}
              </h3>
              <span className="block text-sm 2xl:text-base mt-2 text-neutral-200 dark:text-neutral-400">
                {item.desc}
              </span>
            </div>
          ))}
          <div>
            <h3 className="uppercase mb-2 font-semibold text-sm 2xl:text-lg dark:text-neutral-200 tracking-wider">
              SOCIALS
            </h3>
            <SocialsList className="text-neutral-200 dark:text-neutral-300 text-base lg:text-2xl  " />
          </div>
        </div>
      </div>
    </>
  );
}
