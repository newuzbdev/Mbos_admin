import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import DataTable from "@/components/data-table";
import { useGetContract } from "@/hooks/useContract";
import { Contract } from "@/types/contract";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
      <div className="cursor-pointer">{row.original.shartnoma_turi}</div>
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
  const { data: products, isLoading } = useGetContract();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full">
      <div className="p-4 border rounded-md">
        <h1 className="px-4 pt-4 font-bold">Mijozlar ro'yhati</h1>
        <DataTable columns={makeColumns()} data={products?.data.data || []} />
      </div>
    </div>
  );
};

export default ContractList;
