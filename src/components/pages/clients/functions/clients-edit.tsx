import { ItemForm } from "@/components/Input-create";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { PhoneInput } from "@/components/phone-input";
import { toast } from "@/hooks/use-toast";
import { useClientsUpdate, useGetClient } from "@/hooks/useClients";
import { Clients } from "@/types/clients";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

export function UpdateItem({ clients }: { clients: Clients }) {
  const { mutate } = useClientsUpdate();
  const { refetch } = useGetClient(clients.id.toString());

  const [isUpdate, setUpdate] = useState(false);
  const form = useForm({
    defaultValues: clients,
  });

  const handleSubmit = (item: Clients) => {
    const phoneNumber =
      typeof item.phone === "string"
        ? (item.phone as string).replace(/\D/g, "")
        : item.phone.toString();

    const dataToSend = {
      id: clients.id,
      F_I_O: item.F_I_O,
      INN_number: item.INN_number,
      phone: parseInt(phoneNumber, 10),
      adress: item.adress,
      balance: item.balance,
    };

    mutate(dataToSend, {
      onSuccess: () => {
        toast({
          title: "Mijoz ma'lumotlari o'zgartirildi",
          variant: "success",
        });
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
                  title="Balance"
                  form={form}
                  name="balance"
                  type="number"
                />
                <ItemForm
                  title="INN raqami"
                  form={form}
                  name="INN_number"
                  type="text"
                />

                <Controller
                  name="phone"
                  control={form.control}
                  render={({ field }) => (
                    <div>
                      <label
                        htmlFor="phone"
                        className="block mb-2 text-base font-bold text-gray-500"
                      >
                        Telefon raqami
                      </label>
                      <PhoneInput
                        {...field}
                        id="phone"
                        onValueChange={(values) => field.onChange(values.value)}
                        placeholder="Telefon raqami"
                      />
                    </div>
                  )}
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
