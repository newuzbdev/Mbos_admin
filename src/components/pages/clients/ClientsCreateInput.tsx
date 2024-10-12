import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAddClients, useGetClients } from "@/hooks/useClients";
import { toast } from "@/hooks/use-toast";
import { Clients } from "@/types/clients";

const FormSchema = z.object({
  F_I_O: z.string().min(2, {
    message: "To'liq ism kamida 2 ta belgidan iborat boʻlishi kerak.",
  }),
  phone: z.number().min(6, {
    message: "Telefon raqami kamida 6 ta belgidan iborat boʻlishi kerak.",
  }),
  adress: z.string().min(2, {
    message: "Address kamida 2 ta belgidan iborat boʻlishi kerak.",
  }),
});

interface ClientsCreateInputProps {
  closeDialog?: () => void;
}

const ClientsCreateInput = ({ closeDialog }: ClientsCreateInputProps) => {
  const { mutate: addClient } = useAddClients();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      F_I_O: "",
      phone: 0,
      adress: "",
    },
  });

  const { refetch: refetchClients } = useGetClients({ page: 1, limit: 10 });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const clientsData: Omit<Clients, "id"> = {
      F_I_O: data.F_I_O,
      phone: data.phone,
      adress: data.adress,
    };

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
      onError: (error) => {
        toast({
          title: "Mijoz qo'shishda xatolik.",
          variant: "destructive",
          description: error.message,
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
          <FormField
            control={form.control}
            name="F_I_O"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-slate-700">
                  To'liq ism
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="To'liq ism kiriting"
                    {...field}
                    className="px-4 py-2 transition duration-200 border-2 rounded-md border-slate-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-slate-700">
                  Telefon raqami
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Telefon raqamini kiriting"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="px-4 py-2 transition duration-200 border-2 rounded-md border-slate-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="adress"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold text-slate-700">
                Address
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Addressni kiriting"
                  {...field}
                  className="px-4 py-2 transition duration-200 border-2 rounded-md border-slate-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
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
