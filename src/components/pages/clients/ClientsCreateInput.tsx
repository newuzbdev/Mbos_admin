import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAddClients, useGetClients } from "@/hooks/useClients";
import { toast } from "@/hooks/use-toast";
import { Clients } from "@/types/clients";
import { ItemForm } from "@/components/Input-create";
import { FormSchema } from "../../validate";
import { PhoneInput } from "@/components/phone-input"; 

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
    const phoneNumber = typeof data.phone === 'string' ? data.phone.replace(/\D/g, "") : data.phone.toString();

    const clientsData = { ...data, phone: parseInt(phoneNumber,) };

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
         
          <Controller
            name="phone"
            control={form.control}
            render={({ field }) => (
              <div>
                <label htmlFor="phone" className="block mb-2 text-base font-bold text-gray-500">Telefon raqami</label>
                <PhoneInput
                  {...field}
                  id="phone"
                  onValueChange={(values) => field.onChange(values.value)}
                  placeholder="telefon rakam9"
                />
              </div>
            )}
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