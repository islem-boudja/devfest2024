"use client";
import dynamic from "next/dynamic";
import { useState } from "react";

// Dynamically import the SimpleAreaChart component, disabling SSR
const SimpleAreaChart = dynamic(
  () => import("~/components/charts/SimpleAreaChart"),
  {
    ssr: false,
  },
);
const StackedBarChart = dynamic(
  () => import("~/components/charts/StackedBarChart"),
  {
    ssr: false,
  },
);
const CustomPieChart = dynamic(
  () => import("~/components/charts/CustomPieChart"),
  {
    ssr: false,
  },
);

const DashboardPage = () => {
  const [dataType, setDataType] = useState("Expense");

  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-3xl font-semibold text-main">Dashboard</div>
      <div className="bg-white flex flex-col gap-y-2 rounded-lg p-4 shadow-[0px_4px_14px_0px_#00000040]">
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold text-main">Analytics</p>
          <div className="flex items-center gap-x-2">
            {["Expense", "Income"].map((item) => (
              <div
                key={item}
                onClick={() => setDataType(item)}
                className={`cursor-pointer rounded-lg p-2 ${
                  dataType === item
                    ? "text-white bg-[#1FC274]"
                    : "bg-white text-[#1FC274]"
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div>
          <SimpleAreaChart type={dataType} />
        </div>
      </div>
      <div className="bg-white flex flex-col gap-y-2 rounded-lg p-4 shadow-[0px_4px_14px_0px_#00000040]">
        <p className="text-xl font-semibold text-main">Cash Flow</p>
        <StackedBarChart />
      </div>
      <div className="bg-white flex w-1/3 flex-col gap-y-2 rounded-lg p-4 shadow-[0px_4px_14px_0px_#00000040]">
        <p className="text-xl font-semibold text-main">Expense Statistics</p>
        <CustomPieChart />
      </div>
    </div>
  );
};

export default DashboardPage;
