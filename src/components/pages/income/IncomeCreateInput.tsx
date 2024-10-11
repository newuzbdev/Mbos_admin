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
import { toast } from "@/hooks/use-toast";
import { Income } from "@/types/income.ts";
import { useAddIncome, useGetIncome } from "@/hooks/useIncome.ts";
import { Textarea } from "@/components/ui/textarea";
import { ItemForm } from "@/components/Input-create.tsx";
import { Select } from "@radix-ui/react-select";
import {SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

// Formaga schema yaratish
const FormSchema = z.object({
  amount: z.preprocess((value) => parseFloat(value as string), z.number().min(2, {
    message: "Miqdor kamida 2 raqam bo'lishi kerak.",
  })),
  payment_method: z.string().min(1, {
    message: "To'lov usuli kamida 1 belgidan iborat bo'lishi kerak.",
  }),
  is_paid: z.string().min(2, {
    message: "Holati kamida 2 belgidan iborat bo'lishi kerak.",
  }),
  description: z.string().min(2, {
    message: "Izoh kamida 2 belgidan iborat bo'lishi kerak.",
  }),
  date: z.string().min(1, {
    message: "Sana kamida 1 belgidan iborat bo'lishi kerak.",
  }),
});

interface IncomeCreateInputProps {
  closeDialog?: () => void;
}

const IncomeCreateInput = ({ closeDialog }: IncomeCreateInputProps) => {
  const { mutate: addIncome } = useAddIncome();
  const { refetch: refetchIncome } = useGetIncome();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: 0,
      payment_method: '',
      is_paid: "",
      description: '',
      date: ''
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("Form yuborildi, ma'lumotlar:", data); // Debug uchun log

    const incomeData: Omit<Income, 'id'> = {
      amount: data.amount,
      payment_method: data.payment_method,
      is_paid: data.is_paid,
      description: data.description,
      date: data.date,
    };

    addIncome(incomeData as Income, {
      onSuccess: () => {
        refetchIncome();
        form.reset();
        toast({
          title: "Daromad muvaffaqiyatli qo'shildi.",
          variant: "success",
        });
        closeDialog?.(); // Dialogni yopish, agar kerak bo'lsa
      },
      onError: (error) => {
        console.error("Xatolik yuz berdi:", error); // Xatoni konsolga chiqarish
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
        onSubmit={form.handleSubmit(onSubmit)} // Form yuborilganda onSubmit funksiyasini chaqirish
        className="h-auto my-10 mt-4 space-y-5"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ItemForm
            enums={["naqd", "otkazma", "online", "oylik", "yetkazib berish", "bsohqa"]}
            title="To'lov usuli"
            type="enum"
            form={form}
            name="payment_method"
          />

          {/* Miqdor maydoni */}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-slate-700">
                  Miqdori
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Miqdorini kiriting"
                    {...field}
                    value={field.value === 0 ? "" : field.value} // Agar qiymat 0 bo'lsa, bo'sh string chiqariladi
                    onChange={(e) => field.onChange(e.target.value === "" ? 0 : Number(e.target.value))} // Agar foydalanuvchi bo'sh maydon qoldirsa, `0` ga o'zgartiriladi
                    className="px-4 py-2 transition duration-200 border-2 rounded-md border-slate-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />

          {/* To'lov usuli maydoni */}
          <FormField
            control={form.control}
            name="payment_method"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-slate-700">
                  To'lov usuli
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="px-4 py-2 transition duration-200 border-2 rounded-md border-slate-300 focus:border-blue-500 focus:ring focus:ring-blue-200">
                      <SelectValue placeholder="To'lov usulini tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Naqd pul</SelectItem>
                      <SelectItem value="translation">Pul o'tkazmasi</SelectItem>
                      <SelectItem value="online">Onlayn to'lov</SelectItem>
                      <SelectItem value="salary">Ish haqi</SelectItem>
                      <SelectItem value="delivery">Yetkazib berish</SelectItem>
                      <SelectItem value="others">Boshqalar</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
        </div>


        {/* Izoh maydoni */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold text-slate-700">
                Izoh
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Izoh kiriting"
                  {...field}
                  className="px-4 py-2 transition duration-200 border-2 rounded-md border-slate-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        {/* Holati maydoni */}
        <FormField
          control={form.control}
          name="is_paid"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold text-slate-700">
                To'lov usuli
              </FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="px-4 py-2 transition duration-200 border-2 rounded-md border-slate-300 focus:border-blue-500 focus:ring focus:ring-blue-200">
                    <SelectValue placeholder="To'lov usulini tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">Naqd pul</SelectItem>
                    <SelectItem value="no_paid">Pul o'tkazmasi</SelectItem>

                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        {/* Sana maydoni */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold text-slate-700">
                Sana
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Sana kiriting"
                  type='date'
                  {...field}
                  className="px-4 py-2 transition duration-200 border-2 rounded-md border-slate-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        {/* Qo'shish tugmasi */}
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
