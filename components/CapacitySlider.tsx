'use client';

interface CapacitySliderProps {
  capacity: number;
  onCapacityChange: (capacity: number) => void;
}

export default function CapacitySlider({
  capacity,
  onCapacityChange,
}: CapacitySliderProps) {
  const minCapacity = 0;
  const maxCapacity = 3000;
  const percentage = ((capacity - minCapacity) / (maxCapacity - minCapacity)) * 100;

  return (
    <div className="group rounded-xl bg-gradient-to-br from-white to-blue-50 p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:from-slate-800 dark:to-slate-900">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 p-2 shadow-md">
            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-normal text-slate-800 dark:text-slate-100">
            ظرفیت تولید ماهانه
          </h3>
        </div>
        <div className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 shadow-md">
          <span className="text-2xl font-bold text-white">
            {capacity.toLocaleString('en-US')} تن
          </span>
        </div>
      </div>
      <div className="relative">
        {/* Background track (gray) */}
        <div className="absolute top-0 right-0 h-4 w-full rounded-full bg-slate-200 dark:bg-slate-700 pointer-events-none shadow-inner" />
        {/* Filled track (blue) - از راست به چپ */}
        <div
          className="absolute top-0 right-0 h-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 pointer-events-none shadow-lg transition-all duration-300"
          style={{
            width: `${percentage}%`,
          }}
        />
        <input
          type="range"
          min={minCapacity}
          max={maxCapacity}
          value={capacity}
          onChange={(e) => onCapacityChange(Number(e.target.value))}
          step={50}
          className="w-full h-3 bg-transparent rounded-lg appearance-none cursor-pointer relative z-10"
          style={{
            direction: 'rtl',
          }}
        />
      </div>
      <div className="mt-2 flex justify-between text-sm text-slate-600 dark:text-slate-400">
        <span>{minCapacity.toLocaleString('en-US')} تن</span>
        <span>{maxCapacity.toLocaleString('en-US')} تن</span>
      </div>
    </div>
  );
}

