import IncomeCreate from "@/components/pages/income/IncomeCreate.tsx";
import MoneySpendList from "@/components/pages/moneyspend/MoneySpendList";

const MoneySpend = () => {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 mt-2">
        <div className="flex justify-between mb-4">
          <p className="text-xl font-semibold text-slate-400">
            Daromad ro'yxati
          </p>
          <IncomeCreate />
        </div>
        <MoneySpendList />
      </div>
    </div>
  );
};

export default MoneySpend;
