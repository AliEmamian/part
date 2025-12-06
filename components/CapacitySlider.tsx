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
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 dark:bg-blue-400/10">
            <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">
              ظرفیت تولید ماهانه
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">تن</p>
          </div>
        </div>
        
        <div className="flex items-baseline gap-2">
          {changePercentage !== 0 && (
            <span className={`text-xs font-medium ${
              changePercentage > 0
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-rose-600 dark:text-rose-400'
            }`}>
              {changePercentage > 0 ? '↑' : '↓'} {Math.abs(changePercentage).toFixed(1)}%
            </span>
          )}
          <div className="text-right">
            <div className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {capacity.toLocaleString('en-US')}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">تن</div>
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="relative mb-3">
        {/* Track background */}
        <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-700" />
        
        {/* Filled track */}
        <div
          className="absolute top-0 right-0 h-2 rounded-full bg-gradient-to-l from-blue-500 to-blue-600 transition-all duration-200"
          style={{ width: `${percentage}%` }}
        />
        
        {/* Initial value marker */}
        {initialCapacity > 0 && initialCapacity !== capacity && (
          <div
            className="absolute top-0 h-2 w-0.5 bg-amber-500 dark:bg-amber-400"
            style={{ right: `calc(${initialPercentage}% - 1px)` }}
          >
            <div className="absolute -top-5 right-1/2 translate-x-1/2">
              <div className="rounded bg-amber-500 px-1.5 py-0.5 text-[10px] font-medium text-white shadow-sm dark:bg-amber-400">
                {initialCapacity.toLocaleString('en-US')}
              </div>
            </div>
          </div>
        )}
        
        {/* Slider input */}
        <input
          type="range"
          min={minCapacity}
          max={maxCapacity}
          value={capacity}
          onChange={(e) => onCapacityChange(Number(e.target.value))}
          step={50}
          className="absolute top-0 h-2 w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-125 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:shadow-lg"
          style={{ direction: 'rtl' }}
        />
      </div>

      {/* Min/Max labels */}
      <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500">
        <span>{minCapacity.toLocaleString('en-US')}</span>
        <span>{maxCapacity.toLocaleString('en-US')}</span>
      </div>
    </div>
  );
}
