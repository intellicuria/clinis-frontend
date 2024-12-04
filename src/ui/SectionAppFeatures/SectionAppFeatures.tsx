"use client";
import React, { FC, useState } from "react";
import { useThemeMode } from "@/hooks/useThemeMode";
import Button from "../Button/Button";
const SectionAppFeatures: FC = () => {
  const { _toogleDarkMode, isDarkMode, toDark, toLight } = useThemeMode();
  const svgFill = isDarkMode ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)";
  return (
    <div className="">
      <div className="overflow-hidden  bg-primary-600 dark:bg-[#1b346a] items-center flex-col justify-center pb-8 px-4 pt-12 gap-y-14 text-center flex min-[820px]:items-center min-[820px]:pt-20  min-[820px]:pb-20 min-[820px]:pl-16 min-[820px]:pr-16">
        <div className="text-5xl font-semibold text-white z-20">
          Interested to know more? Contact Us
        </div>

        <div className=" z-20 items-center gap-x-4 flex-wrap flex my-9 flex-col min-[820px]:mt-0  min-[820px]:mb-0 min-[1020px]:flex-row gap-4 min-[820px]:items-center  ">
          <div className="items-center dark:bg-gray-900 bg-white gap-x-[0.63rem] py-3.5 px-5 flex rounded-lg">
            <svg
              className="w-6 h-6 fill-black"
              fill={svgFill}
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.98 10.809l-.468 1.972a.587.587 0 01-.586.489C7.004 13.25 3 9.245 3 4.324a.57.57 0 01.469-.586L5.44 3.27a.63.63 0 01.684.351l.918 2.129c.098.254.039.547-.176.703l-1.054.86a6.782 6.782 0 003.125 3.105l.859-1.055a.626.626 0 01.703-.175l2.129.917c.254.137.41.43.351.704z"
                fill={svgFill}
              />
            </svg>
            <div className="text-black dark:text-white dark:bg-gray-900  bg-white border-0 items-center gap-x-1 flex-grow text-xl flex">
              <div className="">+91</div>
              <input
                className="cursor-text dark:text-white dark:bg-gray-900 active:outline-none border-0 flex-grow w-56 h-8"
                defaultValue=""
                type="text"
              />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 items-center gap-x-[0.63rem] py-3.5 px-5 flex rounded-lg z-20">
            <svg
              className="w-6 h-5"
              fill={svgFill}
              viewBox="0 0 448 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0 96 57.31 96 128s57.3 128 128 128zm50.7 48H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3c0-95.7-77.6-173.3-173.3-173.3z"
                fill={svgFill}
              />
            </svg>
            <input
              className="text-black dark:text-white dark:bg-gray-900 placeholder:text-black dark:placeholder:text-white items-center cursor-text flex-grow text-xl flex w-56 h-8 border-0"
              defaultValue=""
              placeholder="Your Name"
              type="text"
            />
          </div>
          <button className="text-white  items-start text-sm font-bold  py-4 px-8 w-52 h-14 border-2 dark:border-gray-900 border-white z-10 border-solid rounded-lg min-[820px]:pt-5  min-[820px]:pb-5">
            REQUEST CALLBACK
          </button>
        </div>
        <div className="items-center z-20 gap-x-[3.25rem] justify-center flex">
          <div className="items-center flex-col gap-y-5 flex mb-auto">
            <div className="items-center justify-center flex w-20 h-11 rounded-3xl">
              <img src="/images/logo/NHA.svg" />
            </div>
            <div className="text-xl font-medium text-white ">
              NHA Approved{"    "}
            </div>
          </div>
          <div className="items-center flex-col gap-y-5 flex mb-auto">
            <div className="items-center justify-center flex w-11 h-11 rounded-3xl">
              <svg
                className="w-9 h-9"
                fill="none"
                viewBox="0 0 27 28"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.902 5.046H5.097a1.68 1.68 0 00-1.68 1.68v6.166c0 9.39 7.96 12.51 9.557 13.035.341.112.71.112 1.05 0 1.597-.525 9.559-3.645 9.559-13.035V6.726a1.68 1.68 0 00-1.68-1.68zM18.7 12.377l-6.155 5.882a.85.85 0 01-1.166 0L8.3 15.32a.84.84 0 111.156-1.22l2.5 2.385 5.587-5.325a.84.84 0 011.156 1.218z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="text-xl font-medium text-white ">
              Private & Secure{"   "}
            </div>
          </div>
          <div className="items-center flex-col gap-y-5 flex mb-auto">
            <div className="items-center justify-center flex w-11 h-11 rounded-3xl">
              <svg
                className="w-14 h-9"
                fill="none"
                viewBox="0 0 35 29"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.144 14.781c-.691.638-.745 1.702-.16 2.446a1.687 1.687 0 002.393.106c.903-.797 1.967-1.435 3.03-1.914l-2.924-2.286c-.85.479-1.595 1.01-2.34 1.648zm10.473 4.732h-.372a3.392 3.392 0 00-3.402 3.402c0 1.861 1.541 3.403 3.402 3.403a3.392 3.392 0 003.403-3.403c0-.425-.053-.797-.16-1.17l-2.87-2.232zM.764 9.093c-.638.637-.691 1.754-.053 2.392.691.691 1.754.744 2.445.053.638-.638 1.383-1.17 2.074-1.701l-2.765-2.18c-.585.425-1.17.904-1.701 1.436zm18.874 5.529c2.02.425 3.934 1.329 5.529 2.711.319.32.69.425 1.116.425.479 0 .904-.16 1.276-.531.585-.744.532-1.808-.16-2.446-2.817-2.445-6.38-3.828-10.154-3.828-.691 0-1.382.107-2.02.16l-5.05-3.934c2.232-.851 4.625-1.33 7.07-1.33 5.264 0 10.314 2.02 14.089 5.69.372.318.797.478 1.223.478.425 0 .85-.16 1.222-.532.638-.638.585-1.755-.053-2.392a23.648 23.648 0 00-16.48-6.646c-3.563 0-7.019.85-10.155 2.34L2.306 1.064a1.05 1.05 0 00-.745-.32 1.21 1.21 0 00-1.01.532C.073 1.81.18 2.607.764 3.032L32.238 27.7c.531.479 1.329.372 1.754-.212.479-.532.372-1.33-.212-1.755L19.637 14.622z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="text-xl font-medium text-white   ">
              Offline Support{"   "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionAppFeatures;
