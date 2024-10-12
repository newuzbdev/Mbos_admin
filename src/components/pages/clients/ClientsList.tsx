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
import { Clients } from "@/types/clients";
import { Button } from "@/components/ui/button";
import { PencilIcon, Trash2Icon } from "lucide-react";
import {
  useGetClients,
  useClientsDelete,
  useClientsUpdate,
} from "@/hooks/useClients";
import { toast } from "@/hooks/use-toast";
import DataTable from "@/components/data-table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "react-router-dom";

const makeColumns = (
  setProductToEdit: (p: Clients) => void,
  setProductToDelete: (p: Clients) => void
): ColumnDef<Clients>[] => [
  {
    header: "№",
    cell: (c) => <div className="cursor-pointer">{c.row.index + 1}</div>,
  },
  {
    accessorKey: "F_I_O",
    header: "Full name",
    cell: ({ row }) => (
      <div className="cursor-pointer">{row.original.F_I_O}</div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone number",
    cell: ({ row }) => (
      <div className="cursor-pointer">{row.original.phone}</div>
    ),
  },
  {
    accessorKey: "adress",
    header: "Address",
    cell: ({ row }) => (
      <div className="cursor-pointer">{row.original.adress}</div>
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

const ClientsList = () => {
  const [clientsToDelete, setClientsToDelete] = useState<Clients | undefined>();
  const [clientsToEdit, setClientsToEdit] = useState<Clients | undefined>();
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page"));
  const limit = Number(searchParams.get("limit"));
  const search = searchParams.get("search") || "";
  const {
    data: client = { data: { data: [] } },
    refetch,
    isLoading,
  } = useGetClients({ limit, page, search });

  useEffect(() => {
    refetch();
  }, [page, limit, search]);

  const {
    mutate: deleteProduct,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
  } = useClientsDelete();
  const {
    mutate: updateProduct,
    isSuccess: isUpdateSuccess,
    isError: isUpdateError,
  } = useClientsUpdate();

  useEffect(() => {
    if (isDeleteSuccess) {
      toast({
        variant: "success",
        title: "Product successfully deleted",
      });
      refetch();
      setDeleteDialogVisible(false);
      setClientsToDelete(undefined);
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
    if (clientsToDelete) setDeleteDialogVisible(true);
  }, [clientsToDelete]);

  useEffect(() => {
    if (clientsToEdit) setEditDialogVisible(true);
  }, [clientsToEdit]);

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (clientsToEdit) {
      updateProduct({
        id: clientsToEdit.id,
        F_I_O: clientsToEdit.F_I_O,
        phone: clientsToEdit.phone,
        adress: clientsToEdit.adress,
      });
    }
  };

  const handleEditDialogClose = () => {
    setEditDialogVisible(false);
    setClientsToEdit(undefined);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogVisible(false);
    setClientsToDelete(undefined);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full">
      <div className="p-4 border rounded-md">
        <h1 className="px-4 pt-4 font-bold">Mijozlar ro'yhati</h1>
        <DataTable
          title={"Full name boyichi izlash"}
          columns={makeColumns(setClientsToEdit, setClientsToDelete)}
          data={client.data || []}
        />
      </div>

      {clientsToDelete && (
        <AlertDialog
          open={deleteDialogVisible}
          onOpenChange={handleDeleteDialogClose}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleDeleteDialogClose}>
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
        <Dialog open={editDialogVisible} onOpenChange={handleEditDialogClose}>
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
                    value={clientsToEdit.F_I_O}
                    onChange={(e) =>
                      setClientsToEdit({
                        ...clientsToEdit,
                        F_I_O: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="price" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    type="number"
                    value={clientsToEdit.phone}
                    onChange={(e) =>
                      setClientsToEdit({
                        ...clientsToEdit,
                        phone: parseInt(e.target.value, 10),
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
                  id="adress"
                  type="text"
                  value={clientsToEdit.adress}
                  onChange={(e) =>
                    setClientsToEdit({
                      ...clientsToEdit,
                      adress: e.target.value,
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
};

export default ClientsList;
