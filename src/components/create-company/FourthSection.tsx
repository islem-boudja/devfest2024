"use client";

import Image from "next/image";
import Link from "next/link";

const FourthSection = ({ formik }: { formik: any }) => {
  return (
    <div className="flex flex-col items-center gap-y-3 text-center">
      <Image
        src={"/creationdone.png"}
        alt="creation done"
        width={120}
        height={120}
      />
      <div>
        <h1 className="text-xl font-semibold text-main">
          Your account has been created!{" "}
        </h1>
        <p className="text-base font-normal text-[#6F6C90]">
          Your company has successfully registered, you can benefit from our
          services by clicking on the button below{" "}
        </p>
      </div>
      <Link href="/home" className="mt-3 w-1/2 cursor-pointer rounded-full bg-[linear-gradient(90deg,#071139_0%,#142F9F_100%)] p-3 px-4 text-center text-lg font-semibold text-white">
          Go to friscAI Panel
      </Link>
    </div>
  );
};

export default FourthSection;
