// components/SectionInformation.js
import React from 'react';

const SectionInformation = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Information we collect</h1>
      <p className="mb-4">
        The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
      </p>

      <p className="mb-4">
        If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
      </p>

      <p className="mb-4">
        When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
      </p>
      <h2 className="text-xl font-bold mb-2">How We Use Your Information</h2>
      <ul className="list-disc pl-8 mb-4">
        <li>Provide, operate, and maintain our website</li>
        <li>Improve, personalize, and expand our website</li>
        <li>Understand and analyze how you use our website</li>
        <li>Develop new products, services, features, and functionality</li>
        <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
        <li>Send you emails</li>
        <li>Find and prevent fraud</li>
      </ul>
    </div>
  );
};

export default SectionInformation;
