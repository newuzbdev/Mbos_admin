import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ItemForm } from "@/components/Input-create";
import { FormSchema } from "../../validate";
import { useAddContract, useGetContracts } from "@/hooks/useContract";
import { Contract } from "@/types/contract";
import { useGetClients } from "@/hooks/useClients";
import { useGetServices } from "@/hooks/useService";
import { SearchService } from "./functions/searchService";
import { EnumServiceType } from "@/types/service";
import { SearchClient } from "./functions/searchClient";
import { useLocation, useParams } from "react-router-dom";

interface ContractsCreateInputProps {
  closeDialog?: () => void;
}

const ContractCreateInput = ({ closeDialog }: ContractsCreateInputProps) => {
  const { mutate: addContract } = useAddContract();
  const { data: user, refetch: refetchClients } = useGetClients({ limit: 999 });
  const { data: service } = useGetServices({
    limit: 999,
    type: EnumServiceType.other,
  });

  const form = useForm<Contract>({
    resolver: zodResolver(FormSchema),
  });
  const { refetch: refetchContract } = useGetContracts({});
  const location = useLocation();
  const { clientsId } = useParams();

  function onSubmit(data: Contract) {
    const { ...contractsData } = {
      ...data,
      count: Number(data.count),
      advancePayment: Number(data.advancePayment),
      user_id: Number(clientsId) || Number(data?.user_id),
      tolash_sana: new Date(),
    };

    addContract(contractsData as Contract, {
      onSuccess: () => {
        refetchClients()
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

          <SearchService
            form={form}
            service={service}
            title={"service / product"}
          />
          {!location.pathname.includes("clients/") && (
            <SearchClient form={form} client={user} title={"Foydalanuvchi"} />
          )}
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
