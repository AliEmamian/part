'use client';

interface InputControlsProps {
  capacities: number[];
  selectedCapacity: number;
  onCapacityChange: (capacity: number) => void;
  assumptions: {
    minProduction: number;
    maxProduction: number;
    currentProduction: number;
  };
}

export default function InputControls({
  capacities,
  selectedCapacity,
  onCapacityChange,
  assumptions,
}: InputControlsProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-slate-800">
      <h3 className="mb-4 text-xl font-semibold text-slate-800 dark:text-slate-100">
        تنظیمات ظرفیت تولید
      </h3>
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            ظرفیت تولید ماهانه (تن)
          </label>
          <select
            value={selectedCapacity}
            onChange={(e) => onCapacityChange(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
          >
            {capacities.map((capacity) => (
              <option key={capacity} value={capacity}>
                {capacity.toLocaleString('fa-IR')} تن
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-700">
            <div className="text-slate-600 dark:text-slate-400">حداقل</div>
            <div className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              {assumptions.minProduction.toLocaleString('fa-IR')} تن
            </div>
          </div>
          <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-700">
            <div className="text-slate-600 dark:text-slate-400">فعلی</div>
            <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
              {assumptions.currentProduction.toLocaleString('fa-IR')} تن
            </div>
          </div>
          <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-700">
            <div className="text-slate-600 dark:text-slate-400">حداکثر</div>
            <div className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              {assumptions.maxProduction.toLocaleString('fa-IR')} تن
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

