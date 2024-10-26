"use client";

import Image from "next/image";

const ThirdSection = ({ formik }: { formik: any }) => {
  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-main">
          Company credit info
        </h1>
        <p className="text-base font-normal text-[#6F6C90]">
          This section concerns the company's finacial account{" "}
        </p>
      </div>
      <div className="w-2/3 cursor-pointer rounded-full bg-[linear-gradient(90deg,#142F9F_0%,#1FC274_100%)] p-[2px] self-center">
        <div className="z-10 flex w-full items-center justify-center rounded-full bg-white px-8 py-3 text-[18px] font-semibold text-[#333333]">
          <Image src={"/paypallogo.png"} alt="paypal" width={40} height={40} />
          <p className="whitespace-nowrap ">
            Connect with Paypal
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThirdSection;
