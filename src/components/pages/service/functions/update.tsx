import { ItemForm } from "@/components/Input-create";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { useGetService, useServiceUpdate } from "@/hooks/useService";
import { IService } from "@/types/service";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function UpdateItem({ service }: { service: IService }) {
  const { mutate } = useServiceUpdate();

  const { refetch } = useGetService(service?.id?.toString());

  const [isUpdate, setUpdate] = useState(false);
  const form = useForm({
    defaultValues: service,
  });

  const handleSubmit = (item: IService) => {
    const { created_at, updated_at, shartnoma, ...serviceData } = {
      ...item,
      price: +item.price,
    };

    mutate(serviceData, {
      onSuccess: () => {
        toast({ title: "service ozgartirildi", variant: "success" });
        refetch();
        form.reset();
        setUpdate(false);
      },
      onError: () => {
        toast({ title: "hatolik yuz berdi", variant: "destructive" });
      },
    });
  };

  return (
    <>
      <Button
        aria-label="Edit product"
        onClick={() => setUpdate(true)}
        variant="ghost"
        size="icon"
      >
        <PencilIcon size={20} className="text-primary" />
      </Button>

      <Dialog open={isUpdate} onOpenChange={setUpdate}>
        <DialogContent className="max-w-[48rem]">
          <DialogHeader>
            <DialogTitle>Service ro'yhatini tahrirlash</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="h-auto space-y-5"
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <ItemForm title="xizmat nomi" form={form} name="title" />
                <ItemForm
                  title="narxi"
                  type="number"
                  form={form}
                  name="price"
                />
                <ItemForm
                  title="birliklar(ixtiyoriy)"
                  form={form}
                  name="birliklar"
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="text-white">
                  O'zgarishlarni saqlash
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
