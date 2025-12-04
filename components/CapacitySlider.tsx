'use client';

interface CapacitySliderProps {
  capacity: number;
  initialCapacity: number;
  onCapacityChange: (capacity: number) => void;
}

export default function CapacitySlider({
  capacity,
  initialCapacity,
  onCapacityChange,
}: CapacitySliderProps) {
  const minCapacity = 0;
  const maxCapacity = 3000;
  const percentage = ((capacity - minCapacity) / (maxCapacity - minCapacity)) * 100;
  const initialPercentage = ((initialCapacity - minCapacity) / (maxCapacity - minCapacity)) * 100;
  const changePercentage = initialCapacity > 0 
    ? ((capacity - initialCapacity) / initialCapacity) * 100 
    : 0;

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
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 shadow-md">
            <span className="text-2xl font-bold text-white">
              {capacity.toLocaleString('en-US')} تن
            </span>
          </div>
          {changePercentage !== 0 && (
            <span
              className={`text-lg font-semibold ${
                changePercentage > 0
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {changePercentage > 0 ? '+' : ''}
              {changePercentage.toFixed(1)}%
            </span>
          )}
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
        {/* نشانگر مقدار پیش‌فرض */}
        {initialCapacity > 0 && (
          <div
            className="absolute top-0 h-4 w-1 bg-yellow-500 dark:bg-yellow-400 pointer-events-none z-20 shadow-md"
            style={{
              right: `calc(${initialPercentage}% - 2px)`,
            }}
            title={`مقدار پیش‌فرض: ${initialCapacity.toLocaleString('en-US')} تن`}
          >
            <div className="absolute -top-6 right-1/2 translate-x-1/2 whitespace-nowrap">
              <div className="relative bg-yellow-500 dark:bg-yellow-400 text-white text-[10px] font-medium px-1.5 py-0.5 rounded shadow-md">
                {initialCapacity.toLocaleString('en-US')}
                <div className="absolute top-full right-1/2 translate-x-1/2 -translate-y-1/2">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-yellow-500 dark:border-t-yellow-400"></div>
                </div>
              </div>
            </div>
          </div>
        )}
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

