import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { ItemForm } from "@/components/Input-create";
import { FormSchema } from "@/components/validate";
import {  useGetContracts } from "@/hooks/useContract";
import { Contract } from "@/types/contract";
import { useGetClient } from "@/hooks/useClients";
import { useParams } from "react-router-dom";
import { Plus } from "lucide-react";
import { useAddIncome } from "@/hooks/useIncome";

interface ContractsCreateInputProps {
  closeDialog?: () => void;
}

const ContractIncomeCreateInput = ({
  closeDialog,
}: ContractsCreateInputProps) => {
  const { mutate: addIncome } = useAddIncome();
  const { clientsId } = useParams<{ clientsId: string }>();
  const { refetch: refetchClients } = useGetClient(clientsId || "");

  const form = useForm<Contract>({
    resolver: zodResolver(FormSchema),
  });
  const { refetch: refetchContract } = useGetContracts({});

  function onSubmit(data: any) {
    const { ...contractsData } = {
      ...data,
      advancePayment: Number(data.advancePayment),
    };

    addIncome(contractsData as any, {
      onSuccess: () => {
        refetchClients();
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
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center space-x-2 text-white bg-primary"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="h-auto my-10 mt-4 space-y-5"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <ItemForm
                title="Oldindan To'lov"
                form={form}
                name="advancePayment"
                type="number"
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
      </DialogContent>
    </Dialog>
  );
};

export default ContractIncomeCreateInput;
