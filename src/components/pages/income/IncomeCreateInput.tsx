import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Income } from "@/types/income.ts";
import { useAddIncome, useGetIncome } from "@/hooks/useIncome.ts";
import { ItemForm } from "@/components/Input-create";
import { FormSchema } from "../../validate";
import { Form } from "@/components/ui/form";
import { useGetClient, useGetClients } from "@/hooks/useClients";
import { SearchClient } from "./functions/searchClients";
import { useLocation, useParams } from "react-router-dom";

interface IncomeCreateInputProps {
  closeDialog?: () => void;
}

const IncomeCreateInput = ({ closeDialog }: IncomeCreateInputProps) => {
  const { mutate: addIncome } = useAddIncome();
  const { data: user } = useGetClients({ limit: 999 });
  const location = useLocation();
  const { clientsId } = useParams<{ clientsId: string }>();

  const { refetch: refetchIncome } = useGetIncome({});
  const { refetch: refetchClients } = useGetClient(clientsId || "");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const incomeData = {
      ...data,
      amount: +data.amount,
      user_id: Number(clientsId) || data.user_id,
    };

    addIncome(incomeData as Income, {
      onSuccess: () => {
        refetchClients();
        refetchIncome();
        form.reset();
        toast({
          title: "Daromad muvaffaqiyatli qo'shildi.",
          variant: "success",
        });
        closeDialog?.();
      },
      onError: (error) => {
        toast({
          title: "Daromad qo'shishda xatolik.",
          variant: "destructive",
          description: error.message,
        });
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-auto my-10 mt-4 space-y-5"
      >
        <div className="grid grid-cols-2 gap-3">
          {!location.pathname.includes("clients/") && (
            <SearchClient form={form} client={user} title="Mijoz" />
          )}
          <ItemForm
            form={form}
            name="amount"
            title="narx miqdori"
            type="number"
          />
          <ItemForm
            form={form}
            type="text"
            name="description"
            title="izoh qoldiring (mojburiy emas)"
          />
          <ItemForm
            form={form}
            type="date"
            name="date"
            title="vaqtni kiriting"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <ItemForm
            form={form}
            type="enum"
            name="is_paid"
            enums={[
              { name: "paid", value: "Tushum" },
              { name: "confirm_payment", value: "Jarayonda" },
              { name: "no_paid", value: "Chiqim" },
            ]}
            title="tushum yoki chiqim"
          />
          {form.watch("is_paid") === "paid" ||
          form.watch("is_paid") === "confirm_payment" ? (
            <ItemForm
              form={form}
              type="enum"
              name="payment_method"
              enums={[
                { name: "cash", value: "naxt" },
                { name: "translation", value: "otkazma" },
                { name: "online", value: "online" },
                { name: "other", value: "boshka" },
              ]}
              title="tushum yoki chikim"
            />
          ) : (
            <ItemForm
              form={form}
              type="enum"
              name="payment_method"
              enums={[
                { name: "salary", value: "ish haqi" },
                { name: "delivery", value: "yetkazib berish" },
                { name: "other", value: "boshka" },
              ]}
              title="tushum yoki chikim"
            />
          )}{" "}
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
export default IncomeCreateInput;
