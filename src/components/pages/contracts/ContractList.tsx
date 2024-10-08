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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import DataTable from "@/components/data-table";
import {
  useContractDelete,
  useContractUpdate,
  useGetContract,
} from "@/hooks/useContract";
import { Contract } from "@/types/contract";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const makeColumns = (
  setProductToEdit: (p: Contract) => void,
  setProductToDelete: (p: Contract) => void
): ColumnDef<Contract>[] => [
  {
    header: "№",
    cell: (c) => <div className="cursor-pointer">{c.row.index + 1}</div>,
  },
  {
    accessorKey: "price",
    header: "narx",
    cell: ({ row }) => (
      <div className="cursor-pointer">{row.original.price}</div>
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

const ContractList = () => {
  const [clientsToDelete, setClientsToDelete] = useState<
    Contract | undefined
  >();
  const [clientsToEdit, setClientsToEdit] = useState<Contract | undefined>();
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const { data: products, refetch, isLoading } = useGetContract();
  const {
    mutate: deleteProduct,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
  } = useContractDelete();
  const {
    mutate: updateProduct,
    isSuccess: isUpdateSuccess,
    isError: isUpdateError,
  } = useContractUpdate();

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
  }, [isDeleteSuccess, isDeleteError]);

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
    if (clientsToDelete) setDeleteDialogVisible(true);
  }, [clientsToDelete]);
  useEffect(() => {
    if (clientsToEdit) setEditDialogVisible(true);
  }, [clientsToEdit]);

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (clientsToEdit) {
      // updateProduct();
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full">
      <div className="p-4 border rounded-md">
        <h1 className="px-4 pt-4 font-bold">Mijozlar ro'yhati</h1>
        <DataTable
          columns={makeColumns(setClientsToEdit, setClientsToDelete)}
          data={products?.data.data || []}
        />
      </div>

      {clientsToDelete && (
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
                onClick={() => deleteProduct(clientsToDelete.id.toString())}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      {clientsToEdit && (
        <Dialog open={editDialogVisible} onOpenChange={setEditDialogVisible}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="name" className="text-right">
                    Full name
                  </Label>
                  <Input
                    id="F_I_O"
                    value={clientsToEdit.count}
                    onChange={(e) =>
                      setClientsToEdit({
                        ...clientsToEdit,
                        count: +e.target.value,
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

export default ContractList;
