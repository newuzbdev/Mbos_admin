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
import { useServerDelete } from "@/hooks/useServer";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function ServerDelete() {
  const [isDelete, setDelete] = useState(false);
  const { mutate } = useServerDelete();
  const { serverId } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    mutate(`${serverId}`, {
      onSuccess: async () => {
        toast({ title: "Server o'chirildi", variant: "success" });
        navigate("/server");
      },
      onError: async () => {
        toast({ title: "Xatolik yuz berdi", variant: "destructive" });
      },
    });
  };

  return (
    <>
      <div>
        <Button
          aria-label="Delete product"
          onClick={() => setDelete(true)}
          variant="destructive"
          size="icon"
        >
          <Trash2Icon size={20} />
        </Button>
      </div>

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
