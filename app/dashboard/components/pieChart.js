"use client";

import ChartLayout from "@/components/chart-layout";

import { Pie, PieChart, Tooltip, ResponsiveContainer, Cell } from "recharts";

const PieChartLayout = ({ data }) => {
  return (
    <ChartLayout title="Status">
      <ResponsiveContainer  height={160}>
        <PieChart width={220} height={160} >
          <Tooltip />
          <Pie
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            data={data}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </ChartLayout>
  );
};

export default PieChartLayout;
