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
  ReferenceLine,
} from 'recharts';
import { calculate, Assumptions } from '@/utils/calculations';

interface ProfitOperatingChartProps {
  assumptions: Assumptions;
  selectedCapacity: number;
  minCapacity: number;
  maxCapacity: number;
}

export default function ProfitOperatingChart({
  assumptions,
  selectedCapacity,
  minCapacity,
  maxCapacity,
}: ProfitOperatingChartProps) {
  // تولید داده‌ها برای نمودار
  const capacities = [];
  const step = (maxCapacity - minCapacity) / 20;
  for (let i = minCapacity; i <= maxCapacity; i += step) {
    capacities.push(Math.round(i));
  }

  const chartData = capacities.map((capacity) => {
    const result = calculate(capacity, assumptions);
    return {
      capacity: capacity.toString(),
      name: `${capacity} تن`,
      'سود عملیاتی': result.profit.operating,
      'جمع هزینه‌ها': result.costs.total,
      'سود خالص': result.profit.net,
      isSelected: capacity === selectedCapacity,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={500}>
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
            direction: 'rtl',
          }}
          formatter={(value: number) => [
            `${value.toLocaleString('en-US')} میلیون تومان`,
            '',
          ]}
        />
        <Legend />
        <ReferenceLine y={0} stroke="#ef4444" strokeDasharray="3 3" />
        <Line
          type="monotone"
          dataKey="سود عملیاتی"
          stroke="#10b981"
          strokeWidth={3}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="جمع هزینه‌ها"
          stroke="#ef4444"
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="سود خالص"
          stroke="#3b82f6"
          strokeWidth={3}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

