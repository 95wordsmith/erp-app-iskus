"use client";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import ChartLayout from "@/components/chart-layout";

const Barchart = ({ data }) => {
  return (
    <ChartLayout title="Revenue">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis
            stroke="#888888"
            fontSize={12}
            dataKey="name"
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
           stroke="#888888"
           fontSize={12}
           tickLine={false}
           axisLine={false}
           tickFormatter={(value)=>{
            const formatted = new Intl.NumberFormat("en-GH", {
              style: "currency",
              currency: "GHS",
          }).format(value);
          return formatted
           }}
          />
          <Tooltip formatter={(value)=>{
             const formatted = new Intl.NumberFormat("en-GH", {
              style: "currency",
              currency: "GHS",
          }).format(value);
          return formatted
          }} />
          <Bar dataKey="total" fill="#3498db" radius={[4,4,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartLayout>
  );
};

export default Barchart;
