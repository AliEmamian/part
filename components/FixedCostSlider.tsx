'use client';

interface FixedCostSliderProps {
    fixedCost: number;
    initialFixedCost: number;
    onFixedCostChange: (fixedCost: number) => void;
}

export default function FixedCostSlider({
    fixedCost,
    initialFixedCost,
    onFixedCostChange,
}: FixedCostSliderProps) {
    const minCost = 0;
    const maxCost = 50000;
    const percentage = ((fixedCost - minCost) / (maxCost - minCost)) * 100;
    const initialPercentage = ((initialFixedCost - minCost) / (maxCost - minCost)) * 100;
    const changePercentage = initialFixedCost > 0
        ? ((fixedCost - initialFixedCost) / initialFixedCost) * 100
        : 0;

    return (
        <div className="group rounded-xl bg-gradient-to-br from-white to-red-50 p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:from-slate-800 dark:to-slate-900">
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-gradient-to-br from-red-500 to-pink-600 p-2 shadow-md">
                        <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <h3 className="text-l font-normal text-slate-800 dark:text-slate-100">
                        هزینه ثابت
                    </h3>
                </div>
                <div className="flex items-center gap-3">
                    {changePercentage !== 0 && (
                        <span
                            className={`text-md font-semibold ${changePercentage > 0
                                ? 'text-red-600 dark:text-red-400'
                                : 'text-green-600 dark:text-green-400'
                                }`}
                        >
                            {changePercentage > 0 ? '+' : ''}
                            {changePercentage.toFixed(1)}%
                        </span>
                    )}<div className="rounded-lg bg-gradient-to-r from-red-500 to-pink-600 px-4 py-2 shadow-md">
                        <div className="flex flex-col items-end">
                            <span className="text-md font-bold text-white">
                                {fixedCost.toLocaleString('en-US')}                میلیون تومان

                            </span>
                        </div>
                    </div>

                </div>
            </div>
            <div className="relative">
                {/* Background track (gray) */}
                <div className="absolute top-0 right-0 h-4 w-full rounded-full bg-slate-200 dark:bg-slate-700 pointer-events-none shadow-inner" />
                {/* Filled track (red) - از راست به چپ */}
                <div
                    className="absolute top-0 right-0 h-4 rounded-full bg-gradient-to-r from-red-500 to-pink-600 pointer-events-none shadow-lg transition-all duration-300"
                    style={{
                        width: `${percentage}%`,
                    }}
                />
                {/* نشانگر مقدار پیش‌فرض */}
                {initialFixedCost > 0 && (
                    <div
                        className="absolute top-0 h-4 w-1 bg-yellow-500 dark:bg-yellow-400 pointer-events-none z-20 shadow-md"
                        style={{
                            right: `calc(${initialPercentage}% - 2px)`,
                        }}
                        title={`مقدار پیش‌فرض: ${initialFixedCost.toLocaleString('en-US')}`}
                    >
                        <div className="absolute -top-6 right-1/2 translate-x-1/2 whitespace-nowrap">
                            <div className="relative bg-yellow-500 dark:bg-yellow-400 text-white text-[10px] font-medium px-1.5 py-0.5 rounded shadow-md">
                                {initialFixedCost.toLocaleString('en-US')}
                                <div className="absolute top-full right-1/2 translate-x-1/2 -translate-y-1/2">
                                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-yellow-500 dark:border-t-yellow-400"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <input
                    type="range"
                    min={minCost}
                    max={maxCost}
                    value={fixedCost}
                    onChange={(e) => onFixedCostChange(Number(e.target.value))}
                    step={500}
                    className="w-full h-3 bg-transparent rounded-lg appearance-none cursor-pointer relative z-10"
                    style={{
                        direction: 'rtl',
                    }}
                />
            </div>
            <div className="mt-2 flex justify-between text-sm text-slate-600 dark:text-slate-400">
                <span>{minCost.toLocaleString('en-US')} میلیون تومان</span>
                <span>{maxCost.toLocaleString('en-US')} میلیون تومان</span>
            </div>
        </div>
    );
}

