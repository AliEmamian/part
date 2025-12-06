'use client';

interface VariableCostSliderProps {
    variableCost: number;
    initialVariableCost: number;
    onVariableCostChange: (variableCost: number) => void;
}

export default function VariableCostSlider({
    variableCost,
    initialVariableCost,
    onVariableCostChange,
}: VariableCostSliderProps) {
    const minCost = 0;
    const maxCost = 50;
    const percentage = ((variableCost - minCost) / (maxCost - minCost)) * 100;
    const initialPercentage = ((initialVariableCost - minCost) / (maxCost - minCost)) * 100;
    const changePercentage = initialVariableCost > 0
        ? ((variableCost - initialVariableCost) / initialVariableCost) * 100
        : 0;

    return (
        <div className="group rounded-xl bg-gradient-to-br from-white to-orange-50 p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:from-slate-800 dark:to-slate-900">
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 p-2 shadow-md">
                        <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    </div>
                    <h3 className="text-md font-normal text-slate-800 dark:text-slate-100">
                        هزینه متغیر در هر تن
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
                    )}<div className="rounded-lg bg-gradient-to-r from-orange-500 to-amber-600 px-4 py-2 shadow-md">
                        <div className="flex flex-col items-end">
                            <span className="text-sm  text-white">
                                {variableCost.toLocaleString('en-US')}                میلیون تومان

                            </span>

                        </div>
                    </div>

                </div>
            </div>
            <div className="relative">
                {/* Background track (gray) */}
                <div className="absolute top-0 right-0 h-4 w-full rounded-full bg-slate-200 dark:bg-slate-700 pointer-events-none shadow-inner" />
                {/* Filled track (orange) - از راست به چپ */}
                <div
                    className="absolute top-0 right-0 h-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 pointer-events-none shadow-lg transition-all duration-300"
                    style={{
                        width: `${percentage}%`,
                    }}
                />
                {/* نشانگر مقدار پیش‌فرض */}
                {initialVariableCost > 0 && (
                    <div
                        className="absolute top-0 h-4 w-1 bg-yellow-500 dark:bg-yellow-400 pointer-events-none z-20 shadow-md"
                        style={{
                            right: `calc(${initialPercentage}% - 2px)`,
                        }}
                        title={`مقدار پیش‌فرض: ${initialVariableCost.toLocaleString('en-US')}`}
                    >
                        <div className="absolute -top-6 right-1/2 translate-x-1/2 whitespace-nowrap">
                            <div className="relative bg-yellow-500 dark:bg-yellow-400 text-white text-[10px] font-medium px-1.5 py-0.5 rounded shadow-md">
                                {initialVariableCost.toLocaleString('en-US')}
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
                    value={variableCost}
                    onChange={(e) => onVariableCostChange(Number(e.target.value))}
                    step={0.5}
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

