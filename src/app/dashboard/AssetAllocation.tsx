import React from 'react'
import { PieChart, Pie, Cell, Tooltip } from 'recharts'

interface DataItem {
  name: string;
  value: number;
}

const data: DataItem[] = [
  { name: 'Token A', value: 400 },
  { name: 'Token B', value: 300 },
  { name: 'Token C', value: 300 },
  { name: 'Token D', value: 200 },
];

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];

const AssetAllocationVisual: React.FC = () => (
  <PieChart width={400} height={400}>
    <Pie
      data={data}
      dataKey="value"
      nameKey="name"
      innerRadius={60}
      outerRadius={80}
      fill="#8884d8"
      paddingAngle={5}
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
  </PieChart>
);

export default AssetAllocationVisual
