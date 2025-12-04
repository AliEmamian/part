'use client';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

interface RevenuePieChartProps {
  revenue: {
    klohe: number;
    khake: number;
    jigMiz: number;
    total: number;
  };
}

// رنگ‌های روشن و واضح با کنتراست بالا
const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

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
      fontSize={14}
      fontWeight="bold"
      style={{
        textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
      }}
    >
      {`${percentage}%`}
    </text>
  );
};

export default function RevenuePieChart({ revenue }: RevenuePieChartProps) {
  const data = [
    {
      name: 'فروش کلوخه',
      value: revenue.klohe,
      percentage:
        revenue.total > 0
          ? ((revenue.klohe / revenue.total) * 100).toFixed(1)
          : '0.0',
    },
    {
      name: 'فروش خاکه',
      value: revenue.khake,
      percentage:
        revenue.total > 0
          ? ((revenue.khake / revenue.total) * 100).toFixed(1)
          : '0.0',
    },
    {
      name: 'فروش جیگ و میز',
      value: revenue.jigMiz,
      percentage:
        revenue.total > 0
          ? ((revenue.jigMiz / revenue.total) * 100).toFixed(1)
          : '0.0',
    },
  ].filter((item) => item.value > 0);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="45%"
          labelLine={false}
          label={(props) => (
            <CustomLabel {...props} percentage={props.percentage} />
          )}
          outerRadius={120}
          innerRadius={50}
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
          }}
          formatter={(value: number, name: string) => [
            `${value.toLocaleString('en-US')} میلیون تومان`,
            name,
          ]}
        />
        <Legend
          verticalAlign="bottom"
          height={60}
          iconType="circle"
          iconSize={10}
          wrapperStyle={{
            paddingTop: '20px',
            fontSize: '13px',
            fontWeight: '500',
            color: '#ffffff',
          }}
          formatter={(value: string, entry: any) => {
            const dataItem = data.find((d) => d.name === value);
            return (
              <span style={{ color: '#ffffff', fontSize: '13px', fontWeight: '600', marginRight: '8px' }}>
                {value} ({dataItem?.percentage}%)
              </span>
            );
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

