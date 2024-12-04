import React, { FC } from "react";

export interface BgGlassmorphism2Props {
  className?: string;
}

const BgGlassmorphism2: FC<BgGlassmorphism2Props> = ({
  className = "absolute inset-x-0 top-0 min-h-0 ps-10 py-32 flex flex-col  z-0",
}) => {
  return (
    <div
      className={`nc-BgGlassmorphism ${className}`}
      data-nc-id="BgGlassmorphism"
    >
      <span className="bg-[#0051ff92] w-80 mx h-80 ms-10 -mt-10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 lg:w-96 lg:h-9w-96 nc-animation-delay-20000 animate-pulse duration-50000" />
      <span className="bg-[#00B09D] w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20 lg:w-96 lg:h-9w-96 animate-pulse duration-20000" />

    </div>
  );
};

export default BgGlassmorphism2;
