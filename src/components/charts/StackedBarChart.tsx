import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    revenue: 3000,
    cashFlow: 2000,
  },
  {
    name: "Feb",
    revenue: 5000,
    cashFlow: 3000,
  },
  {
    name: "Mar",
    revenue: 4000,
    cashFlow: 2500,
  },
  {
    name: "Apr",
    revenue: 3500,
    cashFlow: 2200,
  },
  {
    name: "May",
    revenue: 4500,
    cashFlow: 2800,
  },
  {
    name: "Jun",
    revenue: 4800,
    cashFlow: 2900,
  },
  {
    name: "Jul",
    revenue: 5200,
    cashFlow: 3100,
  },
  {
    name: "Aug",
    revenue: 5300,
    cashFlow: 3200,
  },
  {
    name: "Sep",
    revenue: 4900,
    cashFlow: 3000,
  },
  {
    name: "Oct",
    revenue: 4700,
    cashFlow: 2700,
  },
  {
    name: "Nov",
    revenue: 5100,
    cashFlow: 2900,
  },
  {
    name: "Dec",
    revenue: 5600,
    cashFlow: 3400,
  },
];

const StackedBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="cashFlow" fill="#142F9F" stackId="stack" />
        <Bar dataKey="revenue" fill="#718EBF" stackId="stack" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StackedBarChart;
