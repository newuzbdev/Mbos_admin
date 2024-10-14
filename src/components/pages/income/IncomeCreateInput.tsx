import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Income } from "@/types/income.ts";
import { useAddIncome, useGetIncome } from "@/hooks/useIncome.ts";
import { ItemForm } from "@/components/Input-create";
import { FormSchema } from "../contracts/validate";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clients } from "@/types/clients";
import { useGetClients } from "@/hooks/useClients";

interface IncomeCreateInputProps {
  closeDialog?: () => void;
}

const IncomeCreateInput = ({ closeDialog }: IncomeCreateInputProps) => {
  const { mutate: addIncome } = useAddIncome();
  const { data: user } = useGetClients({});

  const { refetch: refetchIncome } = useGetIncome({});

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // Convert user_id if necessary
      amount: 0,
      payment_method: "",
      is_paid: "",
      description: "",
      date: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const incomeData = { ...data, amount: +data.amount };

    addIncome(incomeData as Income, {
      onSuccess: () => {
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
          <FormField
            control={form.control}
            name={"user_id"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-slate-700">
                  Mijozlar
                </FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(+value)} // Casting value to number
                  value={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger className="px-4 py-2 transition duration-200 border-2 rounded-md border-slate-300 focus:border-blue-500 focus:ring focus:ring-blue-200">
                      <SelectValue placeholder="Mijozni tanlang">
                        {field.value
                          ? user?.data.data.find(
                              (client: Clients) => client.id === field.value
                            )?.F_I_O
                          : "Mijozni tanlang"}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {user?.data.data?.map((el: Clients) => (
                        <SelectItem key={el.id} value={el.id.toString()}>
                          {el.F_I_O}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
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
        </div>
        <div className="grid grid-cols-2 gap-3">
          <ItemForm
            form={form}
            type="enum"
            name="is_paid"
            enums={[
              { name: "paid", value: "tushum" },
              { name: "no_paid", value: "chikim" },
            ]}
            title="tushum yoki chikim"
          />
          {form.watch("is_paid") === "paid" ? (
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
          )}
        </div>
        <ItemForm form={form} type="date" name="date" title="vaqtni kiriting" />
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
