<<<<<<< HEAD
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
import {useGetIncome, useIncomeDelete, useIncomeUpdate} from '@/hooks/useIncome.ts'

import { toast } from "@/hooks/use-toast";
import DataTable from "@/components/data-table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {Income} from "@/types/income.ts";

const makeColumns = (
  setProductToEdit: (p: Income) => void,
  setProductToDelete: (p: Income) => void
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
      <div className="cursor-pointer">{row.original.payment_method}</div>
    ),
  },
  {
    accessorKey: "is_paid",
    header: "Holati",
    cell: ({ row }) => (
      <div className="cursor-pointer">{row.original.is_paid}</div>
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
          onClick={() => setProductToEdit(row.original)}
        >
          <PencilIcon size={20} className="text-primary" />
        </Button>
        <Button
          aria-label="Delete product"
          variant="destructive"
          size="icon"
          onClick={() => setProductToDelete(row.original)}
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
  const {
    data: products = { data: { data: [] } },
    refetch,
    isLoading,
  } = useGetIncome();
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
  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (incomeToEdit) {
      updateProduct({
        id: incomeToEdit.id,
        amount: incomeToEdit.amount,
        payment_method: incomeToEdit.payment_method,
        is_paid: incomeToEdit.is_paid,
        description:incomeToEdit.description,
        date: incomeToEdit.date,
      });
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full">
      <div className="p-4 border rounded-md">
        <h1 className="px-4 pt-4 font-bold">Mijozlar ro'yhati</h1>
        <DataTable
          columns={makeColumns(setIncomeToEdit, setIncomeToDelete)}
          data={products.data?.data || []}
        />
      </div>

      {incomeToDelete && (
        <AlertDialog
          open={deleteDialogVisible}
          onOpenChange={setDeleteDialogVisible}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDeleteDialogVisible(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="text-white bg-red-500 hover:bg-red"
                onClick={() => deleteProduct(incomeToDelete.id.toString())}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      {incomeToEdit && (
        <Dialog open={editDialogVisible} onOpenChange={setEditDialogVisible}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="name" className="text-right">
                    Miqdori
                  </Label>
                  <Input
                    id="amount"
                    type='number'
                    value={incomeToEdit.amount}
                    onChange={(e) =>
                      setIncomeToEdit({
                        ...incomeToEdit,
                        amount: parseInt(e.target.value),
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="price" className="text-right">
                    To'lov usuli
                  </Label>
                  <Input
                    id="payment_method"
                    type='text'
                    value={incomeToEdit.payment_method}
                    onChange={(e) =>
                      setIncomeToEdit({
                        ...incomeToEdit,
                        payment_method: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="text" className="text-right">
                  Address
                </Label>
                <Input
                  id="is_paid"
                  type="text"
                  value={incomeToEdit.is_paid}
                  onChange={(e) =>
                    setIncomeToEdit({
                      ...incomeToEdit,
                      is_paid: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
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
=======
const IncomeList = () => {
  return <div>IncomeList</div>;
>>>>>>> 8269af6e74967da4adc9cacab6188148b6e22a3f
};

export default IncomeList;
