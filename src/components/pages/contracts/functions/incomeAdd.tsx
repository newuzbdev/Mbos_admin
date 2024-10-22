import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { ItemForm } from "@/components/Input-create";
import { FormSchema } from "@/components/validate";
import { useContractUpdate, useGetContract } from "@/hooks/useContract";
import { Contract } from "@/types/contract";
import { useGetClient } from "@/hooks/useClients";
import { useParams } from "react-router-dom";
import { Plus } from "lucide-react";

interface ContractsCreateInputProps {
  closeDialog?: () => void;
}

const ContractIncomeCreateInput = ({
  closeDialog,
}: ContractsCreateInputProps) => {
  const { mutate: updateContract } = useContractUpdate();
  const { clientsId } = useParams<{ clientsId: string }>();
  const { refetch: refetchClients } = useGetClient(clientsId || "");
  const { contractId } = useParams<{ contractId: string }>();
  const { data: contractDetails } = useGetContract(contractId || "");
  const form = useForm<Contract>({
    resolver: zodResolver(FormSchema),
  });

  const existingAdvancePayment =
    Number(contractDetails?.data?.data?.advancePayment) || 0;

  function onSubmit(data: Contract) {
    const newAdvancePayment = Number(data.advancePayment);
    const updatedAdvancePayment = existingAdvancePayment + newAdvancePayment;
    const contractsData = {
      advancePayment: updatedAdvancePayment,
    };
    updateContract(

      { id: contractId!, ...contractsData },
      {
        onSuccess: () => {
          refetchClients();
          form.reset();
          toast({
            title: "Shartnoma muvaffaqiyatli yangilandi.",
            variant: "success",
          });
          closeDialog?.();
        },
        onError: (error) => {
          toast({
            title: "Shartnomani yangilashda xatolik.",
            variant: "destructive",
            description: error.message,
          });
        },
      }
    );

  }  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center space-x-2 text-white bg-primary">
          <Plus className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="h-auto my-10 mt-4 space-y-5"
          >
            <div>
              <ItemForm
                title="To'lov"
                form={form}
                name="advancePayment"
                type="number"
              />
            </div>
            <Button
              type="submit"
              className="px-6 py-2 text-white transition duration-200 rounded-md bg-primary"
            >
              Yangilash
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ContractIncomeCreateInput;
