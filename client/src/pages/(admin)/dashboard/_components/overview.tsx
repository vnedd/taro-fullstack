import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface OverviewProps {
  data: {
    name: string;
    total: number;
    sale: number;
  }[];
}

const Overview: React.FC<OverviewProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#0c4a6e" fontSize={12} />
        <YAxis
          stroke="#0c4a6e"
          fontSize={12}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#0c4a6e" stackId="data-charts" />
        <Bar dataKey="sale" fill="#ea580c" stackId="data-charts" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Overview;
