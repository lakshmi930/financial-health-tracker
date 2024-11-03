import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#4A6670', '#9DB5B2', '#D57A66', '#F2CC8F'];

const data = [
    { name: "Fixed Savings", value: 1350 },
    { name: "Emergency Fund", value: 7500 },
    { name: "Retirement", value: 12000 },
    { name: "Investment", value: 1000 },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: { cx: number, cy: number, midAngle: number, innerRadius: number, outerRadius: number, percent: number }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function Savings() {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="text-[#4A6670]">Savings</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => `£${value.toLocaleString()}`}
              contentStyle={{ backgroundColor: '#F9F7F3', border: 'none' }}
            />
            <Legend 
              layout="vertical" 
              align="right" 
              verticalAlign="middle"
              formatter={(value, _, index) => (
                <span style={{ color: COLORS[index % COLORS.length] }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 space-y-2">
          {data.map((item, index) => (
            <div key={item.name} className="flex justify-between items-center">
              <span className="text-sm font-medium" style={{ color: COLORS[index % COLORS.length] }}>
                {item.name}
              </span>
              <span className="text-sm text-muted-foreground">
                £{item.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
