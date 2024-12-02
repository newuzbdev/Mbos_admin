import ServiceCreate from "@/components/pages/service/ServiceCreate";
import ServiceList from "@/components/pages/service/ServiceList";

const ServerData = () => {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 mt-2">
        <div className="flex justify-between mb-4">
          <p className="text-xl font-semibold text-slate-400">
            Service ro'yhati
          </p>
          <ServiceCreate />
        </div>
        <ServiceList />
      </div>
    </div>
  );
};

export default ServerData;
