'use client';

interface DollarPriceSliderProps {
  dollarPrice: number;
  initialDollarPrice: number;
  onDollarPriceChange: (dollarPrice: number) => void;
}

export default function DollarPriceSlider({
  dollarPrice,
  initialDollarPrice,
  onDollarPriceChange,
}: DollarPriceSliderProps) {
  const minPrice = 0;
  const maxPrice = 0.2;
  const percentage = ((dollarPrice - minPrice) / (maxPrice - minPrice)) * 100;
  const initialPercentage = ((initialDollarPrice - minPrice) / (maxPrice - minPrice)) * 100;
  const changePercentage = initialDollarPrice > 0 
    ? ((dollarPrice - initialDollarPrice) / initialDollarPrice) * 100 
    : 0;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 dark:bg-emerald-400/10">
            <svg className="h-5 w-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">
              قیمت دلار
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">میلیون تومان</p>
          </div>
        </div>
        
        <div className="flex items-baseline gap-2">
          {changePercentage !== 0 && (
            <span className={`text-xs font-medium ${
              changePercentage > 0
                ? 'text-rose-600 dark:text-rose-400'
                : 'text-emerald-600 dark:text-emerald-400'
            }`}>
              {changePercentage > 0 ? '↑' : '↓'} {Math.abs(changePercentage).toFixed(1)}%
            </span>
          )}
          <div className="text-right">
            <div className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {dollarPrice.toFixed(3)}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">میلیون تومان</div>
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="relative mb-3">
        {/* Track background */}
        <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-700" />
        
        {/* Filled track */}
        <div
          className="absolute top-0 right-0 h-2 rounded-full bg-gradient-to-l from-emerald-500 to-emerald-600 transition-all duration-200"
          style={{ width: `${percentage}%` }}
        />
        
        {/* Initial value marker */}
        {initialDollarPrice > 0 && initialDollarPrice !== dollarPrice && (
          <div
            className="absolute top-0 h-2 w-0.5 bg-amber-500 dark:bg-amber-400"
            style={{ right: `calc(${initialPercentage}% - 1px)` }}
          >
            <div className="absolute -top-5 right-1/2 translate-x-1/2">
              <div className="rounded bg-amber-500 px-1.5 py-0.5 text-[10px] font-medium text-white shadow-sm dark:bg-amber-400">
                {initialDollarPrice.toFixed(3)}
              </div>
            </div>
          </div>
        )}
        
        {/* Slider input */}
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={dollarPrice}
          onChange={(e) => onDollarPriceChange(Number(e.target.value))}
          step={0.001}
          className="absolute top-0 h-2 w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-500 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-125 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-emerald-500 [&::-moz-range-thumb]:shadow-lg"
          style={{ direction: 'rtl' }}
        />
      </div>

      {/* Min/Max labels */}
      <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500">
        <span>{minPrice.toFixed(3)}</span>
        <span>{maxPrice.toFixed(3)}</span>
      </div>
    </div>
  );
}
