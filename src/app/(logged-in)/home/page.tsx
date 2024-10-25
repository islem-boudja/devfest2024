import OverviewCards from "~/components/home/OverviewCards";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const homePage = () => {
  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex items-center justify-between">
        <div className="text-transparent inline-block bg-[linear-gradient(85.84deg,#071139_-6.26%,#142F9F_47.63%,#1FC274_96.28%)] bg-clip-text text-3xl font-semibold">
          <h1>Good day, Lamia</h1>
          <h2>Let’s make smart decisions today!</h2>
        </div>
        <div>
          <FaUserCircle size={30} className="text-main" />
        </div>
      </div>
      <div className="text-md flex gap-x-2 font-semibold">
        <Link href={"/ai-advisor"}>
          <div className="text-white flex cursor-pointer items-center justify-center gap-x-1 rounded-lg bg-[linear-gradient(85.84deg,#071139_-6.26%,#142F9F_47.63%,#1FC274_96.28%)] p-2 text-center">
            <HiSparkles />
            <p>Ask for a plan</p>
          </div>
        </Link>
        {["Generate a report", "Check Feedbacks", "Track Expanses"].map(
          (item, index) => (
            <div
              key={index}
              className="bg-white flex cursor-pointer items-center justify-center gap-x-1 rounded-lg border p-2 text-center text-[#071139]"
            >
              <p>{item}</p>
            </div>
          ),
        )}
      </div>
      <OverviewCards />
      <div></div>
    </div>
  );
};

export default homePage;
