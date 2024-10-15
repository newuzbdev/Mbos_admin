import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ItemForm } from "@/components/Input-create";
import { FormSchema } from "../../validate";
import { EnumServiceType, IService } from "@/types/service";
import { useAddService, useGetServices } from "@/hooks/useService";

interface ContractsCreateInputProps {
  closeDialog?: () => void;
}

const ProductCreateInput = ({ closeDialog }: ContractsCreateInputProps) => {
  const { mutate: addService } = useAddService();

  const form = useForm<IService>({
    resolver: zodResolver(FormSchema),
  });
  const { refetch } = useGetServices({});

  function onSubmit(data: IService) {
    const contractsData = {
      ...data,
      price: +data.price,
      serviceType: EnumServiceType.service,
    };

    addService(contractsData as IService, {
      onSuccess: () => {
        refetch();
        form.reset();
        toast({
          title: "Service muvaffaqiyatli qo'shildi.",
          variant: "success",
        });
        closeDialog?.();
      },
      onError: (error) => {
        toast({
          title: "Service qo'shishda xatolik.",
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
          <ItemForm title="xizmat nomi" form={form} name="title" />
          <ItemForm title="narxi" type="number" form={form} name="price" />
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

export default ProductCreateInput;
