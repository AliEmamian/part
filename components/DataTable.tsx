'use client';

interface DataTableProps {
  data: {
    capacities: number[];
    revenues: Record<string, Record<string, number>>;
    costs: Record<string, Record<string, number>>;
    profits: Record<string, number>;
    totalRevenue: Record<string, number>;
  };
  selectedCapacity: number;
}

export default function DataTable({ data, selectedCapacity }: DataTableProps) {
  const capacityKey = selectedCapacity.toString();

  const revenueData = Object.entries(data.revenues).map(([type, values]) => ({
    type,
    value: values[capacityKey] || 0,
    category: 'درآمد',
  }));

  const costData = Object.entries(data.costs).map(([type, values]) => ({
    type,
    value: values[capacityKey] || 0,
    category: 'هزینه',
  }));

  const profit = data.profits[capacityKey] || 0;
  const totalRev = data.totalRevenue[capacityKey] || 0;

  return (
    <div className="overflow-x-auto">
      <div className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">
        داده‌های ظرفیت {selectedCapacity.toLocaleString('en-US')} تن
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-slate-100 dark:bg-slate-700">
            <th className="border border-slate-300 px-4 py-2 text-right dark:border-slate-600">
              نوع
            </th>
            <th className="border border-slate-300 px-4 py-2 text-right dark:border-slate-600">
              دسته
            </th>
            <th className="border border-slate-300 px-4 py-2 text-right dark:border-slate-600">
              مقدار (میلیون تومان)
            </th>
          </tr>
        </thead>
        <tbody>
          {revenueData.map((item, index) => (
            <tr
              key={`revenue-${index}`}
              className="hover:bg-slate-50 dark:hover:bg-slate-700/50"
            >
              <td className="border border-slate-300 px-4 py-2 dark:border-slate-600">
                {item.type}
              </td>
              <td className="border border-slate-300 px-4 py-2 text-green-600 dark:text-green-400">
                {item.category}
              </td>
              <td className="border border-slate-300 px-4 py-2 font-medium dark:border-slate-600">
                {item.value.toLocaleString('en-US')}
              </td>
            </tr>
          ))}
          {costData.map((item, index) => (
            <tr
              key={`cost-${index}`}
              className="hover:bg-slate-50 dark:hover:bg-slate-700/50"
            >
              <td className="border border-slate-300 px-4 py-2 dark:border-slate-600">
                {item.type}
              </td>
              <td className="border border-slate-300 px-4 py-2 text-red-600 dark:text-red-400">
                {item.category}
              </td>
              <td className="border border-slate-300 px-4 py-2 font-medium dark:border-slate-600">
                {item.value.toLocaleString('en-US')}
              </td>
            </tr>
          ))}
          <tr className="bg-slate-50 font-semibold dark:bg-slate-800">
            <td className="border border-slate-300 px-4 py-2 dark:border-slate-600">
              جمع درآمدها
            </td>
            <td className="border border-slate-300 px-4 py-2 text-green-600 dark:text-green-400">
              درآمد
            </td>
            <td className="border border-slate-300 px-4 py-2 dark:border-slate-600">
              {totalRev.toLocaleString('en-US')}
            </td>
          </tr>
          <tr
            className={`font-bold ${
              profit >= 0
                ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
            }`}
          >
            <td className="border border-slate-300 px-4 py-2 dark:border-slate-600">
              سود خالص
            </td>
            <td className="border border-slate-300 px-4 py-2 dark:border-slate-600">
              {profit >= 0 ? 'سود' : 'زیان'}
            </td>
            <td className="border border-slate-300 px-4 py-2 dark:border-slate-600">
              {profit.toLocaleString('en-US')}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

