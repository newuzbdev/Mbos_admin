import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import DataTable from "@/components/data-table";
import { useGetContract } from "@/hooks/useContract";
import { Contract } from "@/types/contract";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const shartnoma_turi = [
  { name: "one_bay", value: "Birmartalik to'lov" },
  { name: "subscription_fee", value: "Oylik to'lov" },
];
const purchase_status = [
  { name: "paid", value: "To'landi" },
  { name: "no_paid", value: "To'lanmagan" },
];
const makeColumns = (): ColumnDef<Contract>[] => [
  {
    header: "№",
    cell: (c) => <div className="cursor-pointer">{c.row.index + 1}</div>,
  },
  {
    accessorKey: "user",
    header: "Mijoz",
    cell: ({ row }) => (
      <div className="cursor-pointer">{row.original.user.F_I_O}</div>
    ),
  },
  {
    accessorKey: "shartnoma_turi",
    header: "shartnoma_turi",
    cell: ({ row }) => (
      <div className="cursor-pointer">
        {shartnoma_turi.map(
          (el) => el.name === row.original.shartnoma_turi && el.value
        )}
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "narx",
    cell: ({ row }) => (
      <div className="cursor-pointer">{row.original.price}</div>
    ),
  },
  {
    accessorKey: "advancePayment",
    header: "Oldindan to'lov",
    cell: ({ row }) => (
      <div className="cursor-pointer">{row.original.advancePayment}</div>
    ),
  },
  {
    accessorKey: "remainingPayment",
    header: "Qolgan to'lov",
    cell: ({ row }) => (
      <div className="cursor-pointer">{row.original.remainingPayment}</div>
    ),
  },
  {
    accessorKey: "purchase_status",
    header: "narx",
    cell: ({ row }) => (
      <div className="cursor-pointer">
        {purchase_status.map(
          (el) => el.name === row.original.purchase_status && el.value
        )}
      </div>
      // <div className="cursor-pointer">{row.original.price}</div>
    ),
  },
  {
    accessorKey: "count",
    header: "miktor",
    cell: ({ row }) => (
      <div className="cursor-pointer">{row.original.count}</div>
    ),
  },
  {
    accessorKey: "service",
    header: "xizmat",
    cell: ({ row }) => (
      <div className="cursor-pointer">{row.original.service}</div>
    ),
  },
  {
    accessorKey: "others",
    header: "Qolgan malumotlar",
    cell: ({ row }) => (
      <Sheet>
        <SheetTrigger asChild>
          <div className="cursor-pointer">
            <Button className="text-white w-30">Qolgan malumotlar</Button>
          </div>
        </SheetTrigger>
        <SheetContent>
          <div className="space-y-4">
            <div>
              <h1 className="pb-4 text-lg text-bold text-primary ">
                Qoshimcha malumotlar
              </h1>
              <strong>Shartnoma id:</strong> {row.original.shartnoma_id}
            </div>
            <div>
              <strong>Sana:</strong> {row.original.sana}
            </div>
            <div>
              <strong>Shartnoma muddati:</strong>{" "}
              {row.original.shartnoma_muddati}
            </div>
            <div>
              <strong>To'lash sanasi:</strong> {row.original.tolash_sana}
            </div>
            <div>
              <strong>Texnik muddati:</strong> {row.original.texnik_muddati}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    ),
  },
  {
    accessorKey: "eye",
    header: "Batafsil malumotlar",
    cell: () => (
      <div className="flex items-center justify-center cursor-pointer">
        <Eye className="w-6 h-6 text-primary hover:text-green-500" />
      </div>
    ),
  },
];

const ContractList = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);
  const search = searchParams.get("search") || "";

  const {
    data: contract,
    refetch,
    isLoading,
  } = useGetContract({ page, limit, search });

  useEffect(() => {
    refetch();
  }, [page, limit, search]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full">
      <div className="p-4 border rounded-md">
        <h1 className="px-4 pt-4 font-bold">Mijozlar ro'yhati</h1>
        <DataTable
          title="xizmat boyicha izlash"
          columns={makeColumns()}
          data={contract?.data || []}
        />
      </div>
    </div>
  );
};

export default ContractList;
