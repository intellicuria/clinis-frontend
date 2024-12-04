import React from "react";
import SectionHero from "@/components/about/SectionHero";
import SectionFounder from "@/components/about/SectionFounder";
import BgGlassmorphism from "@/ui/BgGlassmorphism/BgGlassmorphism";
import SectionNew from "@/components/about/SectionNew";
import SectionSupportTeam from "@/components/shared/SectionSupportTeam";
import SectionOurMission from "@/components/about/SectionOurMission";
import SectionOurStory from "@/components/about/SectionOurStory";
import person from "../../images/person.svg";
import SectionTestimonials from "@/components/shared/SectionTestimonials";
import SectionCallBack from "@/components/shared/SectionCallBack";

export const metadata = {
  title: {
    default: "About Us",
    template: "%s | About",
  },
  description: "Transforming Healthcare through Intelligent Innovation",
  openGraph: {
    title: {
      default: "About",
      template: "%s | About",
    },
    description: "Transforming Healthcare through Intelligent Innovation",
    image: "https://nextjs.org/imgs/sticker.png",
  },
  twitter: {
    title: {
      default: "About",
      template: "%s | About",
    },
    description: "Transforming Healthcare through Intelligent Innovation",
    image: "https://nextjs.org/imgs/sticker.png",
  },
  image: "https://nextjs.org/imgs/sticker.png",
};
const PageAbout = ({}) => {
  return (
    <div className={`nc-PageAbout relative`}>
      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />
      <div
        className={`absolute h-full top-0 left-0 right-0 w-full bg-primary-100 dark:bg-neutral-800 bg-opacity-25 dark:bg-opacity-40`}
      />
      <div className="max-sm:px-4 scroll-smooth py-5 sm:py-16 lg:py-28 space-y-16 lg:space-y-28">
        <SectionHero
          rightImg={person}
          heading="About Us"
          btnText="Read Our Story"
          subHeading="Clinisio is a team of passionate individuals from diverse backgrounds, including healthcare professionals, data scientists, and AI experts. We came together with a shared vision to create a platform that empowers healthcare providers, researchers, and organizations with cutting-edge AI solutions."
        />
        <SectionOurStory />
        <SectionOurMission />
        <SectionFounder />
        <SectionSupportTeam />
      </div>
      <SectionNew />
      <SectionTestimonials />
      <SectionCallBack />

      {/* <SectionFeatures2 /> */}

      {/* <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28"> */}

      {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionStatistic />

        </div> */}
      {/* <SectionSubscribe2 /> */}
      {/* </div> */}
      {/* <SectionRatings /> */}
    </div>
  );
};

export default PageAbout;
