import { useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Clients } from "@/types/clients";
import { useGetClients } from "@/hooks/useClients";
import DataTable from "@/components/data-table";
import { useNavigate, useSearchParams } from "react-router-dom";

const makeColumns = (
  navigate: (path: string) => void
): ColumnDef<Clients>[] => [
  {
    header: "№",
    cell: (c) => <div className="cursor-pointer">{c.row.index + 1}</div>,
  },
  {
    accessorKey: "F_I_O",
    header: "To'liq ism",
    cell: ({ row }) => (
      <div
        className="underline cursor-pointer text-primary"
        onClick={() => navigate(`/clients/${row.original.id}`)}
      >
        {row.original.F_I_O}
      </div>
    ),
  },

  {
    accessorKey: "INN_number",
    header: "Mijozning INN raqami",
    cell: ({ row }) => (
      <div className="cursor-pointer">{row.original.INN_number}</div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Telefon raqami",
    cell: ({ row }) => (
      <div className="cursor-pointer">{row.original.phone}</div>
    ),
  },
  {
    accessorKey: "adress",
    header: "Address",
    cell: ({ row }) => (
      <div className="cursor-pointer">{row.original.adress}</div>
    ),
  },
];

const ClientsList = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const search = searchParams.get("search") || "";
  const navigate = useNavigate();

  const {
    data: client = { data: { data: [] } },
    refetch,
    isLoading,
  } = useGetClients({ limit, page, search });

  useEffect(() => {
    refetch();
  }, [page, limit, search]);

  if (isLoading) return <div>Yuklanmoqda...</div>;

  return (
    <div className="w-full">
      <div className="p-4 border rounded-md">
        <DataTable
          title={"Mijoz INN raqami yoki to'lik ism bo'yicha izlang"}
          columns={makeColumns(navigate)}
          data={client.data || []}
        />
      </div>
    </div>
  );
};

export default ClientsList;
