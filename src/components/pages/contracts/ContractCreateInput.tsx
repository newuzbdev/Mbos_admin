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
import { toast } from "@/hooks/use-toast";
import { ItemForm } from "@/components/Input-create";
import { FormSchema } from "./validate";
import { useAddContract, useGetContract } from "@/hooks/useContract";
import { Contract } from "@/types/contract";
import { useGetClients } from "@/hooks/useClients";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clients } from "@/types/clients";

interface ContractsCreateInputProps {
  closeDialog?: () => void;
}

const ContractCreateInput = ({ closeDialog }: ContractsCreateInputProps) => {
  const { mutate: addContract } = useAddContract();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const { data: user } = useGetClients();
  const { refetch: refetchContract } = useGetContract();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const contractsData = FormSchema.parse(data);

    addContract(
      {
        ...contractsData,
        count: +contractsData.count,
        user_id: contractsData.user_id,
      } as Contract,
      {
        onSuccess: () => {
          refetchContract();
          form.reset();
          toast({
            title: "Contract added successfully.",
            variant: "success",
          });
          closeDialog?.();
        },
        onError: (error) => {
          toast({
            title: "Error adding Contract.",
            variant: "destructive",
            description: error.message,
          });
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-auto my-10 mt-4 space-y-5"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ItemForm title="miktori" form={form} name="count" type="number" />
          <ItemForm title="narx" form={form} name="price" type="number" />
          <ItemForm title="xizmat" form={form} name="service" />
          <FormField
            control={form.control}
            name={"user_id"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-slate-700">
                  Foydalanuvchi
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value?.toString()}>
                  <FormControl>
                    <SelectTrigger className="px-4 py-2 transition duration-200 border-2 rounded-md border-slate-300 focus:border-blue-500 focus:ring focus:ring-blue-200">
                      <SelectValue placeholder="Select a Client">
                        {field.value
                          ? user?.data.data.find(
                              (client:Clients) => client.id === field.value
                            )?.F_I_O
                          : "Select a Client"}
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
            enums={["paid", "no_paid"]}
            title="xarid holati"
            type="enum"
            form={form}
            name="purchase_status"
          />
          <ItemForm
            enums={["subscription_fee", "one_bay"]}
            title="shartnoma turi"
            type="enum"
            form={form}
            name="shartnoma_turi"
          />
          <ItemForm title="sana" type="date" form={form} name="sana" />
          <ItemForm
            title="shartnoma muddati"
            type="date"
            form={form}
            name="shartnoma_muddati"
          />
          <ItemForm
            title="texnik muddati"
            type="date"
            form={form}
            name="texnik_muddati"
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

export default ContractCreateInput;
