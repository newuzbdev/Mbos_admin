import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useGetIncome, useIncomeDelete } from "@/hooks/useIncome.ts";

import { toast } from "@/hooks/use-toast";
import DataTable from "@/components/data-table";
import { Income } from "@/types/income.ts";
import IncomeDashboard from "./incomedashboard";
import { useSearchParams } from "react-router-dom";
import { formatNumber } from "@/components/formNumber";

const payment_methods = [
  { name: "cash", value: "naqd pul" },
  { name: "translation", value: "otkazma" },
  { name: "online", value: "online" },
  { name: "salary", value: "ish haqi" },
  { name: "delivery", value: "yetkazib berish" },
  { name: "other", value: "boshka" },
];

const makeColumns = (
  setIncomeToDelete: (p: Income) => void
): ColumnDef<Income>[] => [
  {
    header: "№",
    cell: (c) => <div className="cursor-pointer">{c.row.index + 1}</div>,
  },
  {
    accessorKey: "user",
    header: "Mijoz",
    cell: ({ row }) => (
      <div className="cursor-pointer">{row.original.user?.F_I_O}</div>
    ),
  },
  {
    accessorKey: "amount",
    header: "To'lov miqdori",
    cell: ({ row }) => (
      <div className="cursor-pointer">{formatNumber(row.original.amount)}</div>
    ),
  },
  {
    accessorKey: "payment_method",
    header: "To'lov usuli",
    cell: ({ row }) => (
      <div className="cursor-pointer">
        {payment_methods.map(
          (el) => el.name === row.original.payment_method && el.value
        )}
      </div>
    ),
  },
  {
    accessorKey: "is_paid",
    header: "Holati",
    cell: ({ row }) => (
      <div
        className={`cursor-pointer text-white flex justify-center rounded-lg py-1 ${
          row.original.is_paid === "paid" ? "bg-primary" : "bg-red-500"
        }`}
      >
        {row.original.is_paid === "paid" ? "kirim" : "chikim"}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "Izoh",
    cell: ({ row }) => (
      <div className="cursor-pointer">{row.original.description}</div>
    ),
  },
  {
    accessorKey: "date",
    header: "Sana",
    cell: ({ row }) => (
      <div className="cursor-pointer">{row.original.date}</div>
    ),
  },
  {
    id: "actions",
    header: "Amallar",
    cell: ({ row }) => (
      <div>
        <Button
          aria-label="Delete product"
          variant="destructive"
          size="icon"
          onClick={() => setIncomeToDelete(row.original)}
        >
          <Trash2Icon size={20} />
        </Button>
      </div>
    ),
  },
];

const IncomeList = () => {
  const [incomeToDelete, setIncomeToDelete] = useState<Income | undefined>();
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);
  const search = searchParams.get("search") ?? "";

  const {
    data: income = { data: { data: [] } },
    refetch,
    isLoading,
  } = useGetIncome({ page, limit, search });

  useEffect(() => {
    refetch();
  }, [page, limit, search]);

  const {
    mutate: deleteProduct,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
  } = useIncomeDelete();

  useEffect(() => {
    if (isDeleteSuccess) {
      toast({
        variant: "success",
        title: "Daromad muvaffaqiyatli o'chirildi",
      });
      refetch();
      setDeleteDialogVisible(false);
    } else if (isDeleteError) {
      toast({
        variant: "destructive",
        title: "Error deleting product",
      });
    }
  }, [isDeleteSuccess, isDeleteError, refetch]);

  useEffect(() => {
    if (incomeToDelete) setDeleteDialogVisible(true);
  }, [incomeToDelete]);

  const handleDeleteDialogClose = () => {
    setDeleteDialogVisible(false);
    setIncomeToDelete(undefined);
  };

  const handleSearch = (searchValue: string) => {
    setSearchParams({ ...searchParams, search: searchValue, page: "1" });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ ...searchParams, page: newPage.toString() });
  };

  const handleLimitChange = (newLimit: number) => {
    setSearchParams({ ...searchParams, limit: newLimit.toString(), page: "1" });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full">
      <div className="p-4 border rounded-md">
        <IncomeDashboard />
        <DataTable
          title="Foydalanuvchi ismi boyicha qidiring"
          columns={makeColumns(setIncomeToDelete)}
          data={income?.data || []}
          onSearch={handleSearch}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
          currentPage={page}
          pageSize={limit}
          totalItems={income?.total || 0}
        />
      </div>
      <AlertDialog
        open={deleteDialogVisible}
        onOpenChange={handleDeleteDialogClose}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Siz mutlaqo ishonchingiz komilmi?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDeleteDialogClose}>
              Bekor qilish
            </AlertDialogCancel>
            <AlertDialogAction
              className="text-white bg-red-500 hover:bg-red"
              onClick={() => {
                if (incomeToDelete) {
                  deleteProduct(incomeToDelete.id.toString());
                }
              }}
            >
              Davom eting
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
export default IncomeList;
