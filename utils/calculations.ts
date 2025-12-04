/**
 * توابع محاسباتی بر اساس فرمول‌های اکسل
 */

export interface Assumptions {
  [key: string]: {
    label: string;
    value: number;
    unit: string;
  };
}

export interface CalculationResult {
  revenue: {
    klohe: number; // فروش کلوخه
    khake: number; // فروش خاکه
    jigMiz: number; // فروش جیگ و میز
    total: number; // جمع درآمدها
  };
  costs: {
    fixed: number; // هزینه ثابت
    variable: number; // هزینه متغیر کل
    coke: number; // بهای کک مصرفی
    chromite: number; // بهای کرومیت مصرفی
    electricity: number; // هزینه برق مصرفی
    governmentFee: number; // حقوق دولتی
    other: number; // سایر هزینه‌ها
    total: number; // جمع هزینه‌ها
  };
  profit: {
    operating: number; // سود عملیاتی
    net: number; // سود خالص
  };
}

export function calculate(
  capacity: number,
  assumptions: Assumptions
): CalculationResult {
  // استخراج فرضیات
  const fixedCost = assumptions['هزینه ثابت']?.value || 20000;
  const variableCostPerTon = assumptions['هزینه متغیردر هر تن']?.value || 15;
  const cokeConsumption = assumptions['کک مصرفی']?.value || 0.6;
  const cokePrice = assumptions['قیمت کک']?.value || 20;
  const chromiteConsumption = assumptions['کرومیت مصرفی']?.value || 2.7;
  const chromitePrice = assumptions['قیمت کرومیت']?.value || 22;
  const electricityCostPerTon = assumptions['هزینه واحد برق بر تن']?.value || 5;
  const dollarPrice = assumptions['قیمت دلار']?.value || 0.08;
  const dollarSalePerTon = assumptions['قیمت فروش دلاری هر تن']?.value || 1600;
  const khakePercent = assumptions['درصد خاکه']?.value || 0.18;
  const khakePrice = assumptions['قیمت خاکه']?.value || 90;
  const jigMizProduction = assumptions['تولید فلز جیگ و میز']?.value || 150;
  const jigMizPrice = assumptions['قیمت فلز جیگ و میز']?.value || 90;
  const governmentFeeRate = assumptions['حقوق دولتی']?.value || 0.128;
  const otherAdditivesRate = assumptions['سایر افزودنی ها']?.value || 0.015;
  const otherCosts = assumptions['سایر هزینه ها']?.value || 10000;

  // محاسبه درآمدها
  // فروش کلوخه = ظرفیت * قیمت فروش دلاری هر تن * قیمت دلار * (1 - درصد خاکه)
  // طبق فرمول اکسل: I3 = I1 * $C$22 * $C$21 * (1 - $C$11)
  // که C22 = قیمت فروش دلاری هر تن (1600) و C21 = قیمت دلار (0.08)
  const kloheRevenue =
    capacity * dollarSalePerTon * dollarPrice * (1 - khakePercent);

  // فروش خاکه = ظرفیت * قیمت خاکه * درصد خاکه
  const khakeRevenue = capacity * khakePrice * khakePercent;

  // فروش جیگ و میز = اگر ظرفیت >= 500 باشد، تولید فلز جیگ و میز * قیمت
  const jigMizRevenue = capacity >= 500 ? jigMizProduction * jigMizPrice : 0;

  const totalRevenue = kloheRevenue + khakeRevenue + jigMizRevenue;

  // محاسبه هزینه‌ها
  // هزینه ثابت = پرسنل * حقوق هر نفر
  const personnel = assumptions['پرسنل']?.value || 285;
  const salaryPerPerson = assumptions['حقوق هر نفر']?.value || 70.175;
  const fixedCostTotal = personnel * salaryPerPerson;

  const variableCostTotal = capacity * variableCostPerTon;
  const cokeCost = capacity * cokeConsumption * cokePrice;
  const chromiteCost = capacity * chromiteConsumption * chromitePrice;
  const electricityCost = capacity * electricityCostPerTon;

  // سایر افزودنی‌ها بر روی هزینه‌های ثابت و متغیر و ...
  const additivesCost =
    (fixedCostTotal +
      variableCostTotal +
      cokeCost +
      chromiteCost +
      electricityCost) *
    otherAdditivesRate;

  // حقوق دولتی = MAX(جمع درآمدها, حداقل تولید * قیمت فروش دلاری هر تن * قیمت دلار) * نرخ حقوق دولتی
  // طبق فرمول اکسل: I19 = MAX(P3+P4, $C$7*$C$22*$C$21) * $C$13
  const minProduction = assumptions['حداقل تولید ماهانه']?.value || 500;
  const minRevenue = minProduction * dollarSalePerTon * dollarPrice;
  const governmentFee =
    Math.max(kloheRevenue + khakeRevenue, minRevenue) * governmentFeeRate;

  // سایر هزینه‌ها
  // اگر ظرفیت تولید 0 باشد: 1000، در غیر این صورت: 10000
  const otherCostsTotal = capacity === 0 ? 1000 : 10000;

  const totalCosts =
    fixedCostTotal +
    variableCostTotal +
    cokeCost +
    chromiteCost +
    electricityCost +
    additivesCost +
    governmentFee +
    otherCostsTotal;

  // سود عملیاتی = جمع درآمدها - جمع هزینه‌های عملیاتی (بدون حقوق دولتی)
  const operatingCosts =
    fixedCostTotal +
    variableCostTotal +
    cokeCost +
    chromiteCost +
    electricityCost +
    additivesCost +
    otherCostsTotal;
  const operatingProfit = totalRevenue - operatingCosts;

  // سود خالص = درآمد کل - هزینه کل
  const netProfit = totalRevenue - totalCosts;

  return {
    revenue: {
      klohe: kloheRevenue,
      khake: khakeRevenue,
      jigMiz: jigMizRevenue,
      total: totalRevenue,
    },
    costs: {
      fixed: fixedCostTotal,
      variable: variableCostTotal,
      coke: cokeCost,
      chromite: chromiteCost,
      electricity: electricityCost,
      governmentFee: governmentFee,
      other: otherCostsTotal + additivesCost,
      total: totalCosts,
    },
    profit: {
      operating: operatingProfit,
      net: netProfit,
    },
  };
}

