import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { ItemForm } from "@/components/Input-create";
import { FormSchema } from "./validate";
import { useAddContract, useGetContract } from "@/hooks/useContract";
import { Contract } from "@/types/contract";

interface ContractsCreateInputProps {
  closeDialog?: () => void;
}

const ContractCreateInput = ({ closeDialog }: ContractsCreateInputProps) => {
  const { mutate: addContract } = useAddContract();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { refetch: refetchContract } = useGetContract();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const contractsData = FormSchema.parse(data);

    addContract(contractsData as Contract, {
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
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-auto my-10 mt-4 space-y-5"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ItemForm title="tolik ism" form={form} name="F_I_O" />
          <ItemForm
            title="telefon rakam"
            form={form}
            name="phone"
            type="number"
          />
        </div>
        <ItemForm title="address" form={form} name="adress" />

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
