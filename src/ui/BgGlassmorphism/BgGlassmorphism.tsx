import React, { FC } from "react";

export interface BgGlassmorphismProps {
  className?: string;
}

const BgGlassmorphism: FC<BgGlassmorphismProps> = ({
  className = "absolute inset-x-0 top-0 min-h-0 ps-10 py-20 flex flex-col overflow-hidden z-0",
}) => {
  return (
    <div
      className={`nc-BgGlassmorphism ${className}`}
      data-nc-id="BgGlassmorphism"
    >
      <span className="bg-[#00b09e87] w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20 lg:w-96 lg:h-9w-96 animate-pulse duration-20000" />
      <span className="bg-[#0000c754] w-80 h-80 ms-10 -mt-10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 lg:w-96 lg:h-9w-96 nc-animation-delay-20000 animate-pulse duration-10000" />
    </div>
  );
};

export default BgGlassmorphism;
