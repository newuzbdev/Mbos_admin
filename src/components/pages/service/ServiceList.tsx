import { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/components/data-table";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { IService } from "@/types/service";
import { useGetServices } from "@/hooks/useService";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/components/formNumber";

const makeColumns = (
  navigate: (path: string) => void
): ColumnDef<IService>[] => [
  {
    header: "№",
    cell: (c) => <div className="cursor-pointer">{c.row.index + 1}</div>,
  },
  {
    header: "xizmat nomi",
    accessorKey: "title",
    cell: ({ row }) => (
      <Button
        variant="link"
        onClick={() => navigate(`/service/${row.original.id}`)}
      >
        <p>{row.original.title}</p>
      </Button>
    ),
  },
  {
    header: "narxi",
    accessorKey: "price",
    cell: ({ row }) => <p>{formatNumber(row.original.price)} s'om</p>,
  },
  {
    header: "birliklari",
    accessorKey: "birliklar",
    cell: ({ row }) => <p>{row.original.birliklar || "mavjut emas"}</p>,
  },
];

const ServiceList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);
  const search = searchParams.get("search") || "";

  const {
    data: contract,
    refetch,
    isLoading,
  } = useGetServices({ page, limit, search });

  useEffect(() => {
    refetch();
  }, [page, limit, search]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full">
      <div className="p-4 border rounded-md">
        <DataTable
          title="xizmat nomi boyicha izlash"
          columns={makeColumns(navigate)}
          data={contract?.data || []}
        />
      </div>
    </div>
  );
};
export default ServiceList;
