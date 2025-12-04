'use client';

import { useState, useEffect } from 'react';
import AssumptionsPanel from '@/components/AssumptionsPanel';
import CapacitySlider from '@/components/CapacitySlider';
import RevenuePieChart from '@/components/RevenuePieChart';
import CostsPieChart from '@/components/CostsPieChart';
import { calculate, Assumptions } from '@/utils/calculations';

export default function Home() {
  const [assumptions, setAssumptions] = useState<Assumptions>({});
  const [initialAssumptions, setInitialAssumptions] = useState<Assumptions>({});
  const [selectedCapacity, setSelectedCapacity] = useState<number>(2000);
  const [initialCapacity, setInitialCapacity] = useState<number>(2000);
  const [loading, setLoading] = useState(true);
  const [calculationResult, setCalculationResult] = useState(
    calculate(2000, {})
  );

  useEffect(() => {
    // بارگذاری فرضیات
    fetch('/assumptions.json')
      .then((res) => res.json())
      .then((data) => {
        setAssumptions(data);
        setInitialAssumptions(JSON.parse(JSON.stringify(data))); // Deep copy
        const minCapacity = data['حداقل تولید ماهانه']?.value || 500;
        const maxCapacity = data['حداکثر تولید ماهانه']?.value || 3000;
        const currentCapacity = data['تولید فعلی ماهانه']?.value || 2000;
        setSelectedCapacity(currentCapacity);
        setInitialCapacity(currentCapacity);
        setCalculationResult(calculate(currentCapacity, data));
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading assumptions:', err);
        setLoading(false);
      });
  }, []);

  const handleAssumptionChange = (key: string, value: number) => {
    const updatedAssumptions = {
      ...assumptions,
      [key]: { ...assumptions[key], value },
    };
    setAssumptions(updatedAssumptions);
    setCalculationResult(calculate(selectedCapacity, updatedAssumptions));
  };

  const handleCapacityChange = (capacity: number) => {
    setSelectedCapacity(capacity);
    setCalculationResult(calculate(capacity, assumptions));
  };

  const handleReset = () => {
    const resetAssumptions = JSON.parse(JSON.stringify(initialAssumptions)); // Deep copy
    setAssumptions(resetAssumptions);
    setSelectedCapacity(initialCapacity);
    setCalculationResult(calculate(initialCapacity, resetAssumptions));
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-xl font-normal text-slate-700 dark:text-slate-300">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  const minCapacity = assumptions['حداقل  تولید ماهانه']?.value || 500;
  const maxCapacity = assumptions['حداکثر تولید ماهانه']?.value || 3000;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-12 text-center">
          
          <h1 className="mb-3 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-5xl font-normal text-transparent dark:from-slate-100 dark:to-slate-300">
            داشبورد تحلیل فروکروم جغتای
          </h1>
          <p className="text-xl font-normal text-slate-600 dark:text-slate-400">
            تحلیل درآمد، هزینه و سود بر اساس ظرفیت تولید
          </p>
        </header>

        {/* Assumptions Panel */}
        <div className="mb-8">
          <AssumptionsPanel
            assumptions={assumptions}
            onAssumptionChange={handleAssumptionChange}
            onReset={handleReset}
          />
        </div>

        {/* Capacity Slider */}
        <div className="mb-8">
          <CapacitySlider
            capacity={selectedCapacity}
            initialCapacity={initialCapacity}
            onCapacityChange={handleCapacityChange}
          />
        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:from-slate-800 dark:to-slate-900">
            <div className="absolute top-0 right-0 h-20 w-20 rounded-bl-full bg-gradient-to-br from-green-400/20 to-transparent"></div>
            <div className="relative">
              <div className="mb-3 flex items-center gap-2">
                <div className="rounded-lg bg-green-100 p-2 dark:bg-green-900/30">
                  <svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-sm font-normal text-slate-600 dark:text-slate-400">
                  سود عملیاتی
                </h3>
              </div>
              <div className="flex items-baseline gap-2">
                <p
                  className={`text-3xl font-bold transition-colors ${
                    calculationResult.profit.operating >= 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {(calculationResult.profit.operating ).toLocaleString('en-US')}
                </p>
                <span className="text-sm font-medium text-slate-500">
                  ({calculationResult.revenue.total > 0 
                    ? ((calculationResult.profit.operating / calculationResult.revenue.total) * 100).toFixed(1)
                    : '0.0'}%)
                </span>
              </div>
              <p className="mt-2 text-xs font-medium text-slate-500">میلیون تومان</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:from-slate-800 dark:to-slate-900">
            <div className="absolute top-0 right-0 h-20 w-20 rounded-bl-full bg-gradient-to-br from-red-400/20 to-transparent"></div>
            <div className="relative">
              <div className="mb-3 flex items-center gap-2">
                <div className="rounded-lg bg-red-100 p-2 dark:bg-red-900/30">
                  <svg className="h-5 w-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-normal text-slate-600 dark:text-slate-400">
                  جمع هزینه‌ها
                </h3>
              </div>
              <p className="text-3xl font-bold text-red-600 transition-colors dark:text-red-400">
                {(calculationResult.costs.total ).toLocaleString('en-US')}
              </p>
              <p className="mt-2 text-xs font-medium text-slate-500">میلیون تومان</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:from-slate-800 dark:to-slate-900">
            <div className="absolute top-0 right-0 h-20 w-20 rounded-bl-full bg-gradient-to-br from-blue-400/20 to-transparent"></div>
            <div className="relative">
              <div className="mb-3 flex items-center gap-2">
                <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                  <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-normal text-slate-600 dark:text-slate-400">
                  سود خالص
                </h3>
              </div>
              <div className="flex items-baseline gap-2">
                <p
                  className={`text-3xl font-bold transition-colors ${
                    calculationResult.profit.net >= 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {(calculationResult.profit.net ).toLocaleString('en-US')}
                </p>
                <span className="text-sm font-medium text-slate-500">
                  ({calculationResult.revenue.total > 0 
                    ? ((calculationResult.profit.net / calculationResult.revenue.total) * 100).toFixed(1)
                    : '0.0'}%)
                </span>
              </div>
              <p className="mt-2 text-xs font-medium text-slate-500">میلیون تومان</p>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="mb-8 rounded-xl bg-gradient-to-br from-white to-slate-50 p-8 shadow-xl transition-shadow duration-300 hover:shadow-2xl dark:from-slate-800 dark:to-slate-900">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-2">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-2xl font-normal text-slate-800 dark:text-slate-100">
              جزئیات محاسبات برای ظرفیت <span className="text-blue-600 dark:text-blue-400">{selectedCapacity.toLocaleString('en-US')} تن</span>
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-lg font-normal text-green-600 dark:text-green-400">
                درآمدها (میلیون تومان)
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center rounded-lg bg-green-50/50 px-3 py-2 transition-colors duration-200 hover:bg-green-100/50 dark:bg-green-900/10 dark:hover:bg-green-900/20">
                  <span className="font-medium text-slate-700 dark:text-slate-300">فروش کلوخه:</span>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">
                      {(calculationResult.revenue.klohe ).toLocaleString('en-US')}
                    </span>
                    <span className="text-sm text-slate-500">
                      ({calculationResult.revenue.total > 0 
                        ? ((calculationResult.revenue.klohe / calculationResult.revenue.total) * 100).toFixed(1)
                        : '0.0'}%)
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center rounded-lg bg-green-50/50 px-3 py-2 transition-colors duration-200 hover:bg-green-100/50 dark:bg-green-900/10 dark:hover:bg-green-900/20">
                  <span className="font-medium text-slate-700 dark:text-slate-300">فروش خاکه:</span>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">
                      {(calculationResult.revenue.khake ).toLocaleString('en-US')}
                    </span>
                    <span className="text-sm text-slate-500">
                      ({calculationResult.revenue.total > 0 
                        ? ((calculationResult.revenue.khake / calculationResult.revenue.total) * 100).toFixed(1)
                        : '0.0'}%)
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center rounded-lg bg-green-50/50 px-3 py-2 transition-colors duration-200 hover:bg-green-100/50 dark:bg-green-900/10 dark:hover:bg-green-900/20">
                  <span className="font-medium text-slate-700 dark:text-slate-300">فروش جیگ و میز:</span>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">
                      {(calculationResult.revenue.jigMiz ).toLocaleString('en-US')}
                    </span>
                    <span className="text-sm text-slate-500">
                      ({calculationResult.revenue.total > 0 
                        ? ((calculationResult.revenue.jigMiz / calculationResult.revenue.total) * 100).toFixed(1)
                        : '0.0'}%)
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center rounded-lg border-2 border-green-200 bg-green-50 px-4 py-3 font-bold dark:border-green-800 dark:bg-green-900/20">
                  <span className="text-green-700 dark:text-green-300">جمع درآمدها:</span>
                  <div className="flex items-center gap-4">
                    <span className="text-green-600 dark:text-green-400">
                      {(calculationResult.revenue.total ).toLocaleString('en-US')}
                    </span>
                    <span className="text-sm text-slate-500">
                      (100.0%)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-normal text-red-600 dark:text-red-400">
                هزینه‌ها (میلیون تومان)
              </h3>
              <div className="space-y-2">
                {/* هزینه‌های عملیاتی */}
                <div className="mb-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                  هزینه‌های عملیاتی:
                </div>
                <div className="mr-4 space-y-3">
                  <div className="flex justify-between items-center rounded-lg bg-red-50/50 px-3 py-2 transition-colors duration-200 hover:bg-red-100/50 dark:bg-red-900/10 dark:hover:bg-red-900/20">
                    <span className="font-medium text-slate-700 dark:text-slate-300">هزینه ثابت:</span>
                    <div className="flex items-center gap-4">
                      <span className="font-medium">
                        {(calculationResult.costs.fixed ).toLocaleString('en-US')}
                      </span>
                      <span className="text-sm text-slate-500">
                        ({calculationResult.revenue.total > 0 
                          ? ((calculationResult.costs.fixed / calculationResult.revenue.total) * 100).toFixed(1)
                          : '0.0'}%)
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center rounded-lg bg-red-50/50 px-3 py-2 transition-colors duration-200 hover:bg-red-100/50 dark:bg-red-900/10 dark:hover:bg-red-900/20">
                    <span className="font-medium text-slate-700 dark:text-slate-300">هزینه متغیر:</span>
                    <div className="flex items-center gap-4">
                      <span className="font-medium">
                        {(calculationResult.costs.variable ).toLocaleString('en-US')}
                      </span>
                      <span className="text-sm text-slate-500">
                        ({calculationResult.revenue.total > 0 
                          ? ((calculationResult.costs.variable / calculationResult.revenue.total) * 100).toFixed(1)
                          : '0.0'}%)
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center rounded-lg bg-red-50/50 px-3 py-2 transition-colors duration-200 hover:bg-red-100/50 dark:bg-red-900/10 dark:hover:bg-red-900/20">
                    <span className="font-medium text-slate-700 dark:text-slate-300">بهای کک:</span>
                    <div className="flex items-center gap-4">
                      <span className="font-medium">
                        {(calculationResult.costs.coke ).toLocaleString('en-US')}
                      </span>
                      <span className="text-sm text-slate-500">
                        ({calculationResult.revenue.total > 0 
                          ? ((calculationResult.costs.coke / calculationResult.revenue.total) * 100).toFixed(1)
                          : '0.0'}%)
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center rounded-lg bg-red-50/50 px-3 py-2 transition-colors duration-200 hover:bg-red-100/50 dark:bg-red-900/10 dark:hover:bg-red-900/20">
                    <span className="font-medium text-slate-700 dark:text-slate-300">بهای کرومیت:</span>
                    <div className="flex items-center gap-4">
                      <span className="font-medium">
                        {(calculationResult.costs.chromite ).toLocaleString('en-US')}
                      </span>
                      <span className="text-sm text-slate-500">
                        ({calculationResult.revenue.total > 0 
                          ? ((calculationResult.costs.chromite / calculationResult.revenue.total) * 100).toFixed(1)
                          : '0.0'}%)
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center rounded-lg bg-red-50/50 px-3 py-2 transition-colors duration-200 hover:bg-red-100/50 dark:bg-red-900/10 dark:hover:bg-red-900/20">
                    <span className="font-medium text-slate-700 dark:text-slate-300">هزینه برق:</span>
                    <div className="flex items-center gap-4">
                      <span className="font-medium">
                        {(calculationResult.costs.electricity ).toLocaleString('en-US')}
                      </span>
                      <span className="text-sm text-slate-500">
                        ({calculationResult.revenue.total > 0 
                          ? ((calculationResult.costs.electricity / calculationResult.revenue.total) * 100).toFixed(1)
                          : '0.0'}%)
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center rounded-lg bg-red-50/50 px-3 py-2 transition-colors duration-200 hover:bg-red-100/50 dark:bg-red-900/10 dark:hover:bg-red-900/20">
                    <span className="font-medium text-slate-700 dark:text-slate-300">سایر هزینه‌ها:</span>
                    <div className="flex items-center gap-4">
                      <span className="font-medium">
                        {(calculationResult.costs.other ).toLocaleString('en-US')}
                      </span>
                      <span className="text-sm text-slate-500">
                        ({calculationResult.revenue.total > 0 
                          ? ((calculationResult.costs.other / calculationResult.revenue.total) * 100).toFixed(1)
                          : '0.0'}%)
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* جمع هزینه‌های عملیاتی */}
                <div className="mt-4 flex justify-between items-center rounded-lg border-2 border-orange-200 bg-orange-50 px-4 py-3 font-semibold dark:border-orange-800 dark:bg-orange-900/20">
                  <span className="text-orange-700 dark:text-orange-300">جمع هزینه‌های عملیاتی:</span>
                  <div className="flex items-center gap-4">
                    <span className="text-orange-600 dark:text-orange-400">
                      {((calculationResult.costs.fixed +
                        calculationResult.costs.variable +
                        calculationResult.costs.coke +
                        calculationResult.costs.chromite +
                        calculationResult.costs.electricity +
                        calculationResult.costs.other) ).toLocaleString('en-US')}
                    </span>
                    <span className="text-sm text-slate-500">
                      ({calculationResult.revenue.total > 0 
                        ? (((calculationResult.costs.fixed +
                          calculationResult.costs.variable +
                          calculationResult.costs.coke +
                          calculationResult.costs.chromite +
                          calculationResult.costs.electricity +
                          calculationResult.costs.other) / calculationResult.revenue.total) * 100).toFixed(1)
                        : '0.0'}%)
                    </span>
                  </div>
                </div>

                {/* حقوق دولتی */}
                <div className="mt-4 flex justify-between items-center rounded-lg border-2 border-blue-200 bg-blue-50 px-4 py-3 dark:border-blue-800 dark:bg-blue-900/20">
                  <span className="font-semibold text-blue-700 dark:text-blue-300">حقوق دولتی:</span>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      {(calculationResult.costs.governmentFee ).toLocaleString('en-US')}
                    </span>
                    <span className="text-sm text-slate-500">
                      ({calculationResult.revenue.total > 0 
                        ? ((calculationResult.costs.governmentFee / calculationResult.revenue.total) * 100).toFixed(1)
                        : '0.0'}%)
                    </span>
                  </div>
                </div>

                {/* جمع کل هزینه‌ها */}
                <div className="mt-4 flex justify-between items-center rounded-lg border-2 border-red-300 bg-red-50 px-4 py-3 font-bold text-lg dark:border-red-700 dark:bg-red-900/20">
                  <span className="text-red-700 dark:text-red-300">جمع کل هزینه‌ها:</span>
                  <div className="flex items-center gap-4">
                    <span className="text-red-600 dark:text-red-400">
                      {(calculationResult.costs.total ).toLocaleString('en-US')}
                    </span>
                    <span className="text-sm text-slate-500">
                      ({calculationResult.revenue.total > 0 
                        ? ((calculationResult.costs.total / calculationResult.revenue.total) * 100).toFixed(1)
                        : '0.0'}%)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <div className="group rounded-xl bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-slate-800 dark:to-slate-900">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 p-2">
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <h2 className="text-xl font-normal text-slate-800 dark:text-slate-100">
                نمودار سهم از فروش - درآمدها
              </h2>
            </div>
            <RevenuePieChart revenue={calculationResult.revenue} />
          </div>

          <div className="group rounded-xl bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-slate-800 dark:to-slate-900">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-gradient-to-br from-red-400 to-pink-500 p-2">
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <h2 className="text-xl font-normal text-slate-800 dark:text-slate-100">
                نمودار سهم از فروش - هزینه‌ها
              </h2>
            </div>
            <CostsPieChart
              costs={calculationResult.costs}
              revenueTotal={calculationResult.revenue.total}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
