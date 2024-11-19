import ContractPaidList from "@/components/pages/contractpaid/ContractPaidList";
import ContractCreate from "@/components/pages/contracts/ContractCreate";

const ContractPaid = () => {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 mt-2">
        <div className="flex justify-between mb-4">
          <p className="text-xl font-semibold text-slate-400">
            Shartnomalar ro'yhati
          </p>
          <ContractCreate />
        </div>
        <ContractPaidList />
      </div>
    </div>
  );
};

export default ContractPaid;
