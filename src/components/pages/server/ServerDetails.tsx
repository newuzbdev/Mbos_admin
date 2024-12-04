import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useAddServerPaid,
  useGetServer,
  useGetServerPaid,
} from "@/hooks/useServer";
import { formatNumber } from "@/components/formNumber";
import DetailItem from "./DetailItem";
import { Server } from "@/types/server";
import ServerUpdate from "./functions/update";
import { ServerDelete } from "./functions/delete";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import DataTable from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";

const paymentSchema = z.object({
  server_id: z.number(),
  price: z.number().min(1, "Narxni kiriting"),
  date_term: z.string().nonempty("Muddatni kiriting"),
  ads: z.string().optional(),
});

type PaymentFormInputs = z.infer<typeof paymentSchema>;

const calculateRemainingDays = (
  dateTerm: string
): { days: number; bgColor: string } => {
  const currentDate = new Date();
  const termDate = new Date(dateTerm);
  const diffTime = termDate.getTime() - currentDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let bgColor = "bg-green-500 text-white text-center";
  if (diffDays <= 7 && diffDays > 3)
    bgColor = "bg-yellow-500 text-white text-center";
  if (diffDays <= 3) bgColor = "bg-red-500 text-white text-center";

  return { days: diffDays, bgColor };
};

const makeColumns = (): ColumnDef<Server>[] => [
  {
    header: "№",
    cell: (c) => <div className="cursor-pointer">{c.row.index + 1}</div>,
  },

  {
    accessorKey: "ads",
    header: "Comment",
    cell: ({ row }) => <div className="cursor-pointer">{row.original.ads?.toString() ?? ''}</div>,
  },
  {
    accessorKey: "price",
    header: "Narxi",
    cell: ({ row }) => (
      <div className="cursor-pointer">{formatNumber(row.original.price)}</div>
    ),
  },

  {
    accessorKey: "date_term",
    header: "Server tugash sanasi",
    cell: ({ row }) => (
      <div className="cursor-pointer">{row.original.date_term}</div>
    ),
  },
];

export default function ServerDetails() {
  const { serverId } = useParams();
  const { data: serverDetails, isLoading, refetch } = useGetServer(serverId);
  const servers: Server[] = serverDetails?.data.data
    ? [serverDetails.data.data]
    : [];

  const { mutate: updateServerPaid } = useAddServerPaid();
  const { data: serverdata } = useGetServerPaid();

  console.log(serverdata, "dsds");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PaymentFormInputs>({
    resolver: zodResolver(paymentSchema),
  });

  const onSubmit = (data: PaymentFormInputs) => {
    const payload = {
      ...data,
      ads: data.ads || "",
      status: 1,
    };

    updateServerPaid(payload, {
      onSuccess: () => {
        toast({
          title: "To'lov muvaffaqiyatli amalga oshirildi",
          variant: "success",
        });
        reset();
        refetch();
        closeDialog();
      },
      onError: (error) => {
        console.error("Error during mutation:", error);
        toast({
          title: "To'lovni amalga oshirishda xatolik yuz berdi",
          variant: "destructive",
        });
      },
    });
  };

  const [isDialogOpen, setDialogOpen] = useState(false);
  const closeDialog = () => setDialogOpen(false);

  if (isLoading) return <div>Yuklanmoqda...</div>;
  if (!serverDetails?.data) return <div>Server ma'lumotlari topilmadi</div>;

  return (
    <div className="container p-0 mx-auto">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary to-blue-800">
          <div className="flex justify-between">
            <CardTitle className="text-2xl font-bold text-white">
              Server ma'lumotlari
            </CardTitle>
            <div className="flex justify-between space-x-4">
              <ServerUpdate />
              <ServerDelete />
              <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={() => setDialogOpen(true)}
                  >
                    To'lovni amalga oshirish
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>To'lovni amalga oshirish</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input
                      type="hidden"
                      value={serverId}
                      {...register("server_id", { valueAsNumber: true })}
                    />
                    <div>
                      <label className="block mb-2">Narx</label>
                      <Input
                        type="number"
                        className="w-full px-3 py-2 border rounded"
                        {...register("price", { valueAsNumber: true })}
                      />
                      {errors.price && (
                        <span className="text-red-500">
                          {errors.price.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <label className="block mb-2">Sana</label>
                      <Input
                        type="date"
                        className="w-full px-3 py-2 border rounded"
                        {...register("date_term")}
                      />
                      {errors.date_term && (
                        <span className="text-red-500">
                          {errors.date_term.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <label className="block mb-2">Ads (Optional)</label>
                      <Input
                        type="text"
                        className="w-full px-3 py-2 border rounded"
                        {...register("ads")}
                      />
                      {errors.ads && (
                        <span className="text-red-500">
                          {errors.ads.message}
                        </span>
                      )}
                    </div>
                    <Button type="submit" variant="default" className="w-full">
                      To'lovni amalga oshir
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {servers.map((server: Server) => {
              return (
                <div key={server.id}>
                  <DetailItem label="Server nomi" value={server.name} />
                  <DetailItem label="Server tarifi" value={server.plan} />
                  <DetailItem
                    label="Narxi"
                    value={`${formatNumber(server.price)} so'm`}
                  />
                  <DetailItem label="Mas'ul" value={server.responsible} />
                  <DetailItem label="Sana" value={server.date_term} />
                  <div className={`p-4 rounded`}>
                    <DetailItem
                      label="Server tugashiga qolgan kunlar"
                      value={
                        calculateRemainingDays(server.date_term).days > 0
                          ? `${
                              calculateRemainingDays(server.date_term).days
                            } kun qoldi`
                          : "Server o'chdi"
                      }
                      className="text-white"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="p-4 border rounded-md">
            <DataTable
              search
              defaultPagination
              title={"Server to'lov tarixini ko'ring"}
              columns={makeColumns()}
              data={serverDetails?.data?.data?.serverPaid || []}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}