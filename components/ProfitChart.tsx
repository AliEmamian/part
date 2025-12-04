'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

interface ProfitChartProps {
  data: {
    capacities: number[];
    profits: Record<string, number>;
    totalRevenue: Record<string, number>;
  };
  selectedCapacity: number;
}

export default function ProfitChart({ data, selectedCapacity }: ProfitChartProps) {
  const chartData = data.capacities.map((capacity) => {
    const profit = data.profits[capacity.toString()] || 0;
    const revenue = data.totalRevenue[capacity.toString()] || 0;
    const isSelected = capacity === selectedCapacity;

    return {
      capacity: capacity.toString(),
      name: `${capacity} تن`,
      سود: profit,
      درآمد: revenue,
      isSelected,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="name"
          stroke="#64748b"
          style={{ fontSize: '12px' }}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis
          stroke="#64748b"
          style={{ fontSize: '12px' }}
          tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
          }}
          formatter={(value: number) => [
            `${value.toLocaleString('en-US')} میلیون تومان`,
            '',
          ]}
        />
        <Legend />
        <ReferenceLine y={0} stroke="#ef4444" strokeDasharray="3 3" />
        <Bar
          dataKey="سود"
          fill="#10b981"
          radius={[4, 4, 0, 0]}
          fillOpacity={0.8}
        />
        <Bar
          dataKey="درآمد"
          fill="#3b82f6"
          radius={[4, 4, 0, 0]}
          fillOpacity={0.5}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

