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
import { useSearchParams } from "react-router-dom";
import { ItemUpdate } from "@/components/input-update";

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
    header: "To'liq ism",
    cell: ({ row }) => (
      <div className="cursor-pointer">{row.original.F_I_O}</div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Telefon raqami",
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
    header: "Amallar",
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
  }, [page, limit, search, refetch]);

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
        title: "Mijoz muvaffaqiyatli o'chirildi",
      });
      refetch();
      setDeleteDialogVisible(false);
      setClientsToDelete(undefined);
    } else if (isDeleteError) {
      toast({
        variant: "destructive",
        title: "Mijozni o'chirishda xatolik",
      });
    }
  }, [isDeleteSuccess, isDeleteError, refetch]);

  useEffect(() => {
    if (isUpdateSuccess) {
      toast({
        variant: "success",
        title: "Mijoz ro'yhati muvaffaqiyat tahrirlandi",
      });
      refetch();
      setEditDialogVisible(false);
    } else if (isUpdateError) {
      toast({
        variant: "destructive",
        title: "Mijoz tahrirlashda xatolik",
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

  if (isLoading) return <div>Yuklanmoqda...</div>;

  return (
    <div className="w-full">
      <div className="p-4 border rounded-md">
        <DataTable
          title={"To'liq ism boyichi izlash"}
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
              <AlertDialogTitle>
                Siz mutlaqo ishonchingiz komilmi?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleDeleteDialogClose}>
                Bekor qilinsin
              </AlertDialogCancel>
              <AlertDialogAction
                className="text-white bg-red-500 hover:bg-red"
                onClick={() => deleteProduct(clientsToDelete.id.toString())}
              >
                Albatta
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      {clientsToEdit && (
        <Dialog open={editDialogVisible} onOpenChange={handleEditDialogClose}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Mijozlar ro'yhatini tahrirlash</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit}>
              <div className="grid gap-4 py-4">
                <ItemUpdate
                  data={clientsToEdit}
                  name="F_I_O"
                  title="tolik ism"
                  setUpdate={setClientsToEdit}
                  value={clientsToEdit.F_I_O}
                />
                <ItemUpdate
                  data={clientsToEdit}
                  name="phone"
                  title="Telfon raqami"
                  setUpdate={setClientsToEdit}
                  value={clientsToEdit.phone}
                />
                <ItemUpdate
                  data={clientsToEdit}
                  name="adress"
                  title="address"
                  setUpdate={setClientsToEdit}
                  value={clientsToEdit.adress}
                />
              </div>

              <DialogFooter>
                <Button type="submit" className="text-white">
                  O'zgarishlarni saqlash
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ClientsList;
