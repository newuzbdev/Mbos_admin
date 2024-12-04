import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAddServer, useGetServers } from "@/hooks/useServer";
import { toast } from "@/hooks/use-toast";
import { Server } from "@/types/server";
import { ItemForm } from "@/components/Input-create";
import { FormSchema } from "../../validate";
import { useState } from "react";

interface ServerCreateInputProps {
  closeDialog?: () => void;
}

const ServerCreateInput = ({ closeDialog }: ServerCreateInputProps) => {
  const { mutate: addServer } = useAddServer();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { refetch: refetchServers } = useGetServers();
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);
    const serverData: Server = {
      name: String(data.name),
      plan: String(data.plan),
      price: Number(data.price),
      date_term: String(data.date_term),
      responsible: String(data.responsible),
      servicePaid_id: Number(data.servicePaid_id),
    };
    addServer(serverData, {
      onSuccess: () => {
        refetchServers(); 
        form.reset();
        toast({
          title: "Server muvaffaqiyatli qo'shildi.",
          variant: "success",
        });
        closeDialog?.();
      },
      onError: (error: any) => {
        toast({
          title: "Server qo'shishda xatolik.",
          variant: "destructive",
          description: error?.response.data.message,
        });
      },
      onSettled: () => {
        setLoading(false);
      },
    });
   
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-auto my-10 mt-4 space-y-5"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ItemForm title="Server nomi" form={form} name="name" />
          <ItemForm title="Tarif" form={form} name="plan" />
          <ItemForm title="Narxi" form={form} name="price" type="number" />
          <ItemForm title="Muddat" form={form} name="date_term" type="date" />
          <ItemForm title="Mas'ul shaxs" form={form} name="responsible" />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className={`px-6 py-2 text-white transition duration-200 rounded-md ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary"
          }`}
        >
          {loading ? "Saqlanmoqda..." : "Qo'shish"}
        </Button>
      </form>
    </Form>
  );
};

export default ServerCreateInput;
