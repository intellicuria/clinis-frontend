// components/SectionDisclaimer.js

import React from "react";

const SectionDisclaimer = () => {
  return (
    <div className="py-5 sm:py-10 xl:py-16">
      <div className=" mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-8">
          Disclaimer
        </h2>
        <div className="py-8">
          <p className="text-justify mb-4">
            To the maximum extent permitted by applicable law, we exclude all
            representations, warranties, and conditions relating to our website
            and the use of this website. Nothing in this disclaimer will:
          </p>
          <ul className="list-disc pl-8 mb-4">
            <li>
              limit or exclude our or your liability for death or personal
              injury;
            </li>
            <li>
              limit or exclude our or your liability for fraud or fraudulent
              misrepresentation;
            </li>
            <li>
              limit any of our or your liabilities in any way that is not
              permitted under applicable law; or
            </li>
            <li>
              exclude any of our or your liabilities that may not be excluded
              under applicable law.
            </li>
          </ul>
          <p className="text-justify mb-4">
            The limitations and prohibitions of liability set in this Section
            and elsewhere in this disclaimer: (a) are subject to the preceding
            paragraph; and (b) govern all liabilities arising under the
            disclaimer, including liabilities arising in contract, in tort, and
            for breach of statutory duty.
          </p>
          <p className="text-justify">
            As long as the website and the information and services on the
            website are provided free of charge, we will not be liable for any
            loss or damage of any nature.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SectionDisclaimer;
