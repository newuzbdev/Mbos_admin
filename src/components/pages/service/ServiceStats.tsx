import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DataTable from "@/components/data-table-without-searching";
import { useGetServiceDash } from "@/hooks/useService";
import { CreditCard, Hourglass, ReceiptText } from "lucide-react";
import { useParams } from "react-router-dom";
import { useState } from "react";

const ServiceStats = () => {
  const { id } = useParams();
  const { data: serviceStats } = useGetServiceDash(id || "");
  const serviceNumber = serviceStats?.data?.data;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogData, setDialogData] = useState<any[]>([]);

  const openDialog = (title: string, data: any[]) => {
    setDialogTitle(title);
    setDialogData(data);
    setDialogOpen(true);
  };

  const formatNumber = (num: number) => {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const makeColumns = () => [
    {
      header: "№",
      cell: (c: { row: { index: number } }) => <div>{c.row.index + 1}</div>,
    },
    { accessorKey: "advancePayment", header: "Advance Payment" },
    { accessorKey: "count", header: "Count" },
    { accessorKey: "paymentMethod", header: "Payment Method" },
    { accessorKey: "purchase_status", header: "Purchase Status" },
    { accessorKey: "remainingPayment", header: "Remaining Payment" },
    { accessorKey: "sana", header: "Sana" },
    { accessorKey: "shartnoma_muddati", header: "Shartnoma Muddati" },
    // { accessorKey: "shartnoma_nomer", header: "Shartnoma Nomer" },
    { accessorKey: "shartnoma_turi", header: "Shartnoma Turi" },
  ];

  return (
    <div className="p-0">
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsContent value="overview">
          <div className="grid gap-4 px-6 pt-2 md:grid-cols-2 lg:grid-cols-3">
            <Card
              className="cursor-pointer dark:text-white"
              onClick={() =>
                openDialog("Tugallangan", serviceNumber?.tugallangan || [])
              }
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="flex p-2 text-lg font-medium text-white rounded-md bg-primary">
                  Tugallangan{" "}
                  <ReceiptText className="pl-2 text-white" size={30} />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  Shartnoma muqdori {serviceNumber?.tugallangan?.length} ta
                </div>
                <div className="mt-2 text-xl">
                  Ishlatilgan productlar soni {serviceNumber?.tugallanganCount}{" "}
                  ta
                </div>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer dark:text-white"
              onClick={() => openDialog("", serviceNumber?.jarayondagi || [])}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="flex p-2 text-lg font-medium text-white bg-yellow-600 rounded-md">
                  Jarayondagi <Hourglass className="pl-2" size={30} />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  Shartnomalar soni {serviceNumber?.jarayondagi?.length} ta
                </div>
                <div className="mt-2 text-base">
                  Ishlatilyotgan productlar soni{" "}
                  <span className="text-xl">
                    {serviceNumber?.jarayondagiCount} ta
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer dark:text-white"
              onClick={() =>
                openDialog("Umumiy", [
                  { umumiyTushum: serviceNumber?.umumiyTushum },
                ])
              }
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="flex items-center px-2 text-lg font-medium text-white bg-blue-500 rounded-md">
                  Umumiy{" "}
                  <CreditCard className="w-12 h-12 p-2 text-white rounded-lg bg-red-400/10" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  Umumiy tushum {formatNumber(serviceNumber?.umumiyTushum)} so'm
                </div>
                <div className="mt-2 text-base">
                  Ishlatilgan productlar soni{" "}
                  <span className="text-xl">
                    {serviceNumber?.umumiyTushumCount} ta
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="w-[1000px] max-w-[100vw]">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
          </DialogHeader>
          <DataTable columns={makeColumns()} data={dialogData} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServiceStats;
