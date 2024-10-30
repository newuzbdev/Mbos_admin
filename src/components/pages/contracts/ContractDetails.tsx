import { useParams } from "react-router-dom";
import { useGetContract } from "@/hooks/useContract";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CalendarIcon,
  CreditCardIcon,
  FileTextIcon,
  Plus,
  UserIcon,
} from "lucide-react";
import { formatNumber } from "@/components/formNumber";
import { DeleteItem } from "./functions/delete";
import { UpdateItem } from "./functions/update";
import { useGetGetAdmin } from "@/hooks/useAdmin";
import ContractIncomeCreateInput from "./functions/incomeAdd";
import { ColumnDef } from "@tanstack/react-table";
import DataTableWithOutSearching from "@/components/data-table-without-searching";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMonthlyUpdate } from "@/hooks/useMonthlyFee";
import { toast } from "@/hooks/use-toast";
import { ItemForm } from "@/components/Input-create";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface ContractDetailsInputProps {
  closeDialog?: () => void;
}

export default function ContractDetails({
  closeDialog,
}: ContractDetailsInputProps) {
  const { contractId } = useParams();
  const {
    data: contractDetails,
    isLoading,
    refetch: refetchMonthlyFee,
  } = useGetContract(contractId);
  const contract = contractDetails?.data?.data;
  const { data: craetedAdmin } = useGetGetAdmin(Number(contract?.whoCreated));
  const [isOpen, setIsOpen] = useState(false);

  const { data: updatedAdmin } = useGetGetAdmin(Number(contract?.whoUpdated));
  const { mutate: updateMonthlyFee } = useMonthlyUpdate();

  const monthlyFees =
    contract?.shartnoma_turi === "subscription_fee"
      ? contract?.monthlyFee
      : null;

  const form = useForm({
    defaultValues: {
      paid: "",
    },
  });

  const handleSubmit = (data: { paid: string }) => {
    if (monthlyFees) {
      const dataToSend = {
        id: monthlyFees[0].id,
        paid: Number(data.paid),
      };

      updateMonthlyFee(dataToSend, {
        onSuccess: () => {
          toast({
            title: "Oylik daromad qo'shild",
            variant: "success",
          });
          refetchMonthlyFee();
          form.reset();
          setIsOpen(false);
          closeDialog?.();
        },
        onError: () => {
          toast({ title: "Xatolik yuz berdi", variant: "destructive" });
        },
      });
    }
  };

  if (isLoading) return <div>Yuklanmoqda...</div>;

  const shartnoma_turi = [
    { name: "one_bay", value: "Birmartalik to'lov" },
    { name: "subscription_fee", value: "Oylik to'lov" },
  ];

  const purchase_status = [
    { name: "paid", value: "To'landi" },
    { name: "no_paid", value: "To'lanmagan" },
  ];

  const makeMonthlyFeeColumns = (): ColumnDef<any>[] => [
    {
      header: "№",
      cell: (c) => <div className="cursor-pointer">{c.row.index + 1}</div>,
    },
    {
      header: "Umumiy qolgan to'lov",
      cell: ({ row }) => (
        <div>
          {row.original ? formatNumber(row.original.amount) + " s'om" : "N/A"}
        </div>
      ),
    },
    {
      header: "To'langan",
      cell: ({ row }) => (
        <div>
          {row.original ? formatNumber(row.original.paid) + " s'om" : "N/A"}
        </div>
      ),
    },
    {
      header: "Tolash sanasi",
      cell: ({ row }) => (
        <div>{new Date(row.original.date).toLocaleDateString()}</div>
      ),
    },
    {
      header: "Tolash holati",
      cell: ({ row }) => (
        <div>
          {row.original?.amount === row.original?.paid ? (
            <span className="p-1 text-white rounded-md bg-primary">
              To'langan
            </span>
          ) : row.original?.amount > row.original?.paid ? (
            <span className="p-1 text-white bg-red-500 rounded-md">
              To'lanmagan
            </span>
          ) : (
            "N/A"
          )}
        </div>
      ),
    },
    {
      header: "To'lov qoshish",
      cell: () => (
        <>
          <Button onClick={() => setIsOpen(true)} variant="ghost" size="icon">
            <Plus size={20} className="text-primary" />
          </Button>
          {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="dark:bg-gray-800 bg-white rounded-lg p-6 w-[28rem]">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">
                    Pul tolash
                  </h2>
                  <button onClick={() => setIsOpen(false)} className="hover:cursor-pointer">✕</button>
                </div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="h-auto space-y-5"
                  >
                    <ItemForm
                      title="To'lash"
                      form={form}
                      name="paid"
                      type="number"
                    />
                    <div className="flex justify-end">
                      <Button type="submit" className="text-white">
                        O'zgarishlarni saqlash
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          )}
        </>
      ),
    },
  ];
  return (
    <div className="container p-0 mx-auto">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary to-blue-800">
          <div className="flex justify-between">
            <CardTitle className="text-2xl font-bold text-white">
              Shartnoma malumotlari
            </CardTitle>

            <div className="flex justify-between">
              <div className="flex justify-end space-x-3">
                {contract.shartnoma_turi === "one_bay" && (
                  <ContractIncomeCreateInput />
                )}
                <UpdateItem contract={contract} />
                <DeleteItem />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <DetailSection
              icon={<UserIcon className="w-5 h-5 text-primary" />}
              title="Mijoz haqida ma'lumot"
            >
              <DetailItem
                label="Mijozning to'liq ismi"
                value={contract.user?.F_I_O}
              />
              <DetailItem
                label="Shartnoma turi"
                value={
                  shartnoma_turi.find(
                    (el) => el.name === contract.shartnoma_turi
                  )?.value || "N/A"
                }
              />
              <DetailItem
                label="Shartnoma nomeri"
                value={contract.shartnoma_nomer}
              />
              <DetailItem
                label="Mijozning telefon raqami"
                value={contract.user?.phone}
              />
              <DetailItem
                label="Kim yaratdi"
                value={craetedAdmin?.data?.data?.user_name || "N/A"}
              />
              <DetailItem
                label="Kim o'zgartirdi"
                value={updatedAdmin?.data?.data?.user_name || "N/A"}
              />
            </DetailSection>

            <DetailSection
              icon={<CreditCardIcon className="w-5 h-5 text-green-600" />}
              title="Moliyaviy tafsilotlar"
            >
              <DetailItem
                label="Narx"
                value={
                  contract.service && contract.service.price
                    ? formatNumber(contract.service.price * contract.count) +
                      " s'om"
                    : "N/A"
                }
              />
              <DetailItem
                label="to'langan"
                value={formatNumber(contract.advancePayment) + " s'om"}
              />
              <DetailItem
                label="Qolgan to'lov"
                value={formatNumber(contract.remainingPayment) + " s'om"}
              />
              <DetailItem
                label="Xarid holati"
                value={
                  purchase_status.find(
                    (el) => el.name === contract.purchase_status
                  )?.value || "N/A"
                }
              />
            </DetailSection>

            <DetailSection
              icon={<FileTextIcon className="w-5 h-5 text-purple-600" />}
              title="Shartnomaning xususiyatlari"
            >
              <DetailItem label="Miqdori" value={contract.count} />
              <DetailItem
                label="Shartnoma davomiyligi"
                value={new Date(
                  contract.shartnoma_muddati
                ).toLocaleDateString()}
              />
              <DetailItem
                label="Texnik davomiyligi"
                value={new Date(contract.texnik_muddati).toLocaleDateString()}
              />
            </DetailSection>

            <DetailSection
              icon={<CalendarIcon className="w-5 h-5 text-orange-600" />}
              title="Muhim sanalar"
            >
              <DetailItem
                label="Shartnoma kuni"
                value={new Date(contract.sana).toLocaleDateString()}
              />
              <DetailItem
                label="To'lav sanasi"
                value={new Date(contract.tolash_sana).toLocaleDateString()}
              />
            </DetailSection>
          </div>
        </CardContent>
      </Card>
      <div className="my-8">
        {contract.shartnoma_turi === "subscription_fee" && (
          <DataTableWithOutSearching
            columns={makeMonthlyFeeColumns()}
            data={monthlyFees || []}
          />
        )}
      </div>
    </div>
  );
}
function DetailSection({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-lg font-semibold">
        {icon}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
          {title}
        </span>
      </h3>
      <div className="p-4 space-y-2 rounded-lg shadow-inner bg-gray-50 dark:bg-gray-800">
        {children}
      </div>
    </div>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
}) {
  return (
    <div className="flex items-center justify-between py-1 border-b border-gray-200 last:border-b-0">
      <span className="font-medium dark:text-gray-300">{label}:</span>
      <span className="font-semibold dark:text-gray-300">{value || "N/A"}</span>
    </div>
  );
}
