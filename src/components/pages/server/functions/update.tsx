import { useParams } from "react-router-dom";
import { useGetServer, useServerUpdate } from "@/hooks/useServer";
import { Server } from "@/types/server";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";

export default function ServerUpdate() {
  const { serverId } = useParams();
  const { mutate: serverUpdate } = useServerUpdate();
  const { data: serverDetails, refetch: refetchServer } =
    useGetServer(serverId);
  const servers: Server[] = serverDetails?.data.data
    ? [serverDetails.data.data]
    : [];
  const [isUpdate, setUpdate] = useState(false);
  const form = useForm<Omit<Server, "id">>({
    defaultValues: {
      name: servers[0]?.name || "",
      plan: servers[0]?.plan || "",
      price: servers[0]?.price || 0,
      responsible: servers[0]?.responsible || "",
      date_term: servers[0]?.date_term || "",
    },
  });

  const handleSubmit = (data: Omit<Server, "id">) => {
    serverUpdate(
      {
        id: serverId,
        ...data,
        price: Number(data.price),
      },
      {
        onSuccess: () => {
          toast({
            title: "Server tafsilotlar muvaffaqiyatli yangilandi",
            variant: "success",
          });
          refetchServer();
          setUpdate(false);
        },
        onError: () => {
          toast({ title: "Xatolik yuz berdi", variant: "destructive" });
        },
      }
    );
  };

  return (
    <>
      <Button
        aria-label="Edit clients"
        onClick={() => setUpdate(true)}
        variant="ghost"
        size="icon"
      >
        <PencilIcon size={20} className="text-primary" />
      </Button>

      <Dialog open={isUpdate} onOpenChange={setUpdate}>
        <DialogContent className="max-w-[28rem]">
          <DialogHeader>
            <DialogTitle> Server Details</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="h-auto space-y-5"
          >
            <div>
              <Label htmlFor="name">Xizmat nomi</Label>
              <Input
                {...form.register("name")}
                id="name"
                className="p-2 border-2 border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="plan">Server tarifi</label>
              <Input
                {...form.register("plan")}
                id="plan"
                className="p-2 border-2 border-gray-300 rounded-md"
              />
            </div>
            <div>
              <Label htmlFor="price">Narxi</Label>
              <Input
                type="number"
                {...form.register("price", { valueAsNumber: true })}
                id="price"
                className="p-2 border-2 border-gray-300 rounded-md"
              />
            </div>
            <div>
              <Label htmlFor="responsible">Mas'ul</Label>
              <Input
                {...form.register("responsible")}
                id="responsible"
                className="p-2 border-2 border-gray-300 rounded-md"
              />
            </div>
            <div>
              <Label htmlFor="date_term">Sanasi</Label>
              <Input
                type="date"
                {...form.register("date_term")}
                id="date_term"
                className="p-2 border-2 border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                className="p-2 text-white rounded-md bg-primary "
              >
                O'zgarishlarni saqlash
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
