'use client';

import { useState } from 'react';
import React from 'react';

interface Assumption {
  label: string;
  value: number;
  unit: string;
  row?: number;
}


interface AssumptionsPanelProps {
  assumptions: Record<string, Assumption>;
  onAssumptionChange: (key: string, value: number) => void;
  onReset: () => void;
}

export default function AssumptionsPanel({
  assumptions,
  onAssumptionChange,
  onReset,
}: AssumptionsPanelProps) {
  const [localAssumptions, setLocalAssumptions] = useState(assumptions);

  // Update local assumptions when props change (e.g., after reset)
  React.useEffect(() => {
    setLocalAssumptions(assumptions);
  }, [assumptions]);

  const handleChange = (key: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setLocalAssumptions((prev) => ({
      ...prev,
      [key]: { ...prev[key], value: numValue },
    }));
    onAssumptionChange(key, numValue);
  };

  // گروه‌بندی فرضیات
  const productionAssumptions = [
    'حداقل تولید ماهانه',
    'حداکثر تولید ماهانه',
    'تولید فعلی ماهانه',
    'سقف مصرف برق',
  ];

  const costAssumptions = [
    'هزینه ثابت',
    'هزینه متغیردر هر تن',
    'پرسنل',
    'حقوق هر نفر',
    'هزینه واحد برق بر تن',
    'سایر هزینه ها',
  ];

  const priceAssumptions = [
    'قیمت دلار',
    'قیمت فروش دلاری هر تن',
    'قیمت کرومیت',
    'قیمت کک',
    'قیمت خاکه',
    'قیمت فلز جیگ و میز',
  ];

  const otherAssumptions = [
    'درصد خاکه',
    'تولید فلز جیگ و میز',
    'حقوق دولتی',
    'کرومیت مصرفی',
    'کک مصرفی',
    'سایر افزودنی ها',
  ];

  const renderInput = (key: string, assumption: Assumption) => {
    const isDollarPrice = key === 'قیمت دلار';
    
    return (
      <div key={key} className="space-y-1 transition-transform duration-200 hover:scale-[1.01]">
        <label className="flex items-center gap-1.5 text-[10px] font-medium text-slate-600 dark:text-slate-400">
          {assumption.label}
          {isDollarPrice && (
            <span className="text-xs font-normal text-green-600 dark:text-green-400">$</span>
          )}
          {assumption.unit && (
            <span className="mr-1 text-[9px] font-normal text-slate-400">({assumption.unit})</span>
          )}
        </label>
        <input
          type="number"
          value={localAssumptions[key].value}
          onChange={(e) => handleChange(key, e.target.value)}
          className="w-full rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-800 shadow-sm transition-all duration-200 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400/30 focus:shadow-sm dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:border-blue-500 dark:focus:ring-blue-500/30"
          step="any"
        />
      </div>
    );
  };

  return (
    <div className="rounded-xl bg-gradient-to-br from-white to-slate-50 p-4 shadow-xl transition-shadow duration-300 hover:shadow-2xl dark:from-slate-800 dark:to-slate-900">
      <div className="mb-4 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 p-2 shadow-md">
            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">
            فرضیات و پارامترها
          </h2>
        </div>
        <button
          onClick={onReset}
          className="flex w-full items-center justify-center gap-1.5 rounded-md bg-gradient-to-r from-slate-500 to-slate-600 px-2.5 py-1.5 text-[10px] font-medium text-white shadow-sm transition-all duration-200 hover:from-slate-600 hover:to-slate-700 hover:shadow-md active:scale-95 dark:from-slate-600 dark:to-slate-700 dark:hover:from-slate-700 dark:hover:to-slate-800"
        >
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>بازنشانی</span>
        </button>
      </div>

      <div>
        {/* سایر فرضیات */}
        <div className="space-y-1.5 rounded-lg bg-slate-50/50 p-2.5 dark:bg-slate-800/50">
          <h3 className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1.5">
            سایر
          </h3>
          {otherAssumptions.map((key) =>
            localAssumptions[key] ? renderInput(key, localAssumptions[key]) : null
          )}
        </div>
      </div>
    </div>
  );
}

