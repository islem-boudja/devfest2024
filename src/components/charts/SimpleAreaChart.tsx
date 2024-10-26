"use client";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SimpleAreaChart = ({ type }: { type: string }) => {
  const data = type === "Expense" ? [
    {
      month: "Jan",
      expense: 4200,
    },
    {
      month: "Feb",
      expense: 3100,
    },
    {
      month: "Mar",
      expense: 1800,
    },
    {
      month: "Apr",
      expense: 2700,
    },
    {
      month: "May",
      expense: 2100,
    },
    {
      month: "Jun",
      expense: 2450,
    },
    {
      month: "Jul",
      expense: 3700,
    },
    {
      month: "Aug",
      expense: 4100,
    },
    {
      month: "Sep",
      expense: 2900,
    },
    {
      month: "Oct",
      expense: 2200,
    },
    {
      month: "Nov",
      expense: 2800,
    },
    {
      month: "Dec",
      expense: 1950,
    },
  ] : [
    {
      month: "Jan",
      income: 5100,
    },
    {
      month: "Feb",
      income: 4000,
    },
    {
      month: "Mar",
      income: 3200,
    },
    {
      month: "Apr",
      income: 3600,
    },
    {
      month: "May",
      income: 2500,
    },
    {
      month: "Jun",
      income: 2900,
    },
    {
      month: "Jul",
      income: 4200,
    },
    {
      month: "Aug",
      income: 4500,
    },
    {
      month: "Sep",
      income: 3500,
    },
    {
      month: "Oct",
      income: 3800,
    },
    {
      month: "Nov",
      income: 4000,
    },
    {
      month: "Dec",
      income: 3300,
    },
  ];
  

  return (
    <AreaChart
      width={825}
      height={250}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 15,
        bottom: 0,
      }}
    >
      <defs>
        {/* Updated gradient for the fill color */}
        <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
          <stop offset="20%" stopColor="#1FC274" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#1FC274" stopOpacity={0} />
        </linearGradient>
      </defs>
      <Tooltip />

      <CartesianGrid strokeDasharray="10" vertical={false} />
      <XAxis dataKey="month" axisLine={false} tickLine={false} padding="gap" />
      <YAxis axisLine={false} tickLine={false} />
      <Area
        type="monotone"
        dataKey={type === "Expense" ? "expense" : "income"}
        stroke="#142F9F"
        strokeWidth={2}
        fill="url(#colorExpense)"
        fillOpacity={1}
      />
    </AreaChart>
  );
};

export default SimpleAreaChart;
