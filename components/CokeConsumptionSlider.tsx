'use client';

interface CokeConsumptionSliderProps {
  cokeConsumption: number;
  initialCokeConsumption: number;
  onCokeConsumptionChange: (cokeConsumption: number) => void;
}

export default function CokeConsumptionSlider({
  cokeConsumption,
  initialCokeConsumption,
  onCokeConsumptionChange,
}: CokeConsumptionSliderProps) {
  const minValue = 0;
  const maxValue = 5;
  const percentage = ((cokeConsumption - minValue) / (maxValue - minValue)) * 100;
  const initialPercentage = ((initialCokeConsumption - minValue) / (maxValue - minValue)) * 100;
  const changePercentage = initialCokeConsumption > 0 
    ? ((cokeConsumption - initialCokeConsumption) / initialCokeConsumption) * 100 
    : 0;

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-500/10 dark:bg-gray-400/10">
            <svg className="h-4 w-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xs font-medium text-slate-900 dark:text-slate-100">
              کک مصرفی
            </h3>
          </div>
        </div>
        
        <div className="flex items-baseline gap-1.5">
          {changePercentage !== 0 && (
            <span className={`text-[10px] font-medium ${
              changePercentage > 0
                ? 'text-rose-600 dark:text-rose-400'
                : 'text-emerald-600 dark:text-emerald-400'
            }`}>
              {changePercentage > 0 ? '↑' : '↓'} {Math.abs(changePercentage).toFixed(1)}%
            </span>
          )}
          <div className="text-right">
            <div className="text-base font-bold text-slate-900 dark:text-slate-100">
              {cokeConsumption.toLocaleString('en-US', { maximumFractionDigits: 1 })}
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">تن</div>
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="relative mb-2">
        {/* Track background */}
        <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-700" />
        
        {/* Filled track */}
        <div
          className="absolute top-0 right-0 h-1.5 rounded-full bg-gradient-to-l from-gray-500 to-gray-600 transition-all duration-200"
          style={{ width: `${percentage}%` }}
        />
        
        {/* Initial value marker */}
        {initialCokeConsumption > 0 && initialCokeConsumption !== cokeConsumption && (
          <div
            className="absolute top-0 h-1.5 w-0.5 bg-amber-500 dark:bg-amber-400"
            style={{ right: `calc(${initialPercentage}% - 1px)` }}
          >
            <div className="absolute -top-4 right-1/2 translate-x-1/2">
              <div className="rounded bg-amber-500 px-1 py-0.5 text-[9px] font-medium text-white shadow-sm dark:bg-amber-400">
                {initialCokeConsumption.toLocaleString('en-US', { maximumFractionDigits: 1 })}
              </div>
            </div>
          </div>
        )}
        
        {/* Slider input */}
        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={cokeConsumption}
          onChange={(e) => onCokeConsumptionChange(Number(e.target.value))}
          step={0.1}
          className="absolute top-0 h-1.5 w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-500 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-125 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-gray-500 [&::-moz-range-thumb]:shadow-md"
          style={{ direction: 'rtl' }}
        />
      </div>

      {/* Min/Max labels */}
      <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500">
        <span>{minValue.toLocaleString('en-US')}</span>
        <span>{maxValue.toLocaleString('en-US')}</span>
      </div>
    </div>
  );
}

