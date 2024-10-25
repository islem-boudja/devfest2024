"use client";
import React, { useState } from "react";
import ReportGeneraation from "./ReportGeneration";
import ExpensesPrediction from "./ExpensesPrediction";
import SmartPlan from "./SmartPlan";
const AdvisorSection = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex gap-x-2 font-semibold text-md ">
        {["Generate a report", "Predict expenses", "Make a smart plan"].map(
          (item, index) => (
            <div
              onClick={() => setActiveIndex(index)}
              key={index}
              className={`cursor-pointer border text-center p-3 rounded-lg flex items-center gap-x-1 justify-center text-lg ${
                activeIndex === index
                  ? "bg-[linear-gradient(85.84deg,#071139_-6.26%,#142F9F_47.63%,#1FC274_96.28%)] text-white "
                  : "text-[#071139] bg-white"
              }`}
            >
              <p>{item}</p>
            </div>
          )
        )}
      </div>
      {activeIndex === 0 ? (
        <ReportGeneraation />
      ) : activeIndex === 1 ? (
        <ExpensesPrediction />
      ) : (
        <SmartPlan />
      )}
    </div>
  );
};

export default AdvisorSection;
