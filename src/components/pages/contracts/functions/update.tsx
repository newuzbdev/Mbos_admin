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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useGetClients } from "@/hooks/useClients";
import { useContractUpdate, useGetContract } from "@/hooks/useContract";
import { useGetServices } from "@/hooks/useService";
import { Contract } from "@/types/contract";
import { Clients } from "@/types/clients";
// import { PencilIcon, RefreshCw } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IService } from "@/types/service";
// import axiosPrivate from "@/config/api";

export function UpdateItem({ contract }: { contract: Contract }) {
  const { mutate } = useContractUpdate();
  const { data: user } = useGetClients({ limit: 999 });
  const { data: service } = useGetServices({ limit: 999 });
  const { refetch } = useGetContract(contract?.id?.toString());
  const [search, setSearch] = useState("");
  const [searchService, setSearchService] = useState("");

  const [isUpdate, setUpdate] = useState(false);
  const form = useForm({
    defaultValues: {
      ...contract,
      user_id: contract.user?.id,
      service_id: contract.service?.id,
      tolash_sana: contract.tolash_sana,
    },
  });

  const filteredClients = user?.data?.data?.filter(
    (el: Clients) =>
      el?.F_I_O.toLowerCase().trim().includes(search.toLowerCase().trim()) ||
      el?.phone.toString().includes(search) ||
      !search
  );
  const filteredServices = service?.data?.data?.filter((el: IService) =>
    el?.title?.toLowerCase().trim().includes(searchService.toLowerCase().trim())
  );

  const handleSubmit = (item: any) => {
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
      service_id: +item.service_id,
      tolash_sana: contract.tolash_sana,
    };
    mutate(dataToSend, {
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

  // const handleResetPayments = async () => {
  //   try {
  //     await axiosPrivate.post(`/shartnoma/${contract.id}`);
  //     toast({ title: "To'lovlar qayta shakllantirildi", variant: "success" });
  //     refetch();
  //   } catch (error) {
  //     toast({ title: "Xatolik yuz berdi", variant: "destructive" });
  //   }
  // };

  return (
    <>
      {/* <div className="flex gap-2">
        <Button
          aria-label="Edit product"
          onClick={() => setUpdate(true)}
          variant="ghost"
          size="icon"
        >
          <PencilIcon size={20} className="text-primary" />
        </Button>
        <Button
          aria-label="Reset payments"
          onClick={handleResetPayments}
          variant="ghost"
          size="icon"
        >
          <RefreshCw size={20} className="text-primary" />
        </Button>
      </div> */}
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
                <FormField
                  control={form.control}
                  name="service_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-slate-700">
                        Xizmat
                      </FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(+value)}
                        value={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="px-4 py-2 transition duration-200 border-2 rounded-md border-slate-300 focus:border-blue-500 focus:ring focus:ring-blue-200">
                            <SelectValue placeholder="Xizmat tanlang">
                              {field.value
                                ? service?.data?.data?.find(
                                    (service: IService) =>
                                      service?.id === +field.value
                                  )?.title || "Xizmat topilmadi"
                                : "Xizmat tanlang"}
                            </SelectValue>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <div>
                              <Input
                                type="text"
                                value={searchService}
                                onChange={(e) =>
                                  setSearchService(e.target.value)
                                }
                                placeholder="Ism boyicha izlash"
                                className="w-full mb-2"
                                autoFocus
                              />
                            </div>
                            {filteredServices?.length > 0 ? (
                              filteredServices.map((el: IService) => (
                                <SelectItem
                                  key={el.id}
                                  value={el.id.toString()}
                                >
                                  {el.title}
                                </SelectItem>
                              ))
                            ) : (
                              <div className="px-4 py-2 text-gray-500">
                                Xizmat topilmadi
                              </div>
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="user_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-slate-700">
                        Mijoz
                      </FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(+value)}
                        value={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="px-4 py-2 transition duration-200 border-2 rounded-md border-slate-300 focus:border-blue-500 focus:ring focus:ring-blue-200">
                            <SelectValue placeholder="Mijozni tanlang">
                              {field.value
                                ? user?.data?.data?.find(
                                    (client: Clients) =>
                                      client.id === field.value
                                  )?.F_I_O
                                : "Mijozni tanlang"}
                            </SelectValue>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <div>
                              <Input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Ism bo'yicha yoki telefon orqali izlash"
                                className="w-full mb-2"
                                autoFocus
                              />
                            </div>
                            {filteredClients?.map((el: Clients) => (
                              <SelectItem key={el.id} value={el.id.toString()}>
                                {el.F_I_O} - {el.phone}
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
                  title="Shartnoma sanasi"
                  type="date"
                  form={form}
                  name="sana"
                />
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
