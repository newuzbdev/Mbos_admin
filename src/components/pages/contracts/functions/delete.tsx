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
import { toast } from "@/hooks/use-toast";
import { useContractDelete } from "@/hooks/useContract";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function DeleteItem() {
  const [isDelete, setDelete] = useState(false);
  const { mutate } = useContractDelete();
  const { contractId } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    mutate(`${contractId}`, {
      onSuccess: async () => {
        toast({ title: "contract ochirildi", variant: "success" });
        navigate("/contract");
      },
      onError: async () => {
        toast({ title: "xatolik yuz berdi", variant: "destructive" });
      },
    });
  };

  return (
    <>
      <Button
        aria-label="Delete product"
        onClick={() => setDelete(true)}
        variant="destructive"
        size="icon"
      >
        <Trash2Icon size={20} />
      </Button>

      <AlertDialog open={isDelete} onOpenChange={setDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Siz mutlaqo ishonchingiz komilmi?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDelete(false)}>
              Bekor qilinsin
            </AlertDialogCancel>
            <AlertDialogAction
              className="text-white bg-red-500 hover:bg-red"
              onClick={handleDelete}
            >
              Albatta
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
