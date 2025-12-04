'use client';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

interface CostBreakdownChartProps {
  data: {
    costs: Record<string, Record<string, number>>;
  };
  selectedCapacity: number;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function CostBreakdownChart({
  data,
  selectedCapacity,
}: CostBreakdownChartProps) {
  const capacityKey = selectedCapacity.toString();
  const costData = Object.entries(data.costs)
    .map(([costType, values]) => {
      const value = values[capacityKey];
      return value !== undefined ? { name: costType, value } : null;
    })
    .filter((item): item is { name: string; value: number } => item !== null);

  const totalCost = costData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={costData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(1)}%`
            }
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {costData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [
              `${value.toLocaleString('en-US')} میلیون تومان`,
              '',
            ]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 text-center">
        <div className="text-sm text-slate-600 dark:text-slate-400">
          مجموع هزینه‌ها
        </div>
        <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          {totalCost.toLocaleString('en-US')} میلیون تومان
        </div>
      </div>
    </div>
  );
}

