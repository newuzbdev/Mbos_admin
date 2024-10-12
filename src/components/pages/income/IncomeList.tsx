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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PencilIcon, Trash2Icon } from "lucide-react";
import {
  useGetIncome,
  useIncomeDelete,
  useIncomeUpdate,
} from "@/hooks/useIncome.ts";

import { toast } from "@/hooks/use-toast";
import DataTable from "@/components/data-table";
import { Income } from "@/types/income.ts";
import { ItemUpdate } from "@/components/input-update";
import IncomeDashboard from "./incomedashboard";
import { useSearchParams } from "react-router-dom";

const payment_methods = [
  { name: "cash", value: "naqd pul" },
  { name: "translation", value: "otkazma" },
  { name: "online", value: "online" },
  { name: "salary", value: "ish haqi" },
  { name: "delivery", value: "yetkazib berish" },
  { name: "other", value: "boshka" },
];

const makeColumns = (
  setIncomeToEdit: (p: Income) => void,
  setIncomeToDelete: (p: Income) => void
): ColumnDef<Income>[] => [
  {
    header: "№",
    cell: (c) => <div className="cursor-pointer">{c.row.index + 1}</div>,
  },
  {
    accessorKey: "amount",
    header: "To'lov miqdori",
    cell: ({ row }) => (
      <div className="cursor-pointer">{row.original.amount}</div>
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
      <div className="cursor-pointer">
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
    header: "Actions",
    cell: ({ row }) => (
      <div className="space-x-2">
        <Button
          aria-label="Edit product"
          variant="ghost"
          size="icon"
          onClick={() => setIncomeToEdit(row.original)}
        >
          <PencilIcon size={20} className="text-primary" />
        </Button>
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
  const [incomeToEdit, setIncomeToEdit] = useState<Income | undefined>();
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);
  const {
    data: income = { data: { data: [] } },
    refetch,
    isLoading,
  } = useGetIncome({ page, limit });

  useEffect(() => {
    refetch();
  }, [page, limit]);

  const {
    mutate: deleteProduct,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
  } = useIncomeDelete();
  const {
    mutate: updateProduct,
    isSuccess: isUpdateSuccess,
    isError: isUpdateError,
  } = useIncomeUpdate();

  useEffect(() => {
    if (isDeleteSuccess) {
      toast({
        variant: "success",
        title: "Product successfully deleted",
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
    if (isUpdateSuccess) {
      toast({
        variant: "success",
        title: "Product successfully updated",
      });
      refetch();
      setEditDialogVisible(false);
    } else if (isUpdateError) {
      toast({
        variant: "destructive",
        title: "Error updating product",
      });
    }
  }, [isUpdateSuccess, isUpdateError, refetch]);

  useEffect(() => {
    if (incomeToDelete) setDeleteDialogVisible(true);
  }, [incomeToDelete]);

  useEffect(() => {
    if (incomeToEdit) setEditDialogVisible(true);
  }, [incomeToEdit]);

  const handleEditDialogClose = () => {
    setEditDialogVisible(false);
    setIncomeToEdit(undefined);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogVisible(false);
    setIncomeToDelete(undefined);
  };

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (incomeToEdit) {
      updateProduct({
        id: incomeToEdit.id,
        amount: +incomeToEdit.amount,
        payment_method: incomeToEdit.payment_method,
        is_paid: incomeToEdit.is_paid,
        description: incomeToEdit.description,
        date: incomeToEdit.date,
      });
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full">
      <div className="p-4 border rounded-md">
        <h1 className="px-4 pt-4 font-bold">daromad ro'yxati</h1>
        <IncomeDashboard />
        <DataTable
          search={false}
          columns={makeColumns(setIncomeToEdit, setIncomeToDelete)}
          data={income.data || []}
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
      <Dialog open={editDialogVisible} onOpenChange={handleEditDialogClose}>
        <DialogContent className="absolute">
          <DialogHeader>
            <DialogTitle>daromadni tahrirlash</DialogTitle>
          </DialogHeader>
          {incomeToEdit && (
            <form onSubmit={handleEditSubmit}>
              <div className="grid gap-4 pb-4">
                <ItemUpdate
                  setUpdate={setIncomeToEdit}
                  type="number"
                  value={incomeToEdit.amount}
                  name="amount"
                  title="narx miqdori"
                  data={incomeToEdit}
                />
                <ItemUpdate
                  setUpdate={setIncomeToEdit}
                  type="text"
                  value={incomeToEdit.description}
                  name="description"
                  title="izoh"
                  data={incomeToEdit}
                />
                <div>
                  <ItemUpdate
                    setUpdate={setIncomeToEdit}
                    type="enum"
                    value={incomeToEdit.is_paid}
                    name="is_paid"
                    title="tushum yoki chikim"
                    data={incomeToEdit}
                    enums={[
                      { name: "paid", value: "tushum" },
                      { name: "no_paid", value: "chikim" },
                    ]}
                  />
                </div>
                <ItemUpdate
                  setUpdate={setIncomeToEdit}
                  type="date"
                  value={incomeToEdit.date}
                  name="date"
                  title="sana"
                  data={incomeToEdit}
                />
              </div>
              <DialogFooter>
                <Button className="text-white" type="submit">
                  O'zgarishlarni saqlang
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IncomeList;
