import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCardIcon, UserIcon } from "lucide-react";
import { useGetClient } from "@/hooks/useClients";
import { DeleteItem } from "@/components/pages/clients/functions/clients-delete";
import { UpdateItem } from "@/components/pages/clients/functions/clients-edit";
import { Income } from "@/types/income";
import { Clients } from "@/types/clients";
import { Contract } from "@/types/contract";

export default function ContractDetails() {
  const { clientsId } = useParams();

  const { data: clientsDetails, isLoading } = useGetClient(clientsId);

  if (isLoading) return <div>Yuklanmoqda...</div>;

  const clients: Clients | undefined = clientsDetails?.data.data;

  return (
    <div className="container px-4 py-8 mx-auto">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary to-blue-800">
          <CardTitle className="text-2xl font-bold text-white">
            Shartnoma malumotlari
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <DetailSection
              icon={<UserIcon className="w-5 h-5 text-primary" />}
              title="Mijoz haqida ma'lumot"
            >
              <DetailItem
                label="Mijozning to'liq ismi"
                value={clients?.F_I_O}
              />
              <DetailItem label="Telefon raqami" value={clients?.phone} />
              <DetailItem label="Manzil" value={clients?.adress} />
            </DetailSection>

            <DetailSection
              icon={<CreditCardIcon className="w-5 h-5 text-green-600" />}
              title="Mijozning shartnomalar tarihi"
            >
              {clients?.shartnome?.map((shartnoma: Contract, index: number) => (
                <div
                  key={shartnoma.id}
                  className="p-4 mb-4 bg-white rounded-lg shadow-md dark:text-white dark:bg-gray-800"
                >
                  <h4 className="mb-2 font-semibold">{`${
                    index + 1
                  }-Shartnoma`}</h4>
                  <DetailItem
                    label="Shartnoma ID"
                    value={shartnoma.shartnoma_id}
                  />
                  <DetailItem label="Shartnoma sanasi" value={shartnoma.sana} />
                  <DetailItem
                    label="Shartnoma miqdori"
                    value={shartnoma.count}
                  />
                  <DetailItem
                    label="Shartnoma davomiyligi"
                    value={shartnoma.shartnoma_muddati}
                  />
                  <DetailItem
                    label="Shartnoma texnik davomiyligi"
                    value={shartnoma.texnik_muddati}
                  />

                  <h5 className="mt-4 mb-2 font-semibold">To'lov tarixi</h5>
                  {clients?.income
                    ?.filter(
                      (income: Income) =>
                        income.amount === Number(shartnoma.advancePayment)
                    )
                    .map((income: Income) => (
                      <div
                        key={income.id}
                        className="p-2 mb-2 ml-4 bg-gray-100 rounded dark:bg-gray-700"
                      >
                        <DetailItem
                          label={`To'lov summasi`}
                          value={income.amount}
                        />
                        <DetailItem
                          label={`To'lov sanasi`}
                          value={income.date}
                        />
                        <DetailItem
                          label={`To'lov holati`}
                          value={income.is_paid ? "To'langan" : "To'lanmagan"}
                        />
                        <DetailItem
                          label={`To'lov usuli`}
                          value={income.payment_method}
                        />
                      </div>
                    ))}
                  {clients?.income?.filter(
                    (income) =>
                      income.amount === Number(shartnoma.advancePayment)
                  ).length === 0 && (
                    <p>To'lovlar mavjud emas</p>
                  )}
                </div>
              ))}
            </DetailSection>
          </div>
          <div>
            <div className="flex justify-end py-4 space-x-2">
              <UpdateItem clients={clients} />
              <DeleteItem />
            </div>
          </div>
        </CardContent>
      </Card>
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
  className,
}: {
  label: string;
  value: string | number | undefined;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-between py-1 border-b border-gray-200 last:border-b-0 ${className}`}
    >
      <span className="font-medium dark:text-gray-300">{label}:</span>
      <span className="font-semibold dark:text-gray-300">{value || "N/A"}</span>
    </div>
  );
}
