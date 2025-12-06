'use client';

interface JigMizPriceSliderProps {
  jigMizPrice: number;
  initialJigMizPrice: number;
  onJigMizPriceChange: (jigMizPrice: number) => void;
}

export default function JigMizPriceSlider({
  jigMizPrice,
  initialJigMizPrice,
  onJigMizPriceChange,
}: JigMizPriceSliderProps) {
  const minPrice = 0;
  const maxPrice = 200;
  const percentage = ((jigMizPrice - minPrice) / (maxPrice - minPrice)) * 100;
  const initialPercentage = ((initialJigMizPrice - minPrice) / (maxPrice - minPrice)) * 100;
  const changePercentage = initialJigMizPrice > 0 
    ? ((jigMizPrice - initialJigMizPrice) / initialJigMizPrice) * 100 
    : 0;

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/10 dark:bg-indigo-400/10">
            <svg className="h-4 w-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xs font-medium text-slate-900 dark:text-slate-100">
               فلز جیگ و میز
            </h3>
            {/* <p className="text-[10px] text-slate-500 dark:text-slate-400">میلیون تومان</p> */}
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
              {jigMizPrice.toLocaleString('en-US')}
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">میلیون تومان</div>
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="relative mb-2">
        {/* Track background */}
        <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-700" />
        
        {/* Filled track */}
        <div
          className="absolute top-0 right-0 h-1.5 rounded-full bg-gradient-to-l from-indigo-500 to-indigo-600 transition-all duration-200"
          style={{ width: `${percentage}%` }}
        />
        
        {/* Initial value marker */}
        {initialJigMizPrice > 0 && initialJigMizPrice !== jigMizPrice && (
          <div
            className="absolute top-0 h-1.5 w-0.5 bg-amber-500 dark:bg-amber-400"
            style={{ right: `calc(${initialPercentage}% - 1px)` }}
          >
            <div className="absolute -top-4 right-1/2 translate-x-1/2">
              <div className="rounded bg-amber-500 px-1 py-0.5 text-[9px] font-medium text-white shadow-sm dark:bg-amber-400">
                {initialJigMizPrice.toLocaleString('en-US')}
              </div>
            </div>
          </div>
        )}
        
        {/* Slider input */}
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={jigMizPrice}
          onChange={(e) => onJigMizPriceChange(Number(e.target.value))}
          step={1}
          className="absolute top-0 h-1.5 w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-125 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-indigo-500 [&::-moz-range-thumb]:shadow-md"
          style={{ direction: 'rtl' }}
        />
      </div>

      {/* Min/Max labels */}
      <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500">
        <span>{minPrice.toLocaleString('en-US')}</span>
        <span>{maxPrice.toLocaleString('en-US')}</span>
      </div>
    </div>
  );
}

