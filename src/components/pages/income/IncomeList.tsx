import React, { useEffect, useState } from "react";
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
    accessorKey: "translation_benefit",
    header: "Foyda",
    cell: ({ row }) => (
      <div className="cursor-pointer">{row.original.translation_benefit}</div>
    ),
  },
  {
    accessorKey: "cash_benefit",
    header: "Naqt pul",
    cell: ({ row }) => (
      <div className="cursor-pointer">{row.original.cash_benefit}</div>
    ),
  },
  {
    accessorKey: "online_benefit",
    header: "Online pul",
    cell: ({ row }) => (
      <div className="cursor-pointer">{row.original.online_benefit}</div>
    ),
  },
  {
    accessorKey: "benefit",
    header: "Umumiy foyda",
    cell: ({ row }) => (
      <div className="cursor-pointer">{row.original.benefit}</div>
    ),
  },
  {
    accessorKey: "workers_harm",
    header: "Ishchilarga yetkazilgan zarar",
    cell: ({ row }) => (
      <div className="cursor-pointer">{row.original.workers_harm}</div>
    ),
  },
  {
    accessorKey: "harm",
    header: "Umumiy zarar",
    cell: ({ row }) => (
      <div className="cursor-pointer">{row.original.harm}</div>
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
        id:incomeToEdit.id,
        translation_benefit: incomeToEdit.translation_benefit,
        cash_benefit:incomeToEdit.cash_benefit,
        online_benefit:incomeToEdit.online_benefit,
        benefit:incomeToEdit.benefit,
        workers_harm:incomeToEdit.workers_harm,
        harm:incomeToEdit.harm
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
                    Foyda
                  </Label>
                  <Input
                    id="translation_benefit"
                    type="number"
                    value={incomeToEdit.translation_benefit}
                    onChange={(e) => {
                      setIncomeToEdit({
                        ...incomeToEdit,
                        translation_benefit: parseFloat(e.target.value),
                      });
                    }
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="price" className="text-right">
                    Naqt pul
                  </Label>
                  <Input
                    id="cash_benefit"
                    type="number"
                    value={incomeToEdit.cash_benefit}
                    onChange={(e) =>
                      setIncomeToEdit({
                        ...incomeToEdit,
                        cash_benefit: parseFloat(e.target.value),
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="text" className="text-right">
                    Online pul
                  </Label>
                  <Input
                    id="online_benefit"
                    type="number"
                    value={incomeToEdit.online_benefit}
                    onChange={(e) =>
                      setIncomeToEdit({
                        ...incomeToEdit,
                        online_benefit: parseFloat(e.target.value),
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="text" className="text-right">
                    Umumiy foyda
                  </Label>
                  <Input
                    id="benifit"
                    type="number"
                    value={incomeToEdit.benefit}
                    onChange={(e) =>
                      setIncomeToEdit({
                        ...incomeToEdit,
                        benefit: parseFloat(e.target.value),
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="text" className="text-right">
                    Ishchilarga yetkazilgan zarar
                  </Label>
                  <Input
                    id="workers_harm"
                    type="number"
                    value={incomeToEdit.workers_harm}
                    onChange={(e) =>
                      setIncomeToEdit({
                        ...incomeToEdit,
                        workers_harm: parseFloat(e.target.value),
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="text" className="text-right">
                    Umumiy zarar
                  </Label>
                  <Input
                    id="harm"
                    type="number"
                    value={incomeToEdit.harm}
                    onChange={(e) =>
                      setIncomeToEdit({
                        ...incomeToEdit,
                        harm: parseFloat(e.target.value),
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
