import React from "react";
import Image from "next/image";
const OverviewCard = ({
  filter,
  title,
  image,
  value,
  percentage,
}: {
  filter: string;
  title: string;
  image: string;
  value: string;
  percentage: string;
}) => {
  return (
    <div className="bg-white hover:scale-105 transition-all p-5  rounded-lg shadow-[0px_4px_14px_0px_#00000040] flex flex-col gap-y-5 w-full">
      <div className="flex gap-x-4 items-center">
        <Image src={image} alt={title} width={50} height={50} />
        <p className="font-semibold text-xl text-[#071139]">{title}</p>
      </div>
      <div>
        <p className="text-[#071139] font-bold text-2xl ">{value}</p>
      </div>
      <div>
        <p
          className={`font-normal text-md ${
            percentage[0] === "+" ? "text-[#1FC274]" : "text-[#E74545]"
          }`}
        >
          {percentage} <span className="text-[#45597C]">on this {filter}</span>
        </p>
      </div>
    </div>
  );
};

export default OverviewCard;
