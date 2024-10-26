"use client";

import { useState } from "react";
import OverviewCard from "./OverviewCard";

const OverviewCards = () => {
  const [filter, setFilter] = useState<string>("Week");
  const overviewData = [
    {
      title: "Total Revenue",
      value: "513,068.00DA",
      image: "/revenue.svg",
      percentage: "-12%",
    },
    {
      title: "Total Delivered Services",
      value: "1,569,230",
      image: "/services.svg",
      percentage: "+12%",
    },
    {
      title: "Clients",
      value: "2350,745",
      image: "/clients.svg",
      percentage: "+12%",
    },
  ];
  const overviewFilter = ["Week", "Month", "Year"];
  return (
    <div className="flex flex-col gap-y-3 w-full">
      <div className="flex justify-between items-center">
        <div className="text-main text-xl font-semibold ">Overview</div>
        <div className="flex gap-x-2 items-center">
          {overviewFilter.map((item) => (
            <div
              key={item}
              onClick={() => setFilter(item)}
              className={`cursor-pointer font-semibold p-2 py-1 transition-all rounded-lg ${
                filter === item ? "text-[#071139] bg-white" : "text-[#45597C] "
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-x-4 ">
        {overviewData.map((data) => (
          <OverviewCard
            key={data.title}
            filter={filter}
            title={data.title}
            image={data.image}
            value={data.value}
            percentage={data.percentage}
          />
        ))}
      </div>
    </div>
  );
};

export default OverviewCards;
