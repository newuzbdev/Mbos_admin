import IncomeCreate from "@/components/pages/income/IncomeCreate.tsx";
import IncomeList from "@/components/pages/income/IncomeList.tsx";

const Income = () => {
  return (
      <div className='flex min-h-screen'>
        <div className="flex-1 p-4 mt-2">
          <div className="flex justify-between mb-4">
            <p className="text-xl font-semibold text-slate-400">
              Daramot Ro'yxati
            </p>
            <IncomeCreate/>
          </div>
          <IncomeList/>
        </div>
      </div>
  );
};

export default Income;