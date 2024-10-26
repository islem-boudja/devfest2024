import MetricCard from "./MetricCard";
import { FaFileExport } from "react-icons/fa6";

const ExpensesPrediction = () => {
  const metrics = [
    {
      title: "Avg Day Expense",
      count: 1000,
      image: "/dailyexpense.svg",
    },
    {
      title: "Day to Day Volatility",
      count: 2000,
      image: "/volatility.svg",
    },
    {
      title: "Highest Day Expense",
      count: 1000,
      image: "/highexpense.svg",
    },
    {
      title: "Lowest Day Expense",
      count: 1000,
      image: "/lowexpense.svg",
    },
    {
      title: "Spending Spike",
      count: "2 spikes",
      image: "/exclam.svg",
    },
  ];
  return (
    <div className="flex flex-col gap-y-3 bg-white p-4 shadow-[0px_4px_14px_0px_#00000040]">
      <div className="flex flex-col gap-y-3 bg-[#EBEDF1] p-4">
        <h1 className="text-xl font-semibold text-main">
          Metrics of the previous week
        </h1>
        <div className="flex items-center gap-x-3">
          {metrics.map((data) => (
            <MetricCard 
              key={data.title}
              title={data.title}
              count={data.count}
              image={data.image}
            />
          ))}
        </div>
        <div>
          <h1 className="text-xl font-semibold text-main">Recommendations</h1>
        </div>
      </div>
      <div className="flex cursor-pointer text-white px-4 items-center gap-x-2 self-end rounded-md bg-main p-2 text-lg">
        <FaFileExport size={20} />
        <p>Export</p>
      </div>
    </div>
  );
};

export default ExpensesPrediction;
