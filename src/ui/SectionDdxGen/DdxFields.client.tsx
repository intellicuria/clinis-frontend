"use client";
import React, { useState, useEffect } from "react";

interface DifferentialDiagnosis {
  diagnosis: string;
  percentage: string;
  justification: string;
}

const dummyData = [
  {
    diagnosis: "Hypertension",
    percentage: "80%",
    justification:
      "Increased blood pressure readings consistently over 140/90 mmHg. Family history of hypertension. No signs of secondary causes.",
  },
  {
    diagnosis: "Type 2 Diabetes",
    percentage: "60%",
    justification:
      "Elevated fasting glucose levels. Family history of diabetes. Presents with polyuria and polydipsia but without weight loss or ketoacidosis.",
  },
];

const DdxFields: React.FC = () => {
  const [typingIndex, setTypingIndex] = useState<number>(0);
  const [progressValues, setProgressValues] = useState<number[]>(
    dummyData.map(() => 0)
  );
  const [typedTexts, setTypedTexts] = useState<string[]>(
    dummyData.map(() => "")
  );
  const [replay, setReplay] = useState<boolean>(false);
  const data = dummyData;

  const renderProgressBar = (index: number) => {
    return (
      <div className="bg-gray-200 rounded w-full h-2 mt-2 overflow-hidden">
        <div
          className="bg-[#00D0B4] rounded h-2 transition-all scroll-smooth ease-out duration-50"
          style={{ width: `${progressValues[index]}%` }}
        />
      </div>
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = [...progressValues];
      const newTypedTexts = [...typedTexts];
      const currentData = data[typingIndex];
      const typingLength = currentData.justification.length;
      const maxValue = parseInt(currentData.percentage, 10);
      const increment = maxValue / typingLength;
      if (
        newTypedTexts[typingIndex].length < currentData.justification.length
      ) {
        newTypedTexts[typingIndex] = currentData.justification.slice(
          0,
          newTypedTexts[typingIndex].length + 1
        );
        newData[typingIndex] = Math.min(
          newData[typingIndex] + increment,
          maxValue
        );
        setProgressValues(newData);
        setTypedTexts(newTypedTexts);
      } else if (typingIndex < data.length - 1) {
        setTypingIndex(typingIndex + 1);
      } else {
        clearInterval(interval);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [replay, typingIndex, progressValues, typedTexts]);

  const handleReplay = () => {
    setReplay(!replay);
    setTypingIndex(0);
    setProgressValues(dummyData.map(() => 0));
    setTypedTexts(dummyData.map(() => ""));
  };

  return (
    <div className="py-8 ">
      <ul className="sm:p-4  flex flex-row sm:flex-col ">
        {data.map((diagnosisData, index) => (
          <li
            key={index}
            className={`sm:mb-4 max-sm:w-1/2 p-1 sm:p-4 dark:border-gray-500 dark:bg-gray-700 rounded-md sm:rounded-2xl transform transition-all duration-500 bg-white border-2`}
          >
            <h6 className="text-lg font-semibold mb-1 text-black  dark:text-white">
              {diagnosisData.diagnosis}
            </h6>
            <span className="text-[#00D0B4] dark:text-green-[#00D0B4] font-bold">
              {diagnosisData.percentage}
            </span>
            {renderProgressBar(index)}
            <div className="mt-2 text-black max-sm:text-sm max-sm:text-justify dark:text-gray-300">
              {index === typingIndex ? (
                typedTexts[index]
              ) : index < typingIndex ? (
                diagnosisData.justification // Hardcoded description for the completed items
              ) : (
                <div>
                  <div
                    className={`h-2.5 bg-gray-200 animate-pulse  rounded-full dark:bg-gray-400 w-48 my-3`}
                  ></div>
                  <div
                    className={`h-2.5 bg-gray-200 animate-pulse  rounded-full dark:bg-gray-400 w-40 my-3`}
                  ></div>
                  <div
                    className={`h-2 bg-gray-200 animate-pulse  rounded-full dark:bg-gray-400 max-w-[250px] mb-2.5`}
                  ></div>
                  <div
                    className={`h-2 bg-gray-200 animate-pulse  rounded-full dark:bg-gray-400 max-w-[200px] mb-2.5`}
                  ></div>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
      <span
        onClick={handleReplay}
        className="mr-2 cursor-pointer font-semibold text-[#011CA8] dark:text-blue-400 hover:text-[#011da8e4] right-0 self-end pl-2"
      >
        ↺ Replay
      </span>
    </div>
  );
};

export default DdxFields;
