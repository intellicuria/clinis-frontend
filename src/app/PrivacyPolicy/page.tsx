// pages/privacy.js
import React from "react";
import SectionPrivacyPolicy from "./SectionPrivacyPolicy";
import SectionConsent from "./SectionConsent";
import SectionInformation from "./SectionInformation";
import SectionLogFiles from "./SectionLogFiles";
import SectionCookiesandWeb from "./SectionCookiesandWeb";
import SectionAdvertisingPartners from "./SectionAdvertisingPartners";
import SectionThirdParty from "./SectionThirdParty";
import SectionChildrenInformation from "./SectionChildrenInformation";

const PrivacyPolicy = () => {
  return (
    <div className={`nc-PageTerms relative`}>
      <div
        className={`nc-TermsPage relative lg:max-w-[80vw] max-w-full mx-auto xl:px-20 sm:p-10 py-6 px-4 flex justify-center items-center flex-col text-justify`}
      >
        <SectionPrivacyPolicy />
        <SectionConsent /> <SectionInformation />
        <SectionLogFiles />
        <SectionCookiesandWeb />
        <SectionAdvertisingPartners />
        <SectionThirdParty />
        <SectionChildrenInformation />
      </div>
    </div>
  );
};

export default PrivacyPolicy;
