import { ItemForm } from "@/components/Input-create";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormSchema } from "@/components/validate";
import { toast } from "@/hooks/use-toast";
import { useGetClients } from "@/hooks/useClients";
import { useContractUpdate } from "@/hooks/useContract";
import { Clients } from "@/types/clients";
import { Contract } from "@/types/contract";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function UpdateItem({
  id,
  contract,
}: {
  contract: Contract;
  id: number;
}) {
  const { mutate } = useContractUpdate();
  const { data: user } = useGetClients({});

  const [isUpdate, setUpdate] = useState(false);
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: contract,
  });

  const handleSubmit = (item: Contract) => {
    const contractData = { ...item, id };
    mutate(contractData, {
      onSuccess: () => {
        toast({ title: "contract ozgartirildi", variant: "success" });
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
              onSubmit={form.handleSubmit(() => handleSubmit)}
              className="h-auto space-y-5"
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <ItemForm
                  title="Miktori"
                  form={form}
                  name="count"
                  type="number"
                />
                <ItemForm title="Narx" form={form} name="price" type="number" />
                <ItemForm
                  title="Oldindan To'lov"
                  form={form}
                  name="advancePayment"
                  type="number"
                />
                <ItemForm title="Xizmat" form={form} name="service" />

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
                                    (client: Clients) =>
                                      +client.id === field.value
                                  )?.F_I_O
                                : "Mijozni tanlang"}
                            </SelectValue>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            {user?.data?.data.length &&
                              user?.data?.data?.map((el: Clients) => (
                                <SelectItem
                                  key={el.id}
                                  value={el.id.toString()}
                                >
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
