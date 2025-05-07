import { useParams } from "react-router-dom";
import { useGetContract } from "@/hooks/useContract";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PencilIcon, Plus, Trash2 } from "lucide-react";
import { formatNumber } from "@/components/formNumber";
import { DeleteItem } from "./functions/delete";
import { UpdateItem } from "./functions/update";
import { useGetGetAdmin } from "@/hooks/useAdmin";
import ContractIncomeCreateInput from "./functions/incomeAdd";
import { ColumnDef } from "@tanstack/react-table";
import DataTableWithOutSearching from "@/components/data-table-without-searching";
import { Button } from "@/components/ui/button";
import { Key, useState } from "react";
import { useMonthlyRemove, useMonthlyUpdate } from "@/hooks/useMonthlyFee";
import { toast } from "@/hooks/use-toast";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { MonthlyFee } from "@/types/contract";
import { useClientsUpdate } from "@/hooks/useClients";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { completeContract } from "@/services/contract";
import ContractContent from "./ContractContent";

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
  const { mutate: updateClient } = useClientsUpdate();
  const contract = contractDetails?.data?.data;
  const { data: craetedAdmin } = useGetGetAdmin(Number(contract?.whoCreated));
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFeeId, setSelectedFeeId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: removeMonth } = useMonthlyRemove();
  const { mutate: updateMonthlyFee } = useMonthlyUpdate();
  const [selectedFee, setSelectedFee] = useState<MonthlyFee | null>(null);
  const [showBalanceHistory, setShowBalanceHistory] = useState(false);

  const monthlyFees: MonthlyFee[] =
    contract?.shartnoma_turi === "subscription_fee"
      ? contract?.monthlyFee
      : null;

  const [showPaidOnly, setShowPaidOnly] = useState<"all" | "paid" | "no_paid">(
    "all"
  );

  const filteredMonthlyFees =
    showPaidOnly === "all"
      ? monthlyFees
      : monthlyFees?.filter((fee) =>
          showPaidOnly === "paid"
            ? fee.purchase_status === "paid"
            : fee.purchase_status === "no_paid"
        );

  const toggleFilter = () => {
    if (showPaidOnly === "all") setShowPaidOnly("paid");
    else if (showPaidOnly === "paid") setShowPaidOnly("no_paid");
    else setShowPaidOnly("all");
  };
  const totalAmount =
    contract?.shartnoma_turi === "subscription_fee"
      ? monthlyFees?.reduce((sum, fee) => sum + Number(fee.amount), 0) || 0
      : Number(contract?.service?.price * contract?.count) || 0;

  const totalPaid =
    contract?.shartnoma_turi === "subscription_fee"
      ? monthlyFees?.reduce((sum, fee) => sum + Number(fee.paid), 0) || 0
      : Number(contract?.advancePayment) || 0;

  const form = useForm({
    defaultValues: {
      purchase_status: undefined,
      paid: "",
      update_date: "",
      amount: "",
      commit: "",
    },
  });
  const { mutate: completeContractMutation } = useMutation({
    mutationFn: completeContract,
    onSuccess: () => {
      toast({
        title: "Shartnoma muvaffaqiyatli yakunlandi",
        variant: "success",
      });
      refetchMonthlyFee();
    },
    onError: () => {
      toast({
        title: "Xatolik yuz berdi",
        variant: "destructive",
      });
    },
  });

  const handleCompleteContract = () => {
    if (contractId) {
      completeContractMutation(contractId);
    }
  };
  if (isLoading || !contract) {
    return <div>Yuklanmoqda...</div>;
  }
  const handleSubmit = (data: {
    paid: string;
    update_date: string;
    amount: string;
    commit: string | null;
    purchase_status?: string;
  }) => {
    const paymentAmount = Number(data.paid);
    const updatedAmount = Number(data.amount);
    const userBalance = Number(contract?.user.balance);

    if (!isEditing && paymentAmount > userBalance) {
      toast({
        title: "Balance da Yetarli mablag' mavjud emas",
        description: "To'lovni amalga oshirish uchun mablag' yetarli emas",
        variant: "destructive",
      });
      return null;
    }
    if (paymentAmount > userBalance) {
      toast({
        title: "Balance da Yetarli mablag' mavjud emas",
        description: "To'lovni amalga oshirish uchun mablag' yetarli emas",
        variant: "destructive",
      });
      return;
    }

    if (selectedFeeId) {
      const monthlyPaid = monthlyFees.filter((el) => el.id === selectedFeeId);

      const dataToSend = {
        id: selectedFeeId,
        paid: isEditing
          ? undefined
          : paymentAmount + Number(monthlyPaid[0].paid),
        update_date: isEditing ? undefined : data.update_date,
        amount: isEditing ? updatedAmount : undefined,
        commit: isEditing ? data.commit : undefined,
        purchase_status: data.purchase_status,
      };

      const {
        balance,
        created_at,
        updated_at,
        isDeleted,
        whoCreated,
        whoUpdated,
        ...user
      } = contractDetails?.data?.data?.user;

      if (!isEditing) {
        updateClient({
          ...user,
          balance: (
            +contractDetails?.data?.data.user.balance - paymentAmount
          ).toString(),
        });
      }
      if (contract.shartnoma_turi === "one_bay") {
        const remainingAmount = totalAmount - totalPaid;
        if (paymentAmount > remainingAmount) {
          toast({
            title: "To'lov miqdori qolgan summadan oshib ketdi",
            variant: "destructive",
          });
          return;
        }
      }

      updateMonthlyFee(dataToSend, {
        onSuccess: () => {
          toast({
            title: isEditing
              ? "Muvaffaqiyatli tahrirlandi"
              : "Oylik daromad qo'shildi",
            variant: "success",
          });
          refetchMonthlyFee();
          form.reset();
          setIsOpen(false);
          setSelectedFeeId(null);
          setIsEditing(false);
          closeDialog?.();
        },
        onError: () => {
          toast({
            title: "Xatolik yuz berdi",
            variant: "destructive",
          });
        },
      });
    }
  };

  function deleteMonth(id: number) {
    removeMonth(id, {
      onSuccess: () => {
        toast({
          title: "muvaffaqiyatli olib tashlandi",
          variant: "destructive",
        });
        refetchMonthlyFee();
      },
    });
  }

  if (isLoading) return <div>Yuklanmoqda...</div>;

  const makeMonthlyFeeColumns = (): ColumnDef<MonthlyFee>[] => [
    {
      header: "№",
      cell: (c) => <div className="cursor-pointer">{c.row.index + 1}</div>,
    },
    {
      header: "Umumiy qolgan to'lov",
      cell: ({ row }) => (
        <div
          className="cursor-pointer"
          onClick={() => {
            setSelectedFee(row.original);
            setShowBalanceHistory(true);
          }}
        >
          {row.original
            ? formatNumber(Number(row.original.amount)) + " s'om"
            : "N/A"}
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
      header: "To'lash sanasi",
      cell: ({ row }) => (
        <div>
          {new Date(row.original.date)
            .toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
            .split("/")
            .join(" ")}
        </div>
      ),
    },
    {
      header: "To'lovgacha qolgan kun",
      cell: ({ row }) => {
        if (Number(row.original?.amount) === Number(row.original?.paid)) {
          return 0;
        }
        const today = new Date();
        const paymentDate = new Date(row.original.date);
        const diffTime = paymentDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        let bgColorClass = "bg-gray-500";
        if (diffDays <= 3) {
          bgColorClass = "bg-red-500";
        } else if (diffDays <= 7) {
          bgColorClass = "bg-yellow-500";
        }

        return (
          <div
            className={`p-1 flex justify-center rounded text-white ${bgColorClass}`}
          >
            {diffDays} kun
          </div>
        );
      },
    },
    {
      header: "Tolash holati",
      cell: ({ row }) => (
        <div>
          {row.original?.purchase_status === "paid" ? (
            <span className="p-1 text-white rounded-md bg-primary">
              To'langan
            </span>
          ) : row.original?.purchase_status === "no_paid" ? (
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
      cell: ({ row }) => (
        <>
          <Button
            onClick={() => {
              setSelectedFeeId(row.original.id);
              setIsOpen(true);
              setIsEditing(false);

              form.setValue(
                "paid",
                (
                  Number(row.original.amount) - Number(row.original.paid)
                ).toString()
              );
              form.setValue("update_date", "");
            }}
            variant="ghost"
            size="icon"
            disabled={contract.enabled === 1}
          >
            <Plus size={20} className="text-primary" />
          </Button>
          {isOpen && selectedFeeId === row.original.id && !isEditing && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
              <div className="dark:bg-gray-800 bg-white rounded-lg p-6 w-[28rem]">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">
                    To'lov qo'shish
                  </h2>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setSelectedFeeId(null);
                    }}
                    className="hover:cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="h-auto space-y-5"
                  >
                    <div>
                      <Label className="text-lg">To'lash</Label>
                      <Input
                        type="number"
                        id="paid"
                        defaultValue={
                          Number(row.original.amount) -
                          Number(row.original.paid)
                        }
                        {...form.register("paid")}
                        className="dark:border-white"
                      />
                    </div>
                    <div>
                      <Label className="mt-3 text-lg">To'lash Sanasi</Label>
                      <Input
                        type="date"
                        id="update_date"
                        {...form.register("update_date")}
                        className="dark:border-white"
                      />
                    </div>
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

    {
      header: "Umumiy To'lov Tahrirlash",
      cell: ({ row }) => (
        <>
          <Button
            onClick={() => {
              setSelectedFeeId(row.original.id);
              setIsOpen(true);
              setIsEditing(true);
              form.setValue("amount", row.original.amount);
            }}
            variant="ghost"
            size="icon"
            disabled={contract.enabled === 1}
          >
            <PencilIcon size={20} className="text-primary" />
          </Button>
          {isOpen && selectedFeeId === row.original.id && isEditing && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
              <div className="dark:bg-gray-800 bg-white rounded-lg p-6 w-[28rem]">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">
                    Tahrirlash
                  </h2>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setSelectedFeeId(null);
                      setIsEditing(false);
                    }}
                    className="hover:cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <Form {...form}>
                  <form
                    key={selectedFeeId}
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="h-auto space-y-5"
                  >
                    <div>
                      <Label>
                        Tahrirlash
                        <Input
                          {...form.register("amount")}
                          className="text-white border-white"
                          type="number"
                        />
                      </Label>
                    </div>
                    <div>
                      <Label>
                        O'zgartish sababi
                        <Input
                          {...form.register("commit")}
                          className="text-white border-white placeholder:text-white"
                          type="text"
                        />
                      </Label>
                    </div>

                    <div>
                      <Label>
                        Holati
                        <select
                          {...form.register("purchase_status")}
                          className="text-white border-white placeholder:text-white bg-transparent border-[1px] rounded-md block w-full h-9"
                        >
                          <option value="paid" className="bg-[rgb(31,41,55)]">
                            To'langan
                          </option>
                          <option
                            value="no_paid"
                            className="bg-[rgb(31,41,55)]"
                          >
                            To'lanmagan
                          </option>
                        </select>
                      </Label>
                    </div>

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
          <Button className="bg-red-500 text-white hover:bg-red-300">
            <Trash2 onClick={() => deleteMonth(row.original?.id)} />
          </Button>
        </>
      ),
    },

    {
      header: "O'zgartirish sababi",
      cell: ({ row }) => <div>{row.original.commit || ""}</div>,
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
                {}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      className="text-white"
                      disabled={contract?.enabled === 1}
                    >
                      {contract?.enabled === 1
                        ? "Yakunlangan"
                        : "Shartnomani yakunlash"}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Ishonchingiz komilmi ?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Siz rostdan ham ushbu shartnomani tugatmoqchisimiz?
                        Agarda shartnomani tugatsangiz bu shartnoma bo’yicha
                        boshqa hech qanday amal bajara olmaysiz.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Bekor qilinsin</AlertDialogCancel>
                      <AlertDialogAction
                        className="text-white"
                        onClick={handleCompleteContract}
                        disabled={contract.enabled === 1}
                      >
                        {contract.enabled === 1
                          ? "Yakunlangan"
                          : "Shartnomani yakunlash"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </CardHeader>
        <ContractContent />
      </Card>
      <div className="my-8">
        <Button onClick={toggleFilter} className="mb-4 text-white">
          {showPaidOnly === "all"
            ? "Hammasi"
            : showPaidOnly === "paid"
            ? "To'langanlar"
            : "To'lanmaganlar"}
        </Button>
        {contract.shartnoma_turi === "subscription_fee" && (
          <DataTableWithOutSearching
            columns={makeMonthlyFeeColumns()}
            data={filteredMonthlyFees || []}
          />
        )}
      </div>
      <>
        <Dialog open={showBalanceHistory} onOpenChange={setShowBalanceHistory}>
          <DialogContent className="max-w-[1200px]">
            <DialogHeader>
              <DialogTitle>Balance Tarixi</DialogTitle>
            </DialogHeader>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase ">
                  <tr>
                    <th className="px-6 py-3">Summasi</th>
                    <th className="px-6 py-3">To'langan Sanasi</th>
                    <th className="px-6 py-3">Kim qo'shdi</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedFee?.balance_history?.map(
                    (
                      history: {
                        amount: number;
                        date: string;
                        whoCreated: string;
                      },
                      index: Key | null | undefined
                    ) => (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <td className="px-6 py-4">
                          {formatNumber(history.amount)} so'm
                        </td>
                        <td className="px-6 py-4">
                          {new Date(history.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          {craetedAdmin?.data.data.user_name}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </DialogContent>
        </Dialog>
      </>
    </div>
  );
}
