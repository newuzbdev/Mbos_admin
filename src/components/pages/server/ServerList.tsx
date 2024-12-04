
import { ColumnDef } from "@tanstack/react-table";
import { useGetServers } from "@/hooks/useServer";
import DataTable from "@/components/data-table";
import { useNavigate } from "react-router-dom";
import { Server } from "@/types/server";
import { useEffect } from "react";
import { formatNumber } from "@/components/formNumber";

const calculateRemainingDays = (dateTerm: string): { days: number; bgColor: string } => {
  const currentDate = new Date();
  const termDate = new Date(dateTerm);
  const diffTime = termDate.getTime() - currentDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let bgColor = "bg-green-500 text-white text-center";
  if (diffDays <= 7 && diffDays > 3) bgColor = "bg-yellow-500 text-white text-center";
  if (diffDays <= 3) bgColor = "bg-red-500 text-white text-center";

  return { days: diffDays, bgColor };
};

const makeColumns = (navigate: (path: string) => void): ColumnDef<Server>[] => [
  {
    header: "№",
    cell: (c) => <div className="cursor-pointer">{c.row.index + 1}</div>,
  },
  {
    accessorKey: "name",
    header: "Nomi",
    cell: ({ row }) => (
      <div
        className="underline cursor-pointer text-primary"
        onClick={() => navigate(`/server/${row.original.id}`)}
      >
        {row.original.name}
      </div>
    ),
  },
  {
    accessorKey: "responsible",
    header: "Masul",
    cell: ({ row }) => (
      <div className="cursor-pointer">{row.original.responsible}</div>
    ),
  },
  {
    accessorKey: "price",
    header: "Narxi",
    cell: ({ row }) => (
      <div className="cursor-pointer">
        {formatNumber(row.original.price)}
      </div>
    ),
  },
  {
    accessorKey: "plan",
    header: "Tarif",
    cell: ({ row }) => (
      <div className="cursor-pointer">{row.original.plan}</div>
    ),
  },
  {
    accessorKey: "date_term",
    header: "Server tugash sanasi",
    cell: ({ row }) => (
      <div className="cursor-pointer">{row.original.date_term}</div>
    ),
  },
  {
    accessorKey: "date_term",
    header: "Server tugashiga qolgan kunlar",
    cell: ({ row }) => {
      const { days, bgColor } = calculateRemainingDays(row.original.date_term);
      return (
        <div className={`cursor-pointer p-2 rounded-md ${bgColor}`}>
          {days > 0 ? `${days} kun qoldi` : "Server o'chdi"}
        </div>
      );
    },
  },
];

const ServerList = () => {
  const navigate = useNavigate();

  const {
    data: server = { data: [] },
    isLoading,
    refetch: refetchServer,
  } = useGetServers();

  useEffect(() => {
    refetchServer();
  }, [refetchServer]);

  if (isLoading) return <div>Yuklanmoqda...</div>;

  return (
    <div className="w-full">
      <div className="p-4 border rounded-md">
        <DataTable
          search
          defaultPagination
          title={"Server nomini izlang"}
          columns={makeColumns(navigate)}
          data={server?.data || []}
        />
      </div>
    </div>
  );
};

export default ServerList;
