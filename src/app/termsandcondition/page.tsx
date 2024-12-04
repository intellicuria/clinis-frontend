// pages/PageTerms.js
import React from "react";
import SectionDisclaimer from "./SectionDisclaimer";
import SectionTermsandcontion from "./SetionTemsandcondition";
import SetionCookies from "./SetionCookies";
import SetionHyperlinking from "./SetionHyperlinking";
import SetionLicense from "./SetionLicense";
import SectionContentLiability from "./SectionContentLiability";
import SectionReservationofRights from "./SectionReservationofRights";
import SectioniFrames from "./SectioniFrames";
import SectionRemovaloflinks from "./SectionRemovaloflinks";

const PageTerms = () => {
  return (
    <div className={`nc-PageTerms relative`}>
      <div
        className={`nc-TermsPage relative lg:max-w-[80vw] max-w-full mx-auto xl:px-20 sm:p-10 py-6 px-4 flex justify-center items-center flex-col text-justify`}
      >
        {/* ======== BG GLASS ========
        <SectionTermsandcontion />
        <SetionCookies />
        <SetionLicense />
        <SetionHyperlinking />
        <SectioniFrames />
        <SectionContentLiability />
        <SectionReservationofRights />
        <SectionRemovaloflinks />
        <SectionDisclaimer /> */}

        <div className="px-6">
          <div className="max-w-4xl mx-auto px-8">
            <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>

            <section className="mb-6">
              <h2 className="text-xl font-semibold">1. Introduction</h2>
              <p>
                Welcome to our platform. By using our services, you agree to
                comply with and be bound by the following terms and conditions.
                Please review them carefully. If you do not agree with these
                terms, you should not use this website.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold">
                2. Information Collection
              </h2>
              <p>
                We collect the following types of information from our users:
              </p>
              <ul className="list-disc list-inside">
                <li>
                  Clinical Details: This includes symptoms, signs, examination
                  findings, clinical pictures, laboratory reports, radiology
                  reports, and other relevant clinical information.
                </li>
                <li>
                  Demographic Details: This includes information about the
                  patients and doctors such as age, gender, and contact details.
                </li>
                <li>
                  Doctors' Prescriptions and Notes: This includes prescriptions
                  given by doctors and any additional notes they provide.
                </li>
                <li>
                  Feedback: Feedback from both patients and doctors about the
                  platform.
                </li>
                <li>
                  Communication Data: Any information shared by patients with
                  doctors through chat or video call functions.
                </li>
                <li>
                  Scientific Materials: PDFs containing scientific materials,
                  books, guidelines shared by doctors for analysis by the
                  system.
                </li>
                <li>
                  Clinical Values and Figures: Data entered in medical
                  calculators.
                </li>
                <li>
                  Personal Contacts: Information shared for referrals and
                  connections.
                </li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold">3. Use of Information</h2>
              <p>
                The information collected is used for the following purposes:
              </p>
              <ul className="list-disc list-inside">
                <li>To provide and improve our services.</li>
                <li>
                  To facilitate communication between patients and doctors.
                </li>
                <li>
                  To generate insights and answers based on shared scientific
                  materials.
                </li>
                <li>
                  To use clinical values and figures in medical calculators to
                  provide accurate results.
                </li>
                <li>
                  To connect users through referrals and personal contacts.
                </li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold">
                4. Data Sharing and Disclosure
              </h2>
              <p>We may share your information in the following situations:</p>
              <ul className="list-disc list-inside">
                <li>
                  With healthcare professionals to provide you with medical
                  advice and treatment.
                </li>
                <li>
                  With third-party service providers who perform services on our
                  behalf.
                </li>
                <li>When required by law or to protect our rights.</li>
                <li>
                  In an aggregated or anonymized form that does not directly
                  identify you.
                </li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold">
                5. User Responsibilities
              </h2>
              <p>By using our platform, you agree to:</p>
              <ul className="list-disc list-inside">
                <li>Provide accurate and complete information.</li>
                <li>
                  Use the platform in compliance with all applicable laws and
                  regulations.
                </li>
                <li>
                  Not share any information that you do not have the right to
                  disclose.
                </li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold">6. Disclaimer</h2>
              <p>
                The information provided by the platform is for general
                informational purposes only and is not intended as medical
                advice. Always seek the advice of your physician or other
                qualified health provider with any questions you may have
                regarding a medical condition.
              </p>
              <p>
                We do not guarantee the accuracy, completeness, or usefulness of
                any information provided on the platform.
              </p>
              <p>
                We are not responsible for any decisions made based on the
                information provided by the platform.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold">
                7. Intellectual Property
              </h2>
              <p>
                All content on the platform, including text, graphics, logos,
                and software, is the property of our platform or its content
                suppliers and is protected by intellectual property laws.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold">
                8. Changes to Terms and Conditions
              </h2>
              <p>
                We reserve the right to modify these terms and conditions at any
                time. Your continued use of the platform following any changes
                will constitute your acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">9. Contact Us</h2>
              <p>
                If you have any questions about these terms and conditions,
                please contact us at (EMAIL ID)
              </p>
            </section>
            <hr className="my-10" />
            <p className="mt-3 text-center">
              By using our platform, you acknowledge that you have read,
              understood, and agree to be bound by these terms and conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTerms;
