import IncomeCreate from "@/components/pages/income/IncomeCreate.tsx";
import IncomeProfitList from "@/components/pages/incomeprofit/IncomeProfitList";

const IncomeProfit = () => {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 mt-2">
        <div className="flex justify-between mb-4">
          <p className="text-xl font-semibold text-slate-400">
            Daromad ro'yxati
          </p>
          <IncomeCreate />
        </div>
        <IncomeProfitList />
      </div>
    </div>
  );
};

export default IncomeProfit;
