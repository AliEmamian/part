'use client';

import { useState, useEffect } from 'react';
import AssumptionsPanel from '@/components/AssumptionsPanel';
import CapacitySlider from '@/components/CapacitySlider';
import FixedCostSlider from '@/components/FixedCostSlider';
import VariableCostSlider from '@/components/VariableCostSlider';
import ElectricityCostSlider from '@/components/ElectricityCostSlider';
import DollarPriceSlider from '@/components/DollarPriceSlider';
import ChromitePriceSlider from '@/components/ChromitePriceSlider';
import CokePriceSlider from '@/components/CokePriceSlider';
import KhakePriceSlider from '@/components/KhakePriceSlider';
import JigMizPriceSlider from '@/components/JigMizPriceSlider';
import KhakePercentageSlider from '@/components/KhakePercentageSlider';
import JigMizProductionSlider from '@/components/JigMizProductionSlider';
import ChromiteConsumptionSlider from '@/components/ChromiteConsumptionSlider';
import CokeConsumptionSlider from '@/components/CokeConsumptionSlider';
import RevenuePieChart from '@/components/RevenuePieChart';
import CostsPieChart from '@/components/CostsPieChart';
import { calculate, Assumptions } from '@/utils/calculations';

export default function Home() {
  const [assumptions, setAssumptions] = useState<Assumptions>({});
  const [initialAssumptions, setInitialAssumptions] = useState<Assumptions>({});
  const [selectedCapacity, setSelectedCapacity] = useState<number>(2000);
  const [initialCapacity, setInitialCapacity] = useState<number>(2000);
  const [fixedCost, setFixedCost] = useState<number>(20000);
  const [initialFixedCost, setInitialFixedCost] = useState<number>(20000);
  const [variableCost, setVariableCost] = useState<number>(15);
  const [initialVariableCost, setInitialVariableCost] = useState<number>(15);
  const [electricityCost, setElectricityCost] = useState<number>(5);
  const [initialElectricityCost, setInitialElectricityCost] = useState<number>(5);
  const [dollarPrice, setDollarPrice] = useState<number>(0.08);
  const [initialDollarPrice, setInitialDollarPrice] = useState<number>(0.08);
  const [chromitePrice, setChromitePrice] = useState<number>(22);
  const [initialChromitePrice, setInitialChromitePrice] = useState<number>(22);
  const [cokePrice, setCokePrice] = useState<number>(20);
  const [initialCokePrice, setInitialCokePrice] = useState<number>(20);
  const [khakePrice, setKhakePrice] = useState<number>(90);
  const [initialKhakePrice, setInitialKhakePrice] = useState<number>(90);
  const [jigMizPrice, setJigMizPrice] = useState<number>(90);
  const [initialJigMizPrice, setInitialJigMizPrice] = useState<number>(90);
  const [khakePercentage, setKhakePercentage] = useState<number>(0.18);
  const [initialKhakePercentage, setInitialKhakePercentage] = useState<number>(0.18);
  const [jigMizProduction, setJigMizProduction] = useState<number>(150);
  const [initialJigMizProduction, setInitialJigMizProduction] = useState<number>(150);
  const [chromiteConsumption, setChromiteConsumption] = useState<number>(2.7);
  const [initialChromiteConsumption, setInitialChromiteConsumption] = useState<number>(2.7);
  const [cokeConsumption, setCokeConsumption] = useState<number>(0.6);
  const [initialCokeConsumption, setInitialCokeConsumption] = useState<number>(0.6);
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
        const currentFixedCost = data['هزینه ثابت']?.value || 20000;
        const currentVariableCost = data['هزینه متغیردر هر تن']?.value || 15;
        const currentElectricityCost = data['هزینه واحد برق بر تن']?.value || 5;
        const currentDollarPrice = data['قیمت دلار']?.value || 0.08;
        const currentChromitePrice = data['قیمت کرومیت']?.value || 22;
        const currentCokePrice = data['قیمت کک']?.value || 20;
        const currentKhakePrice = data['قیمت خاکه']?.value || 90;
        const currentJigMizPrice = data['قیمت فلز جیگ و میز']?.value || 90;
        const currentKhakePercentage = data['درصد خاکه']?.value || 0.18;
        const currentJigMizProduction = data['تولید فلز جیگ و میز']?.value || 150;
        const currentChromiteConsumption = data['کرومیت مصرفی']?.value || 2.7;
        const currentCokeConsumption = data['کک مصرفی']?.value || 0.6;
        setSelectedCapacity(currentCapacity);
        setInitialCapacity(currentCapacity);
        setFixedCost(currentFixedCost);
        setInitialFixedCost(currentFixedCost);
        setVariableCost(currentVariableCost);
        setInitialVariableCost(currentVariableCost);
        setElectricityCost(currentElectricityCost);
        setInitialElectricityCost(currentElectricityCost);
        setDollarPrice(currentDollarPrice);
        setInitialDollarPrice(currentDollarPrice);
        setChromitePrice(currentChromitePrice);
        setInitialChromitePrice(currentChromitePrice);
        setCokePrice(currentCokePrice);
        setInitialCokePrice(currentCokePrice);
        setKhakePrice(currentKhakePrice);
        setInitialKhakePrice(currentKhakePrice);
        setJigMizPrice(currentJigMizPrice);
        setInitialJigMizPrice(currentJigMizPrice);
        setKhakePercentage(currentKhakePercentage);
        setInitialKhakePercentage(currentKhakePercentage);
        setJigMizProduction(currentJigMizProduction);
        setInitialJigMizProduction(currentJigMizProduction);
        setChromiteConsumption(currentChromiteConsumption);
        setInitialChromiteConsumption(currentChromiteConsumption);
        setCokeConsumption(currentCokeConsumption);
        setInitialCokeConsumption(currentCokeConsumption);
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
    // اگر هزینه‌ها یا قیمت‌ها تغییر کردند، state اسلایدرها را هم به‌روز کن
    if (key === 'هزینه ثابت') {
      setFixedCost(value);
    } else if (key === 'هزینه متغیردر هر تن') {
      setVariableCost(value);
    } else if (key === 'هزینه واحد برق بر تن') {
      setElectricityCost(value);
    } else if (key === 'قیمت دلار') {
      setDollarPrice(value);
    } else if (key === 'قیمت کرومیت') {
      setChromitePrice(value);
    } else if (key === 'قیمت کک') {
      setCokePrice(value);
    } else if (key === 'قیمت خاکه') {
      setKhakePrice(value);
    } else if (key === 'قیمت فلز جیگ و میز') {
      setJigMizPrice(value);
    } else if (key === 'درصد خاکه') {
      setKhakePercentage(value);
    } else if (key === 'تولید فلز جیگ و میز') {
      setJigMizProduction(value);
    } else if (key === 'کرومیت مصرفی') {
      setChromiteConsumption(value);
    } else if (key === 'کک مصرفی') {
      setCokeConsumption(value);
    }
    // محاسبات را با assumptions به‌روز شده انجام بده
    setCalculationResult(calculate(selectedCapacity, updatedAssumptions));
  };

  const handleCapacityChange = (capacity: number) => {
    setSelectedCapacity(capacity);
    setCalculationResult(calculate(capacity, assumptions));
  };

  const handleFixedCostChange = (cost: number) => {
    setFixedCost(cost);
    const updatedAssumptions = {
      ...assumptions,
      'هزینه ثابت': { 
        ...assumptions['هزینه ثابت'], 
        label: assumptions['هزینه ثابت']?.label || 'هزینه ثابت',
        unit: assumptions['هزینه ثابت']?.unit || '',
        value: cost 
      },
    };
    setAssumptions(updatedAssumptions);
    setCalculationResult(calculate(selectedCapacity, updatedAssumptions));
  };

  const handleVariableCostChange = (cost: number) => {
    setVariableCost(cost);
    const updatedAssumptions = {
      ...assumptions,
      'هزینه متغیردر هر تن': { 
        ...assumptions['هزینه متغیردر هر تن'], 
        label: assumptions['هزینه متغیردر هر تن']?.label || 'هزینه متغیردر هر تن',
        unit: assumptions['هزینه متغیردر هر تن']?.unit || '',
        value: cost 
      },
    };
    setAssumptions(updatedAssumptions);
    setCalculationResult(calculate(selectedCapacity, updatedAssumptions));
  };

  const handleElectricityCostChange = (cost: number) => {
    setElectricityCost(cost);
    const updatedAssumptions = {
      ...assumptions,
      'هزینه واحد برق بر تن': { 
        ...assumptions['هزینه واحد برق بر تن'], 
        label: assumptions['هزینه واحد برق بر تن']?.label || 'هزینه واحد برق بر تن',
        unit: assumptions['هزینه واحد برق بر تن']?.unit || '',
        value: cost 
      },
    };
    setAssumptions(updatedAssumptions);
    setCalculationResult(calculate(selectedCapacity, updatedAssumptions));
  };

  const handleDollarPriceChange = (price: number) => {
    setDollarPrice(price);
    const updatedAssumptions = {
      ...assumptions,
      'قیمت دلار': { 
        ...assumptions['قیمت دلار'], 
        label: assumptions['قیمت دلار']?.label || 'قیمت دلار',
        unit: assumptions['قیمت دلار']?.unit || '',
        value: price 
      },
    };
    setAssumptions(updatedAssumptions);
    setCalculationResult(calculate(selectedCapacity, updatedAssumptions));
  };

  const handleChromitePriceChange = (price: number) => {
    setChromitePrice(price);
    const updatedAssumptions = {
      ...assumptions,
      'قیمت کرومیت': { 
        ...assumptions['قیمت کرومیت'], 
        label: assumptions['قیمت کرومیت']?.label || 'قیمت کرومیت',
        unit: assumptions['قیمت کرومیت']?.unit || '',
        value: price 
      },
    };
    setAssumptions(updatedAssumptions);
    setCalculationResult(calculate(selectedCapacity, updatedAssumptions));
  };

  const handleCokePriceChange = (price: number) => {
    setCokePrice(price);
    const updatedAssumptions = {
      ...assumptions,
      'قیمت کک': { 
        ...assumptions['قیمت کک'], 
        label: assumptions['قیمت کک']?.label || 'قیمت کک',
        unit: assumptions['قیمت کک']?.unit || '',
        value: price 
      },
    };
    setAssumptions(updatedAssumptions);
    setCalculationResult(calculate(selectedCapacity, updatedAssumptions));
  };

  const handleKhakePriceChange = (price: number) => {
    setKhakePrice(price);
    const updatedAssumptions = {
      ...assumptions,
      'قیمت خاکه': { 
        ...assumptions['قیمت خاکه'], 
        label: assumptions['قیمت خاکه']?.label || 'قیمت خاکه',
        unit: assumptions['قیمت خاکه']?.unit || '',
        value: price 
      },
    };
    setAssumptions(updatedAssumptions);
    setCalculationResult(calculate(selectedCapacity, updatedAssumptions));
  };

  const handleJigMizPriceChange = (price: number) => {
    setJigMizPrice(price);
    const updatedAssumptions = {
      ...assumptions,
      'قیمت فلز جیگ و میز': { 
        ...assumptions['قیمت فلز جیگ و میز'], 
        label: assumptions['قیمت فلز جیگ و میز']?.label || 'قیمت فلز جیگ و میز',
        unit: assumptions['قیمت فلز جیگ و میز']?.unit || '',
        value: price 
      },
    };
    setAssumptions(updatedAssumptions);
    setCalculationResult(calculate(selectedCapacity, updatedAssumptions));
  };

  const handleKhakePercentageChange = (percentage: number) => {
    setKhakePercentage(percentage);
    const updatedAssumptions = {
      ...assumptions,
      'درصد خاکه': { 
        ...assumptions['درصد خاکه'], 
        label: assumptions['درصد خاکه']?.label || 'درصد خاکه',
        unit: assumptions['درصد خاکه']?.unit || '',
        value: percentage 
      },
    };
    setAssumptions(updatedAssumptions);
    setCalculationResult(calculate(selectedCapacity, updatedAssumptions));
  };

  const handleJigMizProductionChange = (production: number) => {
    setJigMizProduction(production);
    const updatedAssumptions = {
      ...assumptions,
      'تولید فلز جیگ و میز': { 
        ...assumptions['تولید فلز جیگ و میز'], 
        label: assumptions['تولید فلز جیگ و میز']?.label || 'تولید فلز جیگ و میز',
        unit: assumptions['تولید فلز جیگ و میز']?.unit || '',
        value: production 
      },
    };
    setAssumptions(updatedAssumptions);
    setCalculationResult(calculate(selectedCapacity, updatedAssumptions));
  };

  const handleChromiteConsumptionChange = (consumption: number) => {
    setChromiteConsumption(consumption);
    const updatedAssumptions = {
      ...assumptions,
      'کرومیت مصرفی': { 
        ...assumptions['کرومیت مصرفی'], 
        label: assumptions['کرومیت مصرفی']?.label || 'کرومیت مصرفی',
        unit: assumptions['کرومیت مصرفی']?.unit || '',
        value: consumption 
      },
    };
    setAssumptions(updatedAssumptions);
    setCalculationResult(calculate(selectedCapacity, updatedAssumptions));
  };

  const handleCokeConsumptionChange = (consumption: number) => {
    setCokeConsumption(consumption);
    const updatedAssumptions = {
      ...assumptions,
      'کک مصرفی': { 
        ...assumptions['کک مصرفی'], 
        label: assumptions['کک مصرفی']?.label || 'کک مصرفی',
        unit: assumptions['کک مصرفی']?.unit || '',
        value: consumption 
      },
    };
    setAssumptions(updatedAssumptions);
    setCalculationResult(calculate(selectedCapacity, updatedAssumptions));
  };

  const handleReset = () => {
    const resetAssumptions = JSON.parse(JSON.stringify(initialAssumptions)); // Deep copy
    setAssumptions(resetAssumptions);
    setSelectedCapacity(initialCapacity);
    setFixedCost(initialFixedCost);
    setVariableCost(initialVariableCost);
    setElectricityCost(initialElectricityCost);
    setDollarPrice(initialDollarPrice);
    setChromitePrice(initialChromitePrice);
    setCokePrice(initialCokePrice);
    setKhakePrice(initialKhakePrice);
    setJigMizPrice(initialJigMizPrice);
    setKhakePercentage(initialKhakePercentage);
    setJigMizProduction(initialJigMizProduction);
    setChromiteConsumption(initialChromiteConsumption);
    setCokeConsumption(initialCokeConsumption);
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
        </header>

        {/* Main Layout: Assumptions Panel on left, Content on right */}
        <div className="grid gap-8 lg:grid-cols-[320px_1fr] xl:grid-cols-[350px_1fr]">
          {/* Left Column: Assumptions Panel */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <AssumptionsPanel
              assumptions={assumptions}
              onAssumptionChange={handleAssumptionChange}
              onReset={handleReset}
            />
          </div>

          {/* Right Column: Main Content */}
          <div className="space-y-8">
            {/* Sliders - ظرفیت تولید و هزینه ثابت */}
            <div className="grid gap-6 md:grid-cols-2">
              <CapacitySlider
                capacity={selectedCapacity}
                initialCapacity={initialCapacity}
                onCapacityChange={handleCapacityChange}
              />
              <FixedCostSlider
                fixedCost={fixedCost}
                initialFixedCost={initialFixedCost}
                onFixedCostChange={handleFixedCostChange}
              />
            </div>

            {/* Sliders - هزینه متغیر و هزینه واحد برق */}
            <div className="grid gap-6 md:grid-cols-2">
              <VariableCostSlider
                variableCost={variableCost}
                initialVariableCost={initialVariableCost}
                onVariableCostChange={handleVariableCostChange}
              />
              <ElectricityCostSlider
                electricityCost={electricityCost}
                initialElectricityCost={initialElectricityCost}
                onElectricityCostChange={handleElectricityCostChange}
              />
            </div>

            {/* Slider - قیمت دلار */}
            <div>
              <DollarPriceSlider
                dollarPrice={dollarPrice}
                initialDollarPrice={initialDollarPrice}
                onDollarPriceChange={handleDollarPriceChange}
              />
            </div>

            {/* Sliders - قیمت کرومیت، کک، خاکه و جیگ و میز */}
            <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
              <ChromitePriceSlider
                chromitePrice={chromitePrice}
                initialChromitePrice={initialChromitePrice}
                onChromitePriceChange={handleChromitePriceChange}
              />
              <CokePriceSlider
                cokePrice={cokePrice}
                initialCokePrice={initialCokePrice}
                onCokePriceChange={handleCokePriceChange}
              />
              <KhakePriceSlider
                khakePrice={khakePrice}
                initialKhakePrice={initialKhakePrice}
                onKhakePriceChange={handleKhakePriceChange}
              />
              <JigMizPriceSlider
                jigMizPrice={jigMizPrice}
                initialJigMizPrice={initialJigMizPrice}
                onJigMizPriceChange={handleJigMizPriceChange}
              />
            </div>

            {/* Sliders - درصد خاکه، تولید فلز جیگ و میز، کرومیت مصرفی، کک مصرفی */}
            <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
              <KhakePercentageSlider
                khakePercentage={khakePercentage}
                initialKhakePercentage={initialKhakePercentage}
                onKhakePercentageChange={handleKhakePercentageChange}
              />
              <JigMizProductionSlider
                jigMizProduction={jigMizProduction}
                initialJigMizProduction={initialJigMizProduction}
                onJigMizProductionChange={handleJigMizProductionChange}
              />
              <ChromiteConsumptionSlider
                chromiteConsumption={chromiteConsumption}
                initialChromiteConsumption={initialChromiteConsumption}
                onChromiteConsumptionChange={handleChromiteConsumptionChange}
              />
              <CokeConsumptionSlider
                cokeConsumption={cokeConsumption}
                initialCokeConsumption={initialCokeConsumption}
                onCokeConsumptionChange={handleCokeConsumptionChange}
              />
            </div>

            {/* Summary Cards */}
            <div className="grid gap-6 md:grid-cols-3">
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
                    فروش (درآمد) 
                    </h3>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <p
                      className={`text-3xl font-bold transition-colors ${calculationResult.revenue.total >= 0
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                        }`}
                    >
                      {(calculationResult.revenue.total).toLocaleString('en-US')}
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
                    {(calculationResult.costs.total).toLocaleString('en-US')}
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
                      className={`text-3xl font-bold transition-colors ${calculationResult.profit.net >= 0
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                        }`}
                    >
                      {(calculationResult.profit.net).toLocaleString('en-US')}
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
            <div className="rounded-xl bg-gradient-to-br from-white to-slate-50 p-8 shadow-xl transition-shadow duration-300 hover:shadow-2xl dark:from-slate-800 dark:to-slate-900">
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
                          {(calculationResult.revenue.klohe).toLocaleString('en-US')}
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
                          {(calculationResult.revenue.khake).toLocaleString('en-US')}
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
                          {(calculationResult.revenue.jigMiz).toLocaleString('en-US')}
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
                          {(calculationResult.revenue.total).toLocaleString('en-US')}
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
                            {(calculationResult.costs.fixed).toLocaleString('en-US')}
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
                            {(calculationResult.costs.variable).toLocaleString('en-US')}
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
                            {(calculationResult.costs.coke).toLocaleString('en-US')}
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
                            {(calculationResult.costs.chromite).toLocaleString('en-US')}
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
                            {(calculationResult.costs.electricity).toLocaleString('en-US')}
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
                            {(calculationResult.costs.other).toLocaleString('en-US')}
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
                            calculationResult.costs.other)).toLocaleString('en-US')}
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
                          {(calculationResult.costs.governmentFee).toLocaleString('en-US')}
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
                          {(calculationResult.costs.total).toLocaleString('en-US')}
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
            <div className="grid gap-6 md:grid-cols-2">
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
      </div>
    </div>
  );
}
