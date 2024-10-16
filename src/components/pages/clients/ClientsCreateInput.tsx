import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAddClients, useGetClients } from "@/hooks/useClients";
import { toast } from "@/hooks/use-toast";
import { Clients } from "@/types/clients";
import { ItemForm } from "@/components/Input-create";
import { FormSchema } from "../../validate";

interface ClientsCreateInputProps {
  closeDialog?: () => void;
}

const ClientsCreateInput = ({ closeDialog }: ClientsCreateInputProps) => {
  const { mutate: addClient } = useAddClients();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { refetch: refetchClients } = useGetClients({});

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const clientsData = { ...data, phone: +data.phone };

    addClient(clientsData as Clients, {
      onSuccess: () => {
        refetchClients();
        form.reset();
        toast({
          title: "Mijoz muvaffaqiyatli qo'shildi.",
          variant: "success",
        });
        closeDialog?.();
      },
      onError: (error: any) => {
        toast({
          title: "Mijoz qo'shishda xatolik.",
          variant: "destructive",
          description: error?.response.data.message,
        });
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-auto my-10 mt-4 space-y-5"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ItemForm title="Tolik ism" form={form} name="F_I_O" />
          <ItemForm
            title="telefon rakam"
            form={form}
            name="phone"
            type="number"
          />
          <ItemForm title="manzil" form={form} name="adress" />
        </div>
        <Button
          type="submit"
          className="px-6 py-2 text-white transition duration-200 rounded-md bg-primary"
        >
          Qo'shish
        </Button>
      </form>
    </Form>
  );
};

export default ClientsCreateInput;
