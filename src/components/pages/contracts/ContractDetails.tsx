import { useParams } from "react-router-dom";
import { useGetContract } from "@/hooks/useContract";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CalendarIcon,
  CreditCardIcon,
  FileTextIcon,
  UserIcon,
} from "lucide-react";
import { formatNumber } from "@/components/formNumber";
import { DeleteItem } from "./functions/delete";
import { UpdateItem } from "./functions/update";

export default function ContractDetails() {
  const { contractId } = useParams();
  const { data: contractDetails, isLoading } = useGetContract(contractId);

  if (isLoading) return <div>Yuklanmoqda...</div>;

  const shartnoma_turi = [
    { name: "one_bay", value: "Birmartalik to'lov" },
    { name: "subscription_fee", value: "Oylik to'lov" },
  ];
  const purchase_status = [
    { name: "paid", value: "To'landi" },
    { name: "no_paid", value: "To'lanmagan" },
  ];

  const contract = contractDetails?.data?.data;

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
                value={contract?.user?.F_I_O}
              />
              <DetailItem
                label="Shartnoma turi"
                value={
                  shartnoma_turi.filter(
                    (el) => el.name === contract?.shartnoma_turi && el.value
                  )[0].value
                }
              />
              <DetailItem label="Shartnoma ID" value={contract?.shartnoma_id} />
            </DetailSection>

            <DetailSection
              icon={<CreditCardIcon className="w-5 h-5 text-green-600" />}
              title="Moliyaviy tafsilotlar"
            >
              <DetailItem
                label="Narx"
                value={formatNumber(contract?.price * contract.count) + " s'om"}
              />
              <DetailItem
                label="Oldindan to'lov"
                value={formatNumber(contract?.advancePayment) + " s'om"}
              />
              <DetailItem
                label="Qolgan to'lov"
                value={formatNumber(contract?.remainingPayment) + " s'om"}
              />
              <DetailItem
                label="Xarid holati"
                value={
                  purchase_status.filter(
                    (el) => el.name === contract.purchase_status && el.value
                  )[0].value
                }
              />
            </DetailSection>

            <DetailSection
              icon={<FileTextIcon className="w-5 h-5 text-purple-600" />}
              title="Shartnomaning xususiyatlari"
            >
              <DetailItem label="Miqdori" value={contract?.count} />
              <DetailItem
                label="Shartnoma davomiyligi"
                value={contract?.shartnoma_muddati}
              />
              <DetailItem
                label="Texnik davomiyligi"
                value={contract?.texnik_muddati}
              />
            </DetailSection>

            <DetailSection
              icon={<CalendarIcon className="w-5 h-5 text-orange-600" />}
              title="Muhim sanalar"
            >
              <DetailItem label="Shartnoma kuni" value={contract?.sana} />
              <DetailItem label="To'lav sanasi" value={contract?.tolash_sana} />
            </DetailSection>
          </div>
          <div>
            <div className="space-x-2 flex justify-end">
              <UpdateItem contract={contract} id={Number(contractId)} />
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
