import React from "react";
import { FaFileExport, FaUserCircle } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { cn } from "~/lib/utils";
import Link from "next/link";

const ExpensesPage = () => {
  const expensesData = [
    {
      id: 1,
      date: "2024-10-19",
      department: "Marketing",
      amount: "150,000 DA",
      status: "Caution",
      description: "Budget for social media campaigns",
    },
    {
      id: 2,
      date: "2024-10-18",
      department: "Operations",
      amount: "300,000 DA",
      status: "Safe",
      description: "Expenses for equipment maintenance",
    },
    {
      id: 3,
      date: "2024-10-17",
      department: "HR",
      amount: "63,068 DA",
      status: "Risk",
      description: "Salaries for the month of October",
    },
    {
      id: 4,
      date: "2024-10-16",
      department: "Finance",
      amount: "200,000 DA",
      status: "Safe",
      description: "Budget for the month of October",
    },
    {
      id: 5,
      date: "2024-10-15",
      department: "Sales",
      amount: "100,000 DA",
      status: "Caution",
      description: "Budget for sales campaigns",
    },
    {
      id: 6,
      date: "2024-10-14",
      department: "IT",
      amount: "100,000 DA",
      status: "Safe",
      description: "Expenses for software licenses",
    },
    {
      id: 7,
      date: "2024-10-13",
      department: "Operations",
      amount: "150,000 DA",
      status: "Risk",
      description: "Expenses for equipment maintenance",
    },
    {
      id: 8,
      date: "2024-10-12",
      department: "Finance",
      amount: "200,000 DA",
      status: "Safe",
      description: "Budget for the month of October",
    },
    {
      id: 9,
      date: "2024-10-11",
      department: "Sales",
      amount: "100,000 DA",
      status: "Caution",
      description: "Budget for sales campaigns",
    },
    {
      id: 10,
      date: "2024-10-10",
      department: "IT",
      amount: "100,000 DA",
      status: "Safe",
      description: "Expenses for software licenses",
    },
  ];

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex items-center justify-between">
        <div className="text-3xl font-semibold text-main">Expenses</div>
        <div>
          <FaUserCircle size={30} className="text-main" />
        </div>
      </div>

      <div className="bg-white flex flex-col rounded-lg p-4 px-6 shadow-[0px_4px_14px_0px_#00000040]">
        <div className="flex items-center gap-x-10">
          <div className="whitespace-nowrap text-lg font-semibold">
            <p>Currently Spending</p>
            <p className="text-transparent inline-block bg-[linear-gradient(85.84deg,#071139_-6.26%,#142F9F_47.63%,#1FC274_96.28%)] bg-clip-text text-2xl font-semibold">
              513,068.00 DA
            </p>
          </div>
          <div className="border-l-slate-500 h-[55px] border-l-[1.5px] border-solid"></div>
          <div>
            <p className="text-xl font-semibold text-[#CD0606]">
              Risks Detected
            </p>
            <p className="text-xl font-bold text-main">
              Expecting a <span className="text-[#CD0606]">2,670,400</span> loss
              within 18 days if we don’t change the expenses rate.
            </p>
          </div>
        </div>

        <div className="self-end">
          <Link
            href="/ai-advisor"
            className="text-transparent inline-block bg-[linear-gradient(85.84deg,#071139_-6.26%,#142F9F_47.63%,#1FC274_96.28%)] bg-clip-text text-lg font-semibold underline"
          >
            Ask AI for help
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center gap-x-2 self-end">
          <input
            type="text"
            placeholder="Search Employees"
            className="rounded-lg p-2 shadow-[0px_4px_14px_0px_#00000040]"
          />
          <div className="text-white text-md flex cursor-pointer items-center gap-x-2 rounded-md bg-main px-3 py-2">
            <FaFileExport size={20} />
            <p>Export</p>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 px-6 shadow-[0px_4px_14px_0px_#00000040]">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="text-lg font-semibold text-[#7C8698]">
                <TableHead>Department</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expensesData.map((expense) => (
                <TableRow
                  key={expense.id}
                  className="text-black text-md font-semibold"
                >
                  <TableCell>{expense.department}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "text-md min-w-12 rounded px-2 py-1 font-semibold",
                        expense.status === "Caution"
                          ? "bg-yellow-100 text-yellow-600"
                          : expense.status === "Safe"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600",
                      )}
                    >
                      {expense.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ExpensesPage;
