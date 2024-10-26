import AdvisorSection from "~/components/ai-advisor/AdvisorSection";
import { FaUserCircle } from "react-icons/fa";
const advisorPage = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="text-3xl font-semibold">
          <h1>AI Advisor</h1>
        </div>
        <div>
          <FaUserCircle size={30} className="text-main" />
        </div>
      </div>
      <AdvisorSection />
    </div>
  );
};

export default advisorPage;
