'use client';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

interface CostsPieChartProps {
  costs: {
    fixed: number;
    variable: number;
    coke: number;
    chromite: number;
    electricity: number;
    governmentFee: number;
    other: number;
    total: number;
  };
  revenueTotal: number;
}

// رنگ‌های روشن و واضح با کنتراست بالا
const COLORS = [
  '#ef4444', // قرمز روشن
  '#f97316', // نارنجی
  '#eab308', // زرد
  '#84cc16', // سبز روشن
  '#22c55e', // سبز
  '#3b82f6', // آبی
  '#8b5cf6', // بنفش
  '#ec4899', // صورتی
  '#06b6d4', // فیروزه‌ای
];

// کامپوننت سفارشی برای Label با پس‌زمینه
const CustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
  percentage,
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={10}
      fontWeight="bold"
      style={{
        textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
      }}
    >
      {`${percentage}%`}
    </text>
  );
};

export default function CostsPieChart({
  costs,
  revenueTotal,
}: CostsPieChartProps) {
  const data = [
    {
      name: 'هزینه ثابت',
      value: costs.fixed,
      percentage:
        revenueTotal > 0
          ? ((costs.fixed / revenueTotal) * 100).toFixed(1)
          : '0.0',
    },
    {
      name: 'هزینه متغیر',
      value: costs.variable,
      percentage:
        revenueTotal > 0
          ? ((costs.variable / revenueTotal) * 100).toFixed(1)
          : '0.0',
    },
    {
      name: 'بهای کک',
      value: costs.coke,
      percentage:
        revenueTotal > 0
          ? ((costs.coke / revenueTotal) * 100).toFixed(1)
          : '0.0',
    },
    {
      name: 'بهای کرومیت',
      value: costs.chromite,
      percentage:
        revenueTotal > 0
          ? ((costs.chromite / revenueTotal) * 100).toFixed(1)
          : '0.0',
    },
    {
      name: 'هزینه برق',
      value: costs.electricity,
      percentage:
        revenueTotal > 0
          ? ((costs.electricity / revenueTotal) * 100).toFixed(1)
          : '0.0',
    },
    {
      name: 'حقوق دولتی',
      value: costs.governmentFee,
      percentage:
        revenueTotal > 0
          ? ((costs.governmentFee / revenueTotal) * 100).toFixed(1)
          : '0.0',
    },
    {
      name: 'سایر هزینه‌ها',
      value: costs.other,
      percentage:
        revenueTotal > 0
          ? ((costs.other / revenueTotal) * 100).toFixed(1)
          : '0.0',
    },
  ].filter((item) => item.value > 0);

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="45%"
          labelLine={false}
          label={(props) => (
            <CustomLabel {...props} percentage={props.percentage} />
          )}
          outerRadius={60}
          innerRadius={25}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            direction: 'rtl',
            fontSize: '11px',
          }}
          formatter={(value: number, name: string) => [
            `${value.toLocaleString('en-US')} میلیون تومان`,
            name,
          ]}
        />
        <Legend
          verticalAlign="bottom"
          height={40}
          iconType="circle"
          iconSize={6}
          wrapperStyle={{
            paddingTop: '10px',
            fontSize: '10px',
            fontWeight: '500',
            color: '#ffffff',
          }}
          formatter={(value: string, entry: any) => {
            const dataItem = data.find((d) => d.name === value);
            return (
              <span style={{ color: '#ffffff', fontSize: '10px', fontWeight: '600', marginRight: '4px' }}>
                {value} ({dataItem?.percentage}%)
              </span>
            );
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

