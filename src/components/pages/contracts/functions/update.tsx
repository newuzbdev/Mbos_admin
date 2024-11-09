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
import { useGetClients } from "@/hooks/useClients";
import { useContractUpdate, useGetContract } from "@/hooks/useContract";
import { useGetServices } from "@/hooks/useService";
import { Contract } from "@/types/contract";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SearchService } from "./searchService";
import { SearchClient } from "./searchClient";

export function UpdateItem({ contract }: { contract: Contract }) {
  const { mutate } = useContractUpdate();
  const { data: user } = useGetClients({ limit: 999 });
  const { data: service } = useGetServices({ limit: 999 });
  const { refetch } = useGetContract(contract?.id?.toString());

  const [isUpdate, setUpdate] = useState(false);
  const form = useForm({
    defaultValues: contract,
  });

  const handleSubmit = (item: Contract) => {
    const {
      created_at,
      income,
      remainingPayment,
      user,
      updated_at,
      price,
      shartnoma_id,
      service,
      monthlyFee,
      ...contractData
    } = item;

    const dataToSend = {
      ...contractData,
      advancePayment: +item.advancePayment,
      count: +item.count,
    };
    

    mutate(dataToSend as any, {
      onSuccess: () => {
        toast({ title: "contract ozgartirildi", variant: "success" });
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
            <DialogTitle>Contract ro'yhatini tahrirlash</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="h-auto space-y-5"
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <ItemForm
                  title="Miqdori"
                  form={form}
                  name="count"
                  type="number"
                />
                <ItemForm
                  title="Qolgan to'lov"
                  form={form}
                  name="remainingPayment"
                  type="number"
                />
                
                <SearchService form={form} service={service} title="Xizmat" />
                <SearchClient form={form} client={user} title="Mijoz" />

                <ItemForm
                  enums={[
                    { name: "paid", value: "To'langan" },
                    { name: "no_paid", value: "To'lanmagan" },
                  ]}
                  title="Xarid holati"
                  type="enum"
                  form={form}
                  name="purchase_status"
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
                <ItemForm title="Shartnoma sanasi" type="date" form={form} name="sana" />
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
                <ItemForm
                  title="To'lash sanasi"
                  type="date"
                  form={form}
                  name="tolash_sana"
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
