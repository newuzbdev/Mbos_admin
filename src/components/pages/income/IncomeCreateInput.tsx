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
import { useAddIncome, useGetIncome } from "@/hooks/useIncome.ts";
import { toast } from "@/hooks/use-toast";
import {Income} from "@/types/income.ts";

const FormSchema = z.object({
  translation_benefit: z.number().min(2, {
    message: "F.I.O must be at least 2 characters.",
  }),
  cash_benefit: z.number().min(2, {
    message: "Cash benefit must be at least 1 character.",
  }),
  online_benefit: z.number().min(2, {
    message: "Online benefit must be at least 1 character.",
  }),
  benefit: z.number().min(2, {
    message: "Benefit must be at least 1 character.",
  }),
  workers_harm: z.number().min(2, {
    message: "Workers' harm must be at least 1 character.",
  }),
  harm: z.number().min(2, {
    message: "Harm must be at least 1 character.",
  }),
});


interface IncomeCreateInputProps {
  closeDialog?: () => void;
}

const IncomeCreateInput = ({ closeDialog }: IncomeCreateInputProps) => {
  const { mutate: addIncome } = useAddIncome();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      translation_benefit: 0,
      cash_benefit:0,
      online_benefit:0,
      benefit:0,
      workers_harm:0,
      harm:0
    },
  });

  const { refetch: refetchClients } = useGetIncome();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const IncomeData: Omit<Income, 'id'> = {
      translation_benefit: data.translation_benefit,
      cash_benefit: data.cash_benefit,
      online_benefit: data.online_benefit,
      benefit:data.benefit,
      workers_harm:data.workers_harm,
      harm:data.harm
    };

    addIncome(IncomeData as Income, {
      onSuccess: () => {
        refetchClients();
        form.reset();
        toast({
          title: "Client added successfully.",
          variant: "success",
        });
        closeDialog?.();
      },
      onError: (error) => {
        toast({
          title: "Error adding client.",
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
            name="translation_benefit"
            render={({field}) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-slate-700">
                  Foyda
                </FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder="Foyda"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="px-4 py-2 transition duration-200 border-2 rounded-md border-slate-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500"/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="online_benefit"
            render={({field}) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-slate-700">
                  Naqt pul
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Naqt pul kiriting"
                    {...field}
                     onChange={(e) => field.onChange(Number(e.target.value))}
                    className="px-4 py-2 transition duration-200 border-2 rounded-md border-slate-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500"/>
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="cash_benefit"
            render={({field}) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-slate-700">
                  Naqd pul foydasi
                </FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder="Online pul"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="px-4 py-2 transition duration-200 border-2 rounded-md border-slate-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500"/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="benefit"
            render={({field}) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-slate-700">
                  benefit
                </FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder="benefit"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="px-4 py-2 transition duration-200 border-2 rounded-md border-slate-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500"/>
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="workers_harm"
            render={({field}) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-slate-700">
                  workers_harm
                </FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder="workers_harm"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="px-4 py-2 transition duration-200 border-2 rounded-md border-slate-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500"/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="harm"
            render={({field}) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-slate-700">
                  harm
                </FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder="harm"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="px-4 py-2 transition duration-200 border-2 rounded-md border-slate-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500"/>
              </FormItem>
            )}
          />
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