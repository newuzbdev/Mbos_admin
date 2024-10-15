import { ItemForm } from "@/components/Input-create";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

import { toast } from "@/hooks/use-toast";
import { useClientsUpdate, useGetClient } from "@/hooks/useClients";
import { Clients } from "@/types/clients";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function UpdateItem({ clients }: { clients: Clients }) {
  const { mutate } = useClientsUpdate();

  const { refetch } = useGetClient(clients.id.toString());

  const [isUpdate, setUpdate] = useState(false);
  const form = useForm({
    defaultValues: clients,
  });

  const handleSubmit = (item: Clients) => {
    const { F_I_O, phone, adress } = item;

    const dataToSend = {
      id: clients.id,
      F_I_O,
      phone: +phone,
      adress,
    };

    mutate(dataToSend, {
      onSuccess: () => {
        toast({ title: "Mijoz ma'lumotlari o'zgartirildi", variant: "success" });
        refetch();
        form.reset();
        setUpdate(false);
      },
      onError: () => {
        toast({ title: "Xatolik yuz berdi", variant: "destructive" });
      },
    });
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
        <DialogContent className="max-w-[48rem]">
          <DialogHeader>
            <DialogTitle>Mijoz ro'yxatini tahrirlash</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="h-auto space-y-5"
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <ItemForm title="Ismi" form={form} name="F_I_O" type="text" />
                <ItemForm
                  title="Telefon"
                  form={form}
                  name="phone"
                  type="number"
                />
                <ItemForm
                  title="Manzil"
                  form={form}
                  name="adress"
                  type="text"
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="text-white">
                  O'zgarishlarni saqlash
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}