import ClientsCreate from "@/components/pages/clients/ClientsCreate.tsx";
import ClientsList from "@/components/pages/clients/ClientsList.tsx";

const Client = () => {
  return <div>
    <div className="flex min-h-screen">
      <div className="flex-1 p-4 mt-2">
        <div className="flex justify-between mb-4">
          <p className="text-xl font-semibold text-slate-400">
            Mijozlar ro'yxati
          </p>
          <ClientsCreate/>
        </div>
        <ClientsList/>
      </div>
    </div>
  </div>;
};

export default Client;
