'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface RevenueChartProps {
  data: {
    capacities: number[];
    revenues: Record<string, Record<string, number>>;
  };
  selectedCapacity: number;
}

export default function RevenueChart({ data, selectedCapacity }: RevenueChartProps) {
  const chartData = data.capacities.map((capacity) => {
    const point: Record<string, any> = {
      capacity: capacity.toString(),
      name: `${capacity} تن`,
    };

    Object.entries(data.revenues).forEach(([revenueType, values]) => {
      const value = values[capacity.toString()];
      if (value !== undefined) {
        point[revenueType] = value;
      }
    });

    return point;
  });

  const colors = ['#3b82f6', '#10b981', '#f59e0b'];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
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
        {Object.keys(data.revenues).map((revenueType, index) => (
          <Line
            key={revenueType}
            type="monotone"
            dataKey={revenueType}
            stroke={colors[index % colors.length]}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

