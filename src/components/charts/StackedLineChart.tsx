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

const StackedLineChart = ({ data }: any) => {
  return (
    <AreaChart
      width={825}
      height={250}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <Tooltip />

      <CartesianGrid strokeDasharray="10" vertical={false} />
      <XAxis dataKey="month" axisLine={false} tickLine={false} padding="gap" />
      <YAxis axisLine={false} tickLine={false} />
      <Area
        type="monotone"
        dataKey="Revenue"
        stroke="#1FC274"
        strokeWidth={3.5}
        fillOpacity={1}
        fill="url(#colorcheckIn)"
        unit={" DA"}
      />
      <Area
        type="monotone"
        dataKey="Expense"
        stroke="#D82111"
        strokeWidth={3.5}
        fillOpacity={1}
        fill="url(#colorcheckOut)"
        unit={" DA"}
      />
    </AreaChart>
  );
};

export default StackedLineChart;
