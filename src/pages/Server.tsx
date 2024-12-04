import ServerCreate from "@/components/pages/server/ServerCreate";
import ServerList from "@/components/pages/server/ServerList";

const ServerData = () => {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 mt-2">
        <div className="flex justify-between mb-4">
          <p className="text-xl font-semibold text-slate-400">
            Server ro'yhati
          </p>
          <ServerCreate />
        </div>
        <ServerList />
      </div>
    </div>
  );
};

export default ServerData;
