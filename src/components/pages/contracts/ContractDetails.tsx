// import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
// import { toast } from "@/hooks/use-toast";
import DataTable from "@/components/data-table";
import {
  // useContractDelete,
  // useContractUpdate,
  useGetContract,
} from "@/hooks/useContract";
import { Contract } from "@/types/contract";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const makeColumns = (
  // setContractToEdit: (p: Contract) => void,
  // setContractToDelete: (p: Contract) => void
  
): ColumnDef<Contract>[] => [
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
      <div
        className="flex items-center justify-center cursor-pointer"
      >
        <Eye className="w-6 h-6 text-primary hover:text-blue-500" />
      </div>
    ),
  },
];

const ContractDetails = () => {
  // const [contractToDelete, setContractToDelete] = useState<
  //   Contract | undefined
  // >();
  // const [contractToEdit, setContractToEdit] = useState<Contract | undefined>();
  // const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  // const [editDialogVisible, setEditDialogVisible] = useState(false);
  const { data: products, isLoading } = useGetContract();
  // const {
  //   mutate: deleteProduct,
  //   isSuccess: isDeleteSuccess,
  //   isError: isDeleteError,
  // } = useContractDelete();
  // const {
  //   mutate: updateContract,
  //   isSuccess: isUpdateSuccess,
  //   isError: isUpdateError,
  // } = useContractUpdate();

  // useEffect(() => {
  //   if (isDeleteSuccess) {
  //     toast({
  //       variant: "success",
  //       title: "Product successfully deleted",
  //     });
  //     refetch();
  //     setDeleteDialogVisible(false);
  //   } else if (isDeleteError) {
  //     toast({
  //       variant: "destructive",
  //       title: "Error deleting product",
  //     });
  //   }
  // }, [isDeleteSuccess, isDeleteError, refetch]);

  // useEffect(() => {
  //   if (isUpdateSuccess) {
  //     toast({
  //       variant: "success",
  //       title: "Product successfully updated",
  //     });
  //     refetch();
  //     setEditDialogVisible(false);
  //   } else if (isUpdateError) {
  //     toast({
  //       variant: "destructive",
  //       title: "Error updating product",
  //     });
  //   }
  // }, [isUpdateSuccess, isUpdateError, refetch]);
  // useEffect(() => {
  //   if (contractToDelete) setDeleteDialogVisible(true);
  // }, [contractToDelete]);
  // useEffect(() => {
  //   if (contractToEdit) setEditDialogVisible(true);
  // }, [contractToEdit]);

  // const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (contractToEdit) {
  //     updateContract({
  //       id: contractToEdit.id,
  //       sana: contractToEdit.sana,
  //       shartnoma_muddati: contractToEdit.shartnoma_muddati,
  //       texnik_muddati: contractToEdit.texnik_muddati,
  //       shartnoma_turi: contractToEdit.shartnoma_turi,
  //       price: contractToEdit.price,
  //       count: contractToEdit.count,
  //       service: contractToEdit.service,
  //       izoh: contractToEdit.izoh,
  //       advancePayment: contractToEdit.advancePayment,
  //     });
  //   }
  // };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full">
      <div className="p-4 border rounded-md">
        <h1 className="px-4 pt-4 font-bold">Mijozlar ro'yhati</h1>
        <DataTable
          columns={makeColumns()}
          data={products?.data.data || []}
        />
        {/* <DataTable
          columns={makeColumns(setContractToEdit, setContractToDelete)}
          data={products?.data.data || []}
        /> */}
      </div>

      {/* {contractToDelete && (
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
                onClick={() => deleteProduct(contractToDelete.id.toString())}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      {contractToEdit && (
        <Dialog open={editDialogVisible} onOpenChange={setEditDialogVisible}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="sana" className="text-right">
                    Sana
                  </Label>
                  <Input
                    id="sana"
                    value={contractToEdit.sana}
                    onChange={(e) =>
                      setContractToEdit({
                        ...contractToEdit,
                        sana: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="shartnoma_muddati" className="text-right">
                    Shartnoma muddati
                  </Label>
                  <Input
                    id="shartnoma_muddati"
                    value={contractToEdit.shartnoma_muddati}
                    onChange={(e) =>
                      setContractToEdit({
                        ...contractToEdit,
                        shartnoma_muddati: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="texnik_muddati" className="text-right">
                    Texnik muddati
                  </Label>
                  <Input
                    id="texnik_muddati"
                    value={contractToEdit.texnik_muddati}
                    onChange={(e) =>
                      setContractToEdit({
                        ...contractToEdit,
                        texnik_muddati: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="shartnoma_turi" className="text-right">
                    Shartnoma turi
                  </Label>
                  <Input
                    id="shartnoma_turi"
                    value={contractToEdit.shartnoma_turi}
                    onChange={(e) =>
                      setContractToEdit({
                        ...contractToEdit,

                        shartnoma_turi: e.target.value as EnumShartnoma,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="price" className="text-right">
                    Narx
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    value={contractToEdit.price}
                    onChange={(e) =>
                      setContractToEdit({
                        ...contractToEdit,
                        price: +e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="price" className="text-right">
                    Oldindan to'lov
                  </Label>
                  <Input
                    id="advancePayment"
                    type="number"
                    value={contractToEdit.advancePayment}
                    onChange={(e) =>
                      setContractToEdit({
                        ...contractToEdit,
                        advancePayment: +e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="count" className="text-right">
                    Miqdor
                  </Label>
                  <Input
                    id="count"
                    type="number"
                    value={contractToEdit.count}
                    onChange={(e) =>
                      setContractToEdit({
                        ...contractToEdit,
                        count: +e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="service" className="text-right">
                    Xizmat
                  </Label>
                  <Input
                    id="service"
                    value={contractToEdit.service}
                    onChange={(e) =>
                      setContractToEdit({
                        ...contractToEdit,
                        service: e.target.value,
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
      )} */}
    </div>
  );
};

export default ContractDetails;
