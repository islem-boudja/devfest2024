import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";

const data = [
  { name: "Marketing", value: 400 },
  { name: "Investment", value: 300 },
  { name: "Finance", value: 200 },
  { name: "Others", value: 100 },
];

const COLORS = ["#E74545", "#142F9F", "#45597C", "#1FC274"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomPieChart = () => {
  // Initialize with undefined instead of null
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  // Handle hover effect to enlarge the slice
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index); // Ensure index is a valid number
  };

  return (
    <PieChart width={250} height={250}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        paddingAngle={5}
        label={renderCustomizedLabel}
        outerRadius={80}
        activeIndex={activeIndex}
        activeShape={(props: any) => {
          const {
            cx,
            cy,
            innerRadius,
            outerRadius,
            startAngle,
            endAngle,
            fill,
            payload,
          } = props;
          return (
            <g>
              <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
              </text>
              <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius + 10} // Enlarge the hovered slice
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
              />
            </g>
          );
        }}
        onMouseEnter={onPieEnter}
        onMouseLeave={() => setActiveIndex(undefined)}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default CustomPieChart;
