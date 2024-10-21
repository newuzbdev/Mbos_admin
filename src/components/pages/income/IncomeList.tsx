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
import { PencilIcon, Trash2Icon } from "lucide-react";
import { useGetIncome, useIncomeDelete, useIncomeUpdate } from "@/hooks/useIncome.ts";

import { toast } from "@/hooks/use-toast";
import DataTable from "@/components/data-table";
import { Income } from "@/types/income.ts";
import IncomeDashboard from "./incomedashboard";
import { useSearchParams } from "react-router-dom";
import { formatNumber } from "@/components/formNumber";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// ... (previous code remains unchanged)

const payment_methods = [
  { name: "cash", value: "naqd pul" },
  { name: "translation", value: "otkazma" },
  { name: "online", value: "online" },
  { name: "salary", value: "ish haqi" },
  { name: "delivery", value: "yetkazib berish" },
  { name: "other", value: "boshka" },
];

const confirm_payment = [
  { name: "paid", value: "To'landi" },
  { name: "no_paid", value: "To'lanmagan" },
  { name: "confirm_payment", value: "Tasdiqlangan" },
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
    accessorKey: "confirm_payment",
    header: "Tolovni tasdiqlash",
    cell: ({ row }) => (
      <div className="cursor-pointer">
        {confirm_payment.map(
          (el) => el.name === row.original.confirm_payment && el.value
        )}
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
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [incomeToEdit, setIncomeToEdit] = useState<Income | undefined>();
  const [editDialogVisible, setEditDialogVisible] = useState(false);

  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);
  const search = searchParams.get("search") ?? "";

  const {
    data: income = { data: { data: [] } },
    refetch,
    isLoading,
  } = useGetIncome({ page, limit, search });
  const {
    mutate: updateIncome,
    isSuccess: isUpdateSuccess,
    isError: isUpdateError,
  } = useIncomeUpdate();

  useEffect(() => {
    refetch();
  }, [page, limit, search, refetch]);
  
  useEffect(() => {
    if (isUpdateSuccess) {
      toast({
        variant: "success",
        title: "Income successfully updated",
      });
      refetch();
      setEditDialogVisible(false);
    } else if (isUpdateError) {
      toast({
        variant: "destructive",
        title: "Error updating income",
      });
    }
  }, [isUpdateSuccess, isUpdateError, refetch]);

  const {
    mutate: deleteIncome,
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
        title: "Error deleting income",
      });
    }
  }, [isDeleteSuccess, isDeleteError, refetch]);

  useEffect(() => {
    if (incomeToDelete) setDeleteDialogVisible(true);
    if (incomeToEdit) setEditDialogVisible(true);
  }, [incomeToDelete, incomeToEdit]);

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (incomeToEdit) {
      updateIncome({
        id: incomeToEdit.id,
        amount: Number(incomeToEdit.amount),
        date: incomeToEdit.date,
        description: incomeToEdit.description,
        payment_method: incomeToEdit.payment_method,
        is_paid: incomeToEdit.is_paid,
        confirm_payment: incomeToEdit.confirm_payment,
        user_id: incomeToEdit.user_id,
        shartnoma: incomeToEdit.shartnoma,
        user: incomeToEdit.user,
        income: incomeToEdit.income,
      });
    }
  };
  
  const handleDeleteDialogClose = () => {
    setDeleteDialogVisible(false);
    setIncomeToDelete(undefined);
  };
  

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full">
      <div className="p-4 border rounded-md">
        <IncomeDashboard />
        <DataTable
          title="Foydalanuvchi ismi boyicha qidiring"
          columns={makeColumns(setIncomeToEdit, setIncomeToDelete)}
          data={income?.data || []}
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
                  deleteIncome(incomeToDelete.id.toString());
                }
              }}
            >
              Davom eting
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {incomeToEdit && (
        <Dialog open={editDialogVisible} onOpenChange={setEditDialogVisible}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Income</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Amount
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={incomeToEdit.amount}
                    onChange={(e) =>
                      setIncomeToEdit({
                        ...incomeToEdit,
                        amount: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
             
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={incomeToEdit.date}
                    onChange={(e) =>
                      setIncomeToEdit({
                        ...incomeToEdit,
                        date: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    value={incomeToEdit.description}
                    onChange={(e) =>
                      setIncomeToEdit({
                        ...incomeToEdit,
                        description: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    value={incomeToEdit.description}
                    onChange={(e) =>
                      setIncomeToEdit({
                        ...incomeToEdit,
                        description: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
               
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
export default IncomeList;
