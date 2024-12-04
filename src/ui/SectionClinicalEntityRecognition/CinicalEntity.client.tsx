"use client";
import React, { useState, useEffect } from "react";

interface ClinicalEntity {
  entity: string;
  type: string;
  description: string;
}

const dummyData = [
  {
    entity: "Polyuria",
    type: "Symptom",
    description: "Increased frequency of urination.",
    color: `#FFA800`,
  },
  {
    entity: "Hyperglycemia",
    type: "Sign",
    description: "Elevated blood glucose level.",
    color: `#9DC9FF`,
  },
  {
    entity: "Blood Pressure",
    type: " Measurement",
    description: "Increased frequency of urination.",
    color: `#FFAEAE`,
  },
];

const ClinicalEntityRecognition: React.FC = () => {
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
  const [typedText, setTypedText] = useState<string>("");
  const [replay, setReplay] = useState<boolean>(false);
  const data = dummyData;

  useEffect(() => {
    setTypedText("");
    let typingIndex = 0;
    const typingDelay = 20;
    const currentDescription = data[highlightedIndex].description;

    const typingInterval = setInterval(() => {
      if (typingIndex < currentDescription.length) {
        setTypedText((prev) => prev + currentDescription[typingIndex - 1]);
        typingIndex++;
      } else {
        clearInterval(typingInterval);
        if (highlightedIndex < data.length - 1) {
          setTimeout(() => setHighlightedIndex(highlightedIndex + 1), 1000);
        } else {
          setTimeout(() => setHighlightedIndex(0), 1000);
        }
      }
    }, typingDelay);

    return () => {
      clearInterval(typingInterval);
    };
  }, [highlightedIndex, replay]);

  const handleReplay = () => {
    setReplay(!replay);
    setTypedText("");
    setHighlightedIndex(0);
  };

  return (
    <>
      <ul className="flex  max-sm:absolute flex-col gap-5 mb-5 sm:mb-10 my-auto">
        {data.map((entityData, index) => (
          <li
            key={index}
            className={`p-3 sm:p-4 max-sm:max-w-[85vw] max-w-4/5 bg-white border shadow-lg rounded-xl dark:bg-gray-700 transition-all ease-in-out duration-300 ${
              index === highlightedIndex
                ? "scale-110 dark:ring-white ring-1 border-transparent"
                : "scale-100 dark:border-gray-600"
            }`}
          >
            <div className="flex sm:gap-9 gap-4 justify-start items-center">
              <h6 className="text-lg sm:text-2xl font-semibold mb-1 text-black dark:text-white">
                {entityData.entity}
              </h6>
              <span
                className="text-sm sm:text-lg font-light align-bottom"
                style={{ color: entityData.color }}
              >
                {entityData.type}
              </span>
            </div>
            <span className="sm:mt-2 text-black dark:text-gray-300">
              {" "}
              {index === highlightedIndex
                ? " " + typedText
                : entityData.description}
            </span>
          </li>
        ))}
        <span
          onClick={handleReplay}
          className="mr-2 cursor-pointer text-blue-600 dark:text-blue-400 hover:underline"
        >
          🔄 Replay
        </span>
      </ul>
    </>
  );
};

export default ClinicalEntityRecognition;
