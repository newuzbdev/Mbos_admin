import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ItemForm } from "@/components/Input-create";
import { FormSchema } from "@/components/validate";
import { Contract } from "@/types/contract";
import { useParams } from "react-router-dom";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useContractUpdate, useGetContract } from "@/hooks/useContract";
import { useClientsUpdate } from "@/hooks/useClients";
import { toast } from "@/hooks/use-toast";

const ContractIncomeCreateInput = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { contractId } = useParams<{ contractId: string }>();
  const { data: contractDetails } = useGetContract(contractId || "");
  const { mutate: updateClient } = useClientsUpdate();
  const { mutate: updateContract } = useContractUpdate();
  const { refetch } = useGetContract(contractId);
  const form = useForm<Contract>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: Contract) => {
    const {
      created_at,
      updated_at,
      isDeleted,
      whoCreated,
      whoUpdated,
      ...userBalance
    } = contractDetails?.data?.data.user;
    if (+userBalance.balance < data.advancePayment) {
      toast({
        title: "Balance da Yetarli mablag' mavjud emas",
        description: "To'lovni amalga oshirish uchun mablag' yetarli emas",
        variant: "destructive",
      });
      return null;
    }

    updateClient({
      ...userBalance,
      balance: (+userBalance.balance - +data.advancePayment).toString(),
    });

    updateContract(
      {
        ...data,
        id: contractId,
        advancePayment:
          +contractDetails?.data.data.advancePayment + +data.advancePayment,
      },
      {
        onSuccess: () => {
          refetch();
          setIsOpen(false);
          toast({
            title: "Muvaffaqiyatli tahrirlandi",
            variant: "success",
          });
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="flex items-center space-x-2 text-white bg-primary"
          onClick={() => setIsOpen(true)}
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
