import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ItemForm } from "@/components/Input-create";
import { FormSchema } from "../../validate";
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
import { useGetServices } from "@/hooks/useService";
import { IService } from "@/types/service";

interface ContractsCreateInputProps {
  closeDialog?: () => void;
}

const ContractCreateInput = ({ closeDialog }: ContractsCreateInputProps) => {
  const { mutate: addContract } = useAddContract();
  const { data: user } = useGetClients({ limit: 999 });
  const { data: service } = useGetServices({ limit: 999 });

  const form = useForm<Contract>({
    resolver: zodResolver(FormSchema),
  });
  const { refetch: refetchContract } = useGetContract();

  function onSubmit(data: Contract) {
    const { price, ...contractsData } = {
      ...data,
      count: Number(data.count),
      advancePayment: Number(data.advancePayment),
      user_id: Number(data.user_id),
      tolash_sana: new Date(),
    };

    addContract(contractsData as Contract, {
      onSuccess: () => {
        refetchContract();
        form.reset();
        toast({
          title: "Shartnoma muvaffaqiyatli qo'shildi.",
          variant: "success",
        });
        closeDialog?.();
      },
      onError: (error) => {
        toast({
          title: "Shartnoma qo'shishda xatolik.",
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
          <ItemForm title="Miktori" form={form} name="count" type="number" />
          <ItemForm
            title="Oldindan To'lov"
            form={form}
            name="advancePayment"
            type="number"
          />

          <FormField
            control={form.control}
            name={"service_id"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-slate-700">
                  xizmatlar
                </FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(+value)}
                  value={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger className="px-4 py-2 transition duration-200 border-2 rounded-md border-slate-300 focus:border-blue-500 focus:ring focus:ring-blue-200">
                      <SelectValue placeholder="Mijozni tanlang">
                        {field.value
                          ? service?.data?.data.find(
                              (service: IService) => service.id === +field.value
                            )?.title
                          : "Xizmat tanlang"}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {service?.data?.data.length &&
                        service?.data?.data?.map((el: IService) => (
                          <SelectItem key={el.id} value={el.id.toString()}>
                            {el.title}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"user_id"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-slate-700">
                  Mijozlar
                </FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(+value)}
                  value={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger className="px-4 py-2 transition duration-200 border-2 rounded-md border-slate-300 focus:border-blue-500 focus:ring focus:ring-blue-200">
                      <SelectValue placeholder="Mijozni tanlang">
                        {field.value
                          ? user?.data?.data.find(
                              (client: Clients) => client.id === field.value
                            )?.F_I_O
                          : "Mijozni tanlang"}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {user?.data?.data.length &&
                        user?.data?.data?.map((el: Clients) => (
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
            enums={[
              { name: "subscription_fee", value: "Oylik tolov" },
              { name: "one_bay", value: "Bir martalik tolov" },
            ]}
            title="Shartnoma turi"
            type="enum"
            form={form}
            name="shartnoma_turi"
          />
          <ItemForm title="sana" type="date" form={form} name="sana" />
          <ItemForm
            title="Shartnoma muddati"
            type="date"
            form={form}
            name="shartnoma_muddati"
          />
          <ItemForm
            title="Texnik muddati"
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
