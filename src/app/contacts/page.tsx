import React from "react";
import SectionContactForm from "@/components/contact/SectionContactForm";
import SectionContactInfo from "@/components/contact/SectionContactInfo";
import SectionSubscribe from "@/components/shared/SectionSubscribe";

const PageContact = ({}) => {
  return (
    <div className="container max-sm:w-full -auto">
      {/* <header className="text-center max-w-2xl mx-auto mb-14 sm:mb-16 lg:mb-20 ">
        <Heading2>Contact us</Heading2>
        <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
          Drop us message and we will get back for you.
        </span>
      </header> */}
      <div
        className={`absolute h-full top-0 left-0 right-0 w-full bg-primary-100 dark:bg-neutral-800 bg-opacity-25 dark:bg-opacity-40`}
      />
      <div className="relative pt-6 sm:pt-10 pb-16 lg:pt-10 lg:pb-28 lg:px-10 2xl:px-20">
        {/* CONTENT */}
        <div className="py-5 mx-auto bg-primary-600 rounded-xl sm:rounded-3xl lg:rounded-[40px] shadow-md sm:shadow-lg sm:p-10 lg:p-10 2xl:p-16 dark:bg-neutral-900">
          <div className="grid gap-8 lg:grid-cols-2 max-sm:m-5 !text-white">
            <SectionContactInfo />
            <SectionContactForm />
          </div>
        </div>
      </div>
      <SectionSubscribe />
    </div>
  );
};

export default PageContact;
