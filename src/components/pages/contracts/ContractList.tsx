import { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/components/data-table";
import { useGetContracts } from "@/hooks/useContract";
import { Contract } from "@/types/contract";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { formatNumber } from "@/components/formNumber";

const shartnoma_turi = [
  { name: "one_bay", value: "Birmartalik to'lov" },
  { name: "subscription_fee", value: "Oylik to'lov" },
];
const purchase_status = [
  { name: "paid", value: "To'landi" },
  { name: "no_paid", value: "To'lanmagan" },
];

const makeColumns = (
  navigate: (path: string) => void
): ColumnDef<Contract>[] => [
  {
    header: "№",
    cell: (c) => <div className="cursor-pointer">{c.row.index + 1}</div>,
  },
  {
    accessorKey: "user",
    header: "Mijoz",
    cell: ({ row }) => (
      <div
        className="underline cursor-pointer text-primary"
        onClick={() => navigate(`/contract/${row.original.id}`)}
      >
        {row.original.user.F_I_O}
      </div>
    ),
  },
  {
    accessorKey: "service",
    header: "Xizmat / Product",
    cell: ({ row }) => <div>{row.original.service.title}</div>,
  },
  {
    accessorKey: "shartnoma_turi",
    header: "Shartnoma turi",
    cell: ({ row }) => (
      <div className="cursor-pointer">
        {shartnoma_turi.map(
          (el) => el.name === row.original.shartnoma_turi && el.value
        )}
      </div>
    ),
  },

  {
    accessorKey: "advancePayment",
    header: "Oldindan to'lov",
    cell: ({ row }) => (
      <div className="cursor-pointer">
        {formatNumber(row.original.advancePayment)}
      </div>
    ),
  },
  {
    accessorKey: "remainingPayment",
    header: "Qolgan to'lov",
    cell: ({ row }) => (
      <div className="cursor-pointer">
        {formatNumber(row.original.remainingPayment)}
      </div>
    ),
  },
  {
    accessorKey: "purchase_status",
    header: "Xarid holati",
    cell: ({ row }) => (
      <div
        className={`cursor-pointer py-1 text-white rounded-lg flex justify-center  ${
          row.original.purchase_status === "paid"
            ? "bg-green-500"
            : "bg-red-500"
        }`}
      >
        {purchase_status.map(
          (el) => el.name === row.original.purchase_status && el.value
        )}
      </div>
    ),
  },
  {
    accessorKey: "count",
    header: "Miktor",
    cell: ({ row }) => (
      <div className="cursor-pointer">{row.original.count}</div>
    ),
  },
];

const ContractList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);
  const search = searchParams.get("search") || "";

  const {
    data: contract,
    refetch,
    isLoading,
  } = useGetContracts({ page, limit, search });

  useEffect(() => {
    refetch();
  }, [page, limit, search, refetch]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full">
      <div className="p-4 border rounded-md">
        <DataTable
          title="Mijoz nomi yoki telefon raqami bo'yicha qidiring"
          columns={makeColumns(navigate)}
          data={contract?.data || []}
        />
      </div>
    </div>
  );
};
export default ContractList;
